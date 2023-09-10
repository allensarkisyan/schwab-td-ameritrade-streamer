/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */
import { EventEmitter } from "eventemitter3";

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
/** @typedef {(string|string[])} TickerSymbolKeys */
/** @typedef {(string|string[])} FuturesSymbol */
/**
 * TD Ameritrade Stream Response
 * @typedef {Object} TDAmeritradeStreamServiceResponse
 * @property {string} service - Service Name.
 * @property {string} requestid - Request ID.
 * @property {string} command - Command.
 * @property {Date} timestamp - Timestamp.
 * @property {Object} content - Stream Response Content.
 * @property {number} content.code - Response Code.
 * @property {string} content.msg - Response Message.
 */
/**
 * TD Ameritrade Data Response
 * @typedef {Object} TDAmeritradeStreamDataResponse
 * @property {string} service - Service Name.
 * @property {Date} timestamp - Timestamp.
 * @property {string} command - Command.
 * @property {Array<Object>|Object} content - Stream Response Content.
 * @property {Array<Object>|Object} snapshot? - Snapshot Data.
 */
/**
 * TD Ameritrade Stream Notify Response
 * @typedef {Object} TDAmeritradeStreamNotifyResponse
 * @property {Date} heartbeat - Heartbeat.
 */

declare module "@allensarkisyan/schwab-td-ameritrade-streamer" {
  /**
   * TD Ameritrade Stream Connection Options
   */
  export type TDAmeritradeStreamerConnectionOptions = {
    /** Primary Account ID */
    primaryAccountId: string;
    /** Account ID to connect */
    accountId: string;
    /** Token from streamerInfo */
    token: string;
    /** Account CD Domain ID from accounts */
    accountCdDomainId: string;
    /** Streamer Socket URL */
    streamerSocketUrl: string;
    /** Token Timestamp */
    tokenTimestamp: Date;
    /** Token Expiration Time */
    tokenExpirationTime: Date;
    /** App ID */
    appId: string;
    /** ACL from streamerInfo */
    acl: string;
    /** User Group */
    userGroup: string;
    /** Access Level */
    accessLevel: string;
    /** Company Name */
    company: string;
    /** Segment */
    segment: string;
    /** Streamer Subscription Keys */
    streamerSubscriptionKeys: {
      key: string;
    }[];
    /** Realtime Quotes */
    quotes: Record<string, any>;
  };

  /**
   * TD Ameritrade Stream Command
   */
  export type TDAmeritradeStreamerCommand = {
    /** Service Name */
    service: string;
    /** Command Name */
    command: string;
    /** Service Command Parameters */
    parameters: Record<string, any>;
  };

  /** Type for Ticker Symbol Keys */
  export type TickerSymbolKeys = string | string[];

  /** Type for Futures Symbol */
  export type FuturesSymbol = string | string[];

  export type TDAmeritradeStreamEventProcessorEventMessage = {
    response: TDAmeritradeStreamServiceResponse[];
    data: TDAmeritradeStreamDataResponse[];
    snapshot: TDAmeritradeStreamDataResponse;
  };

  /**
   * TD Ameritrade Stream Service Response
   */
  export type TDAmeritradeStreamServiceResponse = {
    /** Service Name */
    service: string;
    /** Request ID */
    requestid: string;
    /** Command */
    command: string;
    /** Timestamp */
    timestamp: Date;
    /** Stream Response Content */
    content: {
      /** Response Code */
      code: number;
      /** Response Message */
      msg: string;
    };
  };

  /**
   * TD Ameritrade Stream Data Response
   */
  export type TDAmeritradeStreamDataResponse = {
    /** Service Name */
    service: string;
    /** Timestamp */
    timestamp: Date;
    /** Command */
    command: string;
    /** Stream Response Content */
    content: any;
    /** Snapshot Content */
    snapshot?: Record<string, any> | Array<Record<string, any>>;
  };

  /**
   * TD Ameritrade Stream Notify Response
   */
  export type TDAmeritradeStreamNotifyResponse = {
    /** Heartbeat */
    heartbeat: Date;
  };

  export type TDAmeritradeActivityMessage = {
    timestamp: Date;
    type: string;
    data: string;
  };

