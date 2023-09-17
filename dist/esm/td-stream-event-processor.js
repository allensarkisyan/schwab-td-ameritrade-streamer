/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */
import { SERVICES, FIELDS } from './td-constants.js';
import {
  parseOrderEntryMessage,
  parseOrderFillMessage,
  parseCancelMessage,
} from './td-notifications.js';
import {
  chunk,
  transformData,
  parseActivesMessage,
  parseListedBook,
} from './utils.js';
/**
 * Represents the TDAmeritradeStreamEventProcessor class for processing stream messages / events.
 *
 * @module TDAmeritradeStreamEventProcessor
 * @class
 */
export class TDAmeritradeStreamEventProcessor {
  /** @type {EventEmitter} */
  emitter;
  handleLevelOneFeedUpdate;
  handleLevelOneTimeSaleUpdate;
  /**
   * TDAmeritradeStreamEventProcessor - Handle's stream response
   *
   * @constructor
   * @param {EventEmitter} emitter - an instance of EventEmitter
   * @param {Function} [handleLevelOneFeedUpdate] - Custom L1 feed data callback
   * @param {Function} [handleLevelOneTimeSaleUpdate] - Custom L1 time & sales feed data callback
   */
  constructor(
    emitter,
    handleLevelOneFeedUpdate = (data) => {},
    handleLevelOneTimeSaleUpdate = (data) => {},
  ) {
    this.emitter = emitter;
    this.handleLevelOneFeedUpdate = handleLevelOneFeedUpdate;
    this.handleLevelOneTimeSaleUpdate = handleLevelOneTimeSaleUpdate;
  }
  /**
   *
   * @param {TDAmeritradeStreamEventProcessorEventMessage} TDAmeritradeStreamResponse
   * @param {TDAmeritradeStreamServiceResponse} TDAmeritradeStreamResponse.response - Response
   * @param {TDAmeritradeStreamDataResponse[]} TDAmeritradeStreamResponse.data - Response Data
   * @param {TDAmeritradeStreamDataResponse} TDAmeritradeStreamResponse.snapshot - Response Data Snapshot
   * @fires TDAmeritradeStreamer#AUTHORIZED
   * @fires TDAmeritradeStreamer#CHART_SNAPSHOT
   * @fires TDAmeritradeStreamer#CHART_UPDATE
   */
  handleMessage({ response, data, snapshot }) {
    try {
      if (
        response &&
        response[0] &&
        response[0]?.command === 'LOGIN' &&
        response[0]?.content?.code === 0
      ) {
        this.emitEvent('AUTHORIZED');
      }
      if (snapshot) {
        this.emitEvent('CHART_SNAPSHOT', snapshot);
      } else if (data) {
        data?.forEach((msg) => {
          switch (msg.service) {
            case SERVICES.ACCT_ACTIVITY:
              this.handleAccountActivity(msg);
              break;
            case SERVICES.QUOTE:
              this.handleQuotes(msg);
              break;
            case SERVICES.OPTION:
              this.handleOptions(msg);
              break;
            case SERVICES.CHART_HISTORY_FUTURES:
              this.emitEvent('CHART_SNAPSHOT', msg.content.snapshot);
              break;
            case SERVICES.CHART_FUTURES:
              this.emitEvent('CHART_UPDATE', msg.content[0]);
              break;
            case SERVICES.LEVELONE_FUTURES:
              this.handleLevelOneFutures(msg);
              break;
            case SERVICES.LEVELONE_FUTURES_OPTIONS:
              console.log(
                'NOT_IMPLEMENTED - LEVELONE_FUTURES_OPTIONS',
                msg.content,
              );
              break;
            case SERVICES.FUTURES_BOOK:
              console.log('NOT_IMPLEMENTED - FUTURES_BOOK', msg.content);
              break;
            case SERVICES.FUTURES_OPTIONS_BOOK:
              console.log(
                'NOT_IMPLEMENTED - FUTURES_OPTIONS_BOOK',
                msg.content,
              );
              break;
            case SERVICES.LISTED_BOOK:
              this.handleListedBook(msg);
              break;
            case SERVICES.NASDAQ_BOOK:
              this.handleNasdaqBook(msg);
              break;
            case SERVICES.OPTIONS_BOOK:
              console.log('NOT_IMPLEMENTED - OPTIONS_BOOK', msg);
              break;
            case SERVICES.TIMESALE_EQUITY:
              this.handleTimeSales(msg);
              break;
            case SERVICES.TIMESALE_FUTURES:
              this.handleLevelOneFutures(msg, true);
              break;
            case SERVICES.CHART_EQUITY:
              console.log('NOT_IMPLEMENTED - CHART_EQUITY', msg.content[0]);
              break;
            case SERVICES.ACTIVES_NASDAQ:
              this.handleActivesNasdaq(msg);
              break;
            case SERVICES.ACTIVES_NYSE:
              this.handleActivesNYSE(msg);
              break;
            case SERVICES.ACTIVES_OPTIONS:
              this.handleActiveOptions(msg);
              break;
            case SERVICES.NEWS_HEADLINE:
              this.handleNews(msg);
              break;
          }
        });
      }
    } catch (e) {
      console.log(
        'TDAmeritradeStreamer handleMessage Error',
        e?.message || 'AN UNKNOWN ERROR HAS OCCURRED.',
      );
    }
  }
  /**
   * Emits Events
   *
   * @param {string} evt - Event Name
   * @param {(Object|Array|string|number|boolean)} [data] - Event Data
   */
  emitEvent(evt, data) {
    try {
      this.emitter.emit(evt, data);
    } catch (e) {
      console.log(
        'TDAmeritradeStreamer emitEvent error',
        e?.message || 'AN UNKNOWN ERROR HAS OCCURRED.',
      );
    }
  }
  /**
   * Handles Account Activity
   *
   * @param {TDAmeritradeStreamDataResponse} msg - Stream Data Response
   * @fires TDAmeritradeStreamer#ACCT_ACTIVITY
   */
  handleAccountActivity(msg) {
    try {
      const message = {
        timestamp: msg.timestamp,
        type: msg.content[0]['2'],
        data: msg.content[0]['3'],
      };
      let parsedMessage = null;
      switch (message.type) {
        case 'OrderEntryRequest':
          parsedMessage = parseOrderEntryMessage(message);
          break;
        case 'OrderFill':
        case 'OrderPartialFill':
          parsedMessage = parseOrderFillMessage(message);
          break;
        case 'UROUT':
          parsedMessage = parseCancelMessage(message);
          break;
      }
      if (parsedMessage) {
        this.emitEvent('ACCT_ACTIVITY', parsedMessage);
      }
    } catch (e) {
      console.log(
        'TDAmeritradeStreamer handleAccountActivity error',
        e?.message || 'AN UNKNOWN ERROR HAS OCCURRED.',
      );
    }
  }
  /**
   * Handles Quotes
   *
   * @param {TDAmeritradeStreamDataResponse} msg - Stream Data Response
   * @fires TDAmeritradeStreamer#QUOTE
   */
  handleQuotes(msg) {
    const data = transformData(msg, FIELDS.LEVEL_ONE_EQUITY);
    this.emitEvent('QUOTE', data);
  }
  /**
   * Handles Time & Sales
   *
   * @param {TDAmeritradeStreamDataResponse} msg - Stream Data Response
   * @fires TDAmeritradeStreamer#TIMESALE_EQUITY_UPDATE
   */
  handleTimeSales(msg) {
    const data = transformData(msg, FIELDS.TIMESALE);
    this.emitEvent('TIMESALE_EQUITY_UPDATE', data);
    this.handleLevelOneTimeSaleUpdate(data);
  }
  /**
   * Handles Options
   *
   * @param {TDAmeritradeStreamDataResponse} msg - Stream Data Response
   * @fires TDAmeritradeStreamer#OPTION
   */
  handleOptions(msg) {
    const data = transformData(msg, FIELDS.LEVEL_ONE_OPTION);
    this.emitEvent('OPTION', data);
  }
  /**
   * Handles Futures Level One / Time & Sales
   *
   * @param {TDAmeritradeStreamDataResponse} msg - Stream Data Response
   * @fires TDAmeritradeStreamer#TIMESALE_FUTURES_UPDATE
   * @fires TDAmeritradeStreamer#LEVELONE_FUTURES_UPDATE
   */
  handleLevelOneFutures(msg, timeSales = false) {
    const data = transformData(
      msg,
      timeSales ? FIELDS.TIMESALE : FIELDS.LEVEL_ONE_FUTURES,
    );
    if (timeSales) {
      this.emitEvent('TIMESALE_FUTURES_UPDATE', data);
      this.handleLevelOneTimeSaleUpdate(data);
    } else {
      // this.emitEvent('LEVELONE_FUTURES_UPDATE', data[0]);
      this.handleLevelOneFeedUpdate(data[0]);
    }
  }
  /**
   * Handle News Headlines
   *
   * @param {TDAmeritradeStreamDataResponse} msg
   * @fires TDAmeritradeStreamer#NEWS_HEADLINE
   */
  handleNews(msg) {
    const data = transformData(msg, FIELDS.NEWS_HEADLINE);
    this.emitEvent('NEWS_HEADLINE', data);
  }
  /**
   * Handle Nasdaq Active Equities
   *
   * @param {TDAmeritradeStreamDataResponse} msg
   * @fires TDAmeritradeStreamer#ACTIVES_NASDAQ
   */
  handleActivesNasdaq(msg) {
    const data = parseActivesMessage(msg);
    this.emitEvent('ACTIVES_NASDAQ', data);
  }
  /**
   * Handle NYSE Active Equities
   *
   * @param {TDAmeritradeStreamDataResponse} msg
   * @fires TDAmeritradeStreamer#ACTIVES_NYSE
   */
  handleActivesNYSE(msg) {
    const data = parseActivesMessage(msg);
    this.emitEvent('ACTIVES_NYSE', data);
  }
  /**
   * Handle Nasdaq Order Book
   *
   * @param {TDAmeritradeStreamDataResponse} msg
   * @fires TDAmeritradeStreamer#LISTED_BOOK
   */
  handleListedBook(msg) {
    const data = parseListedBook(msg);
    this.emitEvent('LISTED_BOOK', data);
  }
  /**
   * Handle Nasdaq Order Book
   *
   * @param {TDAmeritradeStreamDataResponse} msg
   * @fires TDAmeritradeStreamer#NASDAQ_BOOK
   */
  handleNasdaqBook(msg) {
    const data = parseListedBook(msg);
    this.emitEvent('NASDAQ_BOOK', data);
  }
  /**
   * Handle Active Options
   *
   * @param {TDAmeritradeStreamDataResponse} msg
   * @fires TDAmeritradeStreamer#ACTIVES_OPTIONS
   */
  handleActiveOptions(msg) {
    try {
      const msgData = msg.content[0][1].split(';');
      const activeOptions = chunk(
        msgData
          .slice(5)
          .reverse()
          .map((i) => i.split(':').slice(3))
          .flat(),
        4,
      ).map(([symbol, description, volume, percentChange]) => ({
        symbol,
        description,
        volume,
        percentChange,
      }));
      const calls = activeOptions.filter((i) => /Call/gim.test(i.description));
      const puts = activeOptions.filter((i) => /Put/gim.test(i.description));
      const spy = {
        calls: calls.filter((i) => /SPY/gim.test(i.description)),
        puts: puts.filter((i) => /SPY/gim.test(i.description)),
        totalCalls: 0,
        totalPuts: 0,
      };
      const spyCalls = new Map();
      const spyPuts = new Map();
      for (const call of spy.calls) {
        if (spyCalls.has(call.symbol)) {
          spyCalls.set(call.symbol, {
            ...call,
            volume: spyCalls.get(call.symbol).volume + Number(call.volume),
          });
        } else {
          spyCalls.set(call.symbol, {
            ...call,
            volume: Number(call.volume),
          });
        }
      }
      for (const put of spy.puts) {
        if (spyPuts.has(put.symbol)) {
          spyPuts.set(put.symbol, {
            ...put,
            volume: spyPuts.get(put.symbol).volume + Number(put.volume),
          });
        } else {
          spyPuts.set(put.symbol, {
            ...put,
            volume: Number(put.volume),
          });
        }
      }
      spy.calls = Array.from(spyCalls.values());
      spy.puts = Array.from(spyPuts.values());
      spy.totalCalls = spy.calls.reduce((a, b) => {
        a += b.volume;
        return a;
      }, 0);
      spy.totalPuts = spy.puts.reduce((a, b) => {
        a += b.volume;
        return a;
      }, 0);
      this.emitEvent('ACTIVES_OPTIONS', {
        spy,
        calls: calls.filter((i) => !/SPY/gim.test(i.description)),
        puts: puts.filter((i) => !/SPY/gim.test(i.description)),
      });
    } catch (e) {
      console.log(
        'TDAmeritradeStreamer handleActiveOptions error',
        e?.message || 'AN UNKNOWN ERROR HAS OCCURRED.',
      );
    }
  }
}
