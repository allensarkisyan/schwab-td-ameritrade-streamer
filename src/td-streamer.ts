/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */

import { EventEmitter } from 'eventemitter3';
import ws from 'isomorphic-ws';

import { STATE, EVENT, COMMANDS, SERVICES } from './td-constants.js';

import { TDAmeritradeStreamEventProcessor } from './td-stream-event-processor.js';

import type {
  TDAmeritradeStreamerConnectionOptions,
  TDAmeritradeStreamerCommand,
  TickerSymbolKeys,
  TDAmeritradeStreamEventProcessorEventMessage
} from './@types/index.js'

import {
  randomID,
  jsonToQueryString,
  getKeys
} from './utils.js';

/**
 * TD Ameritrade Stream Connection Options
 * @typedef {Object} TDAmeritradeStreamerConnectionOptions
 * @property {string} primaryAccountId - Primary Account ID
 * @property {string} accountId - Account ID to connect
 * @property {string} token - Token from streamerInfo
 * @property {string} accountCdDomainId - Account CD Domain ID from accounts
 * @property {string} streamerSocketUrl - Streamer Socket URL
 * @property {Date} tokenTimestamp - Token Timestamp
 * @property {Date} tokenExpirationTime - Token Expiration Time
 * @property {string} appId - App ID
 * @property {string} acl - ACL from streamerInfo
 * @property {string} userGroup - User Group
 * @property {string} accessLevel - Access Level
 * @property {string} company - Company Name
 * @property {string} segment - Segment
 * @property {Object[]} streamerSubscriptionKeys - Streamer Subscription Keys
 * @property {string} streamerSubscriptionKeys[].key - Subscription Key
 * @property {object} quotes - Realtime Quotes
 */

/**
 * @typedef {Object} TDAmeritradeStreamerCommand
 * @property {string} service - Service Name
 * @property {string} command - Command Name
 * @property {Object} parameters - Service Command Parameters
 */

/**
 * Single Symbol, Comma Seperated Symbols or Array of Symbols ("SPY" | "SPY, QQQ" | ["SPY", "QQQ"])
 * @typedef {(string|string[])} TickerSymbolKeys
 */

/** @typedef {(string|string[])} FuturesSymbol */

export class TDAmeritradeStreamer {
  /** @type {WebSocket} */
  #socket: WebSocket | null;

  /** @type {EventEmitter} */
  #emitter: EventEmitter;

  /** @type {TDAmeritradeStreamerConnectionOptions} */
  #streamerConnectionOptions: TDAmeritradeStreamerConnectionOptions;

  /** @type {TDAmeritradeStreamEventProcessor} */
  #streamEventProcessor: TDAmeritradeStreamEventProcessor;

  /**
   * @constructor
   * @param {TDAmeritradeStreamerConnectionOptions} streamerConnectionOptions 
   * @param {Function} handleLevelOneFeedUpdate 
   * @param {Function} handleLevelOneTimeSaleUpdate 
   */
  constructor(
    streamerConnectionOptions: TDAmeritradeStreamerConnectionOptions,
    handleLevelOneFeedUpdate: Function = (data?: any) => {},
    handleLevelOneTimeSaleUpdate: Function = (data?: any) => {},
  ) {
    console.log('TDAmeritradeStreamer',
      streamerConnectionOptions?.primaryAccountId,
      streamerConnectionOptions?.tokenExpirationTime,
      streamerConnectionOptions?.quotes
    );

    if (!streamerConnectionOptions) {
      throw new Error('Missing TDAmeritradeStreamerConnectionOptions');
    }

    this.#streamerConnectionOptions = streamerConnectionOptions;

    this.#emitter = new EventEmitter();
    this.#socket = null;

    this.#streamEventProcessor = new TDAmeritradeStreamEventProcessor(
      this.#emitter,
      handleLevelOneFeedUpdate,
      handleLevelOneTimeSaleUpdate,
    );