  export class TDAmeritradeStreamEventProcessor {
    /** @type {EventEmitter} */
    emitter: EventEmitter;
    handleLevelOneFeedUpdate: Function;
    handleLevelOneTimeSaleUpdate: Function;
    /**
     * TDAmeritradeStreamEventProcessor - Handle's stream response
     * @constructor
     * @param {EventEmitter} emitter
     * @param {Function} handleLevelOneFeedUpdate
     * @param {Function} handleLevelOneTimeSaleUpdate
     */
    constructor(
      emitter: EventEmitter,
      handleLevelOneFeedUpdate?: Function,
      handleLevelOneTimeSaleUpdate?: Function
    );
    /**
     *
     * @param {Object} TDAmeritradeStreamResponse
     * @param {TDAmeritradeStreamServiceResponse} TDAmeritradeStreamResponse.response - Response
     * @param {TDAmeritradeStreamDataResponse[]} TDAmeritradeStreamResponse.data - Response Data
     * @param {TDAmeritradeStreamDataResponse} TDAmeritradeStreamResponse.snapshot - Response Data Snapshot
     */
    handleMessage({
      response,
      data,
      snapshot,
    }: {
      response: TDAmeritradeStreamServiceResponse[];
      data: TDAmeritradeStreamDataResponse[];
      snapshot: TDAmeritradeStreamDataResponse;
    }): void;
    /**
     *
     * @param {string} evt - Event Name
     * @param {(Object|Array|string|number|boolean)} [data] - Event Data
     */
    emitEvent(evt: string, data?: object | symbol | string | number | boolean | null): void;
    handleAccountActivity(msg: TDAmeritradeStreamDataResponse): void;
    handleQuotes(msg: TDAmeritradeStreamDataResponse): void;
    handleTimeSales(msg: TDAmeritradeStreamDataResponse): void;
    handleOptions(msg: TDAmeritradeStreamDataResponse): void;
    handleLevelOneFutures(msg: TDAmeritradeStreamDataResponse, timeSales?: boolean): void;
    handleNews(msg: TDAmeritradeStreamDataResponse): void;
    handleActivesNasdaq(msg: TDAmeritradeStreamDataResponse): void;
    handleActivesNYSE(msg: TDAmeritradeStreamDataResponse): void;
    handleListedBook(msg: TDAmeritradeStreamDataResponse): void;
    handleNasdaqBook(msg: TDAmeritradeStreamDataResponse): void;
    handleActiveOptions(msg: TDAmeritradeStreamDataResponse): void;
  }

  export class TDAmeritradeStreamer {
    #private;
    /**
     * @constructor
     * @param {TDAmeritradeStreamerConnectionOptions} streamerConnectionOptions
     * @param {Function} handleLevelOneFeedUpdate
     * @param {Function} handleLevelOneTimeSaleUpdate
     */
    constructor(
      streamerConnectionOptions: TDAmeritradeStreamerConnectionOptions,
      handleLevelOneFeedUpdate?: Function,
      handleLevelOneTimeSaleUpdate?: Function
    );
    on(evt: string, method: string | any, context?: object | symbol): void;
    add(evt: string, method: string | any, context?: object | symbol): void;
    /**
     * Send requests to TD Ameritrades WebSocket server
     * @param {TDAmeritradeStreamerCommand[]} commands - Streamer commands to send
     */
    sendRequest(commands?: TDAmeritradeStreamerCommand[]): void;
    subscribeAccountActivity(): void;
    /**
     *
     * @param {TickerSymbolKeys} symbol
     */
    getChartHistoryAndSubscribeQuotes(symbol: TickerSymbolKeys): void;
    /**
     *
     * @param {TickerSymbolKeys} symbol
     */
    subscribeQuotes(symbol: TickerSymbolKeys): void;
    /**
     *
     * @param {TickerSymbolKeys} symbol
     */
    subscribeCharts(symbol: TickerSymbolKeys): void;
    /**
     *
     * @param {TickerSymbolKeys} symbol
     */
    subscribeOptions(symbol: TickerSymbolKeys): void;
    /**
     * Subscribe to Time & Sales Feed
     * @param {TickerSymbolKeys} symbol
     */
    subscribeTimeAndSales(symbol: TickerSymbolKeys): void;
    subscribeFutures(symbol?: string): void;
    subscribeTimeSalesFutures(symbol?: string): void;
    subscribeFuturesOptions(keys: TickerSymbolKeys): void;
    /**
     * Subscribe to Actives Feed
     */
    subscribeActives(): void;
    /**
     * Subscribe to News Headlines
     * @param {TickerSymbolKeys} symbol
     */
    subscribeNewsHeadlines(symbol?: TickerSymbolKeys): void;
    setQualityOfService(qoslevel?: number): void;
    /**
     * Subscribe to Listed Order Book Feed
     * @param {TickerSymbolKeys} symbol
     */
    subscribeListedBook(symbol: TickerSymbolKeys): void;
    /**
     * Subscribe to Nasdaq Order Book Feed
     * @param {TickerSymbolKeys} symbol
     */
    subscribeNasdaqBook(symbol: TickerSymbolKeys): void;
    /**
     * Subscribe to Options Order Book Feed
     * @param {TickerSymbolKeys} symbol
     */
    subscribeOptionsBook(symbol: TickerSymbolKeys): void;
  }
}