    this.#emitter.on(STATE.CONNECTED, () => this.#login());
    this.#emitter.on(STATE.DISCONNECTING, () => this.#logout());
    this.#emitter.on(EVENT.MESSAGE, (msg: TDAmeritradeStreamEventProcessorEventMessage) => this.#streamEventProcessor?.handleMessage(msg));

    this.#connect();
  }

  #connect(): void {
    if (!this.#streamerConnectionOptions?.streamerSocketUrl) {
      throw new Error('Missing Streamer Socket URL.');
    }

    try {
      let connectionEndpoint = this.#streamerConnectionOptions?.streamerSocketUrl;
  
      if (!/^(ws|wss)\:\/\//.test(connectionEndpoint)) {
        connectionEndpoint = `wss://${connectionEndpoint}/ws`;
      }
  
      this.#socket = new ws(connectionEndpoint);

      if (!this.#socket) {
        throw new Error('TDAmeritradeStreamer WebSocket Connection Failed.');
      }
  
      this.#socket.onopen = () => this.#emitter.emit(STATE.CONNECTED);
      this.#socket.onclose = () => this.#emitter.emit(STATE.DISCONNECTING);
      this.#socket.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          this.#emitter.emit(EVENT.MESSAGE, data);
        } catch (e: any) {
          console.log('TDAmeritradeStreamer error', e?.message);
        }
      }; 
    } catch (e: any) {
      throw new Error(e?.message || 'TDAmeritradeStreamer WebSocket Connection Failed.');
    }
  }

  /**
   * Send requests to TD Ameritrades WebSocket server
   * @param {TDAmeritradeStreamerCommand[]} commands - Streamer commands to send
   */
  #sendRequest(commands: TDAmeritradeStreamerCommand[] = []): void {
    try {
      const requests = commands?.map(cmd => ({
        ...cmd,
        requestid: randomID(),
        account: this.#streamerConnectionOptions?.accountId,
        source: this.#streamerConnectionOptions?.appId,
      }))
  
      this.#socket?.send(JSON.stringify({ requests })); 
    } catch (e: any) {
      console.log('TDAmeritradeStreamer sendRequest error', e?.message);
    }
  }

  #login(): void {
    const credential = jsonToQueryString({
      userid: this.#streamerConnectionOptions?.accountId,
      token: this.#streamerConnectionOptions?.token,
      company: this.#streamerConnectionOptions?.company,
      segment: this.#streamerConnectionOptions?.segment,
      cddomain: this.#streamerConnectionOptions?.accountCdDomainId,
      usergroup: this.#streamerConnectionOptions?.userGroup,
      accesslevel: this.#streamerConnectionOptions?.accessLevel,
      authorized: 'Y',
      timestamp: (new Date(this.#streamerConnectionOptions?.tokenTimestamp)).getTime(),
      appid: this.#streamerConnectionOptions?.appId,
      acl: this.#streamerConnectionOptions?.acl
    });

    this.#sendRequest([
      { 
        service: SERVICES.ADMIN,
        command: COMMANDS.LOGIN,
        parameters: {
          credential,
          version: '1.0',
          token: this.#streamerConnectionOptions?.token
        }
      },
      // {
      //   service: SERVICES.ADMIN,
      //   command: COMMANDS.QOS,
      //   parameters: { qoslevel: 0 }
      // },
    ]);
  }

  #logout(): void {
    this.#sendRequest([
      {
        service: SERVICES.ADMIN,
        command: COMMANDS.LOGOUT,
        parameters: {}
      }
    ]);
  }

  on(evt: string, method: any, context?: any): void {
    this.#emitter.on(evt, method, context);
  }
  
  add(evt: string, method: any, context?: any): void {
    this.#emitter.addListener(evt, method, context);
  }

  /**
   * Subscribe to Account Activity Service
   */
  subscribeAccountActivity(): void {
    const keys = this.#streamerConnectionOptions?.streamerSubscriptionKeys[0].key;
    this.#sendRequest([
      {
        service: SERVICES.ACCT_ACTIVITY,
        command: COMMANDS.SUBS,
        parameters: { keys, fields: '0,1,2,3' }
      },
    ]);
  }

  /**
   * Subscribe to Chart and Quotes Service
   * @param {TickerSymbolKeys} symbol 
   */
  getChartHistoryAndSubscribeQuotes(symbol: TickerSymbolKeys): void {
    const keys = getKeys(symbol);
    this.subscribeQuotes(keys);
    this.subscribeCharts(keys);
  }

  /**
   * Subscribe to Quote Service
   * @param {TickerSymbolKeys} symbol 
   */
  subscribeQuotes(symbol: TickerSymbolKeys): void {
    const keys = getKeys(symbol);
    const fields = '0,1,2,3,4,5,8,9,10,11,12,13,15,17,18,24,28,29,30,31,48,49,50,51';
    this.#sendRequest([
      {
        service: SERVICES.QUOTE,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }

  /**
   * Subscribe to Chart Equity Service
   * @param {TickerSymbolKeys} symbol 
   */
  subscribeCharts(symbol: TickerSymbolKeys): void {
    const keys = getKeys(symbol);
    const fields = '0,1,2,3,4,5,6,7,8';
    this.#sendRequest([
      {
        service: SERVICES.CHART_EQUITY,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }

  /**
   * Subscribe to Option Service
   * @param {TickerSymbolKeys} symbol 
   */
  subscribeOptions(symbol: TickerSymbolKeys): void {
    const keys = getKeys(symbol);
    const fields = '0,1,2,3,4,5,6,7,8,9,10,11,12,13,19,20,21,22,23,24,25,26,27,29,30,31,32,33,34,35,36,37,38,39,40,41';
    this.#sendRequest([
      {
        service: SERVICES.OPTION,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }

  /**
   * Subscribe to Time & Sales Equity Service
   * @param {TickerSymbolKeys} symbol 
   */
  subscribeTimeAndSales(symbol: TickerSymbolKeys): void {
    const keys = getKeys(symbol);
    const fields = '0,1,2,3,4';
    this.#sendRequest([
      {
        service: SERVICES.TIMESALE_EQUITY,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
      // {
      //   service: SERVICES.TIMESALE_OPTIONS,
      //   command: COMMANDS.SUBS,
      //   parameters: { keys, fields }
      // }
    ]);
  }

  /**
   * Subscribe to Futures Chart History, Chart, Time & Sales & Level One Services
   * @param {TickerSymbolKeys} symbol 
   */
  subscribeFutures(symbol: TickerSymbolKeys = '/ES'): void {
    const keys = getKeys(symbol);
    const fields = '0,1,2,3,4,5,8,9,10,11,12,13,14,18,23';
    this.#sendRequest([
      {
        service: SERVICES.CHART_HISTORY_FUTURES,
        command: COMMANDS.GET,
        parameters: { symbol: keys, frequency: 'm1', period: 'd1' }
      },
      {
        service: SERVICES.CHART_FUTURES,
        command: COMMANDS.SUBS,
        parameters: { keys, fields: '0,1,2,3,4,5,6,7' }
      },
      {
        service: SERVICES.TIMESALE_FUTURES,
        command: COMMANDS.SUBS,
        parameters: { keys, fields: '0,1,2,3,4' }
      },
      {
        service: SERVICES.LEVELONE_FUTURES,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }
  
  /**
   * Subscribe to Futures Time & Sales Service
   * @param {TickerSymbolKeys} symbol 
   */
  subscribeTimeSalesFutures(symbol: TickerSymbolKeys = '/ES'): void {
    const keys = getKeys(symbol);
    this.#sendRequest([
      {
        service: SERVICES.TIMESALE_FUTURES,
        command: COMMANDS.SUBS,
        parameters: { keys, fields: '0,1,2,3,4' }
      },
    ]);
  }

  /**
   * Subscribe to Level One Futures Options Service
   * './EW1X20C3510, ./EW1X20C3525'
   * @param {TickerSymbolKeys} symbol 
   */
  subscribeFuturesOptions(symbol: TickerSymbolKeys): void {
    const keys = getKeys(symbol);
    const fields = '0,1,2,3,4,5,8,9,10,11,12,13,14,18,23';
    this.#sendRequest([
      {
        service: SERVICES.LEVELONE_FUTURES_OPTIONS,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      }
    ]);
  }

  /**
   * Subscribe to Actives Feed
   */
  subscribeActives(): void {
    this.#sendRequest([
      {
        service: SERVICES.ACTIVES_NASDAQ,
        command: COMMANDS.SUBS,
        parameters: { keys: 'NASDAQ-60', fields: '0,1' }
      },
      {
        service: SERVICES.ACTIVES_NYSE,
        command: COMMANDS.SUBS,
        parameters: { keys: 'NYSE-ALL', fields: '0,1' }
      },
      {
        service: SERVICES.ACTIVES_OPTIONS,
        command: COMMANDS.SUBS,
        parameters: { keys: 'OPTS-DESC-ALL', fields: '0,1' }
      },
    ]);
  }

  /**
   * Subscribe to News Headlines
   * @param {TickerSymbolKeys} symbol 
   */
  subscribeNewsHeadlines(symbol: TickerSymbolKeys = '*ALL*'): void {
    const keys = getKeys(symbol);
    this.#sendRequest([
      {
        service: SERVICES.NEWS_HEADLINE,
        command: COMMANDS.SUBS,
        parameters: { keys, fields: '0,1,2,3,4,5,6,7,8,9,10' }
      }
    ]);
  }

  // 0 = Express(500 ms)
  // 1 = Real - Time(750 ms) default value for http binary protocol
  // 2 = Fast(1, 000 ms) default value for websocket and http asynchronous protocol
  // 3 = Moderate(1, 500 ms)
  // 4 = Slow(3, 000 ms)
  // 5 = Delayed(5, 000 ms)
  setQualityOfService(qoslevel = 0): void {
    this.#sendRequest([
      {
        service: SERVICES.ADMIN,
        command: COMMANDS.QOS,
        parameters: { qoslevel }
      },
    ]);
  }

  /**
   * Subscribe to Listed Order Book Service
   * @param {TickerSymbolKeys} symbol 
   */
  subscribeListedBook(symbol: TickerSymbolKeys): void {
    const keys = getKeys(symbol);
    const fields = '0,1,2,3';
    this.#sendRequest([
      {
        service: SERVICES.LISTED_BOOK,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }

  /**
   * Subscribe to Nasdaq Order Book Service
   * @param {TickerSymbolKeys} symbol 
   */
  subscribeNasdaqBook(symbol: TickerSymbolKeys): void {
    const keys = getKeys(symbol);
    const fields = '0,1,2,3';
    this.#sendRequest([
      {
        service: SERVICES.NASDAQ_BOOK,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }

  /**
   * Subscribe to Options Order Book Service
   * @param {TickerSymbolKeys} symbol 
   */
  subscribeOptionsBook(symbol: TickerSymbolKeys): void {
    const keys = getKeys(symbol);
    const fields = '0,1,2,3';
    this.#sendRequest([
      {
        service: SERVICES.OPTIONS_BOOK,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }
}

/**
 * Creates a new instance of TD Ameritrade Streamer
 * @param {TDAmeritradeStreamerConnectionOptions} streamerConnectionOptions - API Client Configuration
 * @param {Function} handleLevelOneFeedUpdate - Level one feed callback
 * @param {Function} handleLevelOneTimeSaleUpdate - Level one time & sales callback
 * @returns {TDAmeritradeStreamer}
 */
export function createTDAmeritradeStreamer(
  streamerConnectionOptions: TDAmeritradeStreamerConnectionOptions,
  handleLevelOneFeedUpdate: Function = (data?: any) => {},
  handleLevelOneTimeSaleUpdate: Function = (data?: any) => {},
) {
  return new TDAmeritradeStreamer(
    streamerConnectionOptions,
    handleLevelOneFeedUpdate,
    handleLevelOneTimeSaleUpdate
  );
}