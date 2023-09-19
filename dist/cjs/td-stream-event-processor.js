'use strict';
/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.TDAmeritradeStreamEventProcessor = void 0;
const td_constants_js_1 = require('./td-constants.js');
const td_notifications_js_1 = require('./td-notifications.js');
const utils_js_1 = require('./utils.js');
/**
 * Represents the TDAmeritradeStreamEventProcessor class for processing stream messages / events.
 *
 * @module TDAmeritradeStreamEventProcessor
 * @class
 */
class TDAmeritradeStreamEventProcessor {
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
            case td_constants_js_1.SERVICES.ACCT_ACTIVITY:
              this.handleAccountActivity(msg);
              break;
            case td_constants_js_1.SERVICES.QUOTE:
              this.handleQuotes(msg);
              break;
            case td_constants_js_1.SERVICES.OPTION:
              this.handleOptions(msg);
              break;
            case td_constants_js_1.SERVICES.CHART_HISTORY_FUTURES:
              this.emitEvent('CHART_SNAPSHOT', msg.content.snapshot);
              break;
            case td_constants_js_1.SERVICES.CHART_FUTURES:
              this.emitEvent('CHART_UPDATE', msg.content[0]);
              break;
            case td_constants_js_1.SERVICES.LEVELONE_FUTURES:
              this.handleLevelOneFutures(msg);
              break;
            case td_constants_js_1.SERVICES.LEVELONE_FUTURES_OPTIONS:
              console.log(
                'NOT_IMPLEMENTED - LEVELONE_FUTURES_OPTIONS',
                msg.content,
              );
              break;
            case td_constants_js_1.SERVICES.FUTURES_BOOK:
              console.log('NOT_IMPLEMENTED - FUTURES_BOOK', msg.content);
              break;
            case td_constants_js_1.SERVICES.FUTURES_OPTIONS_BOOK:
              console.log(
                'NOT_IMPLEMENTED - FUTURES_OPTIONS_BOOK',
                msg.content,
              );
              break;
            case td_constants_js_1.SERVICES.LISTED_BOOK:
              this.handleListedBook(msg);
              break;
            case td_constants_js_1.SERVICES.NASDAQ_BOOK:
              this.handleNasdaqBook(msg);
              break;
            case td_constants_js_1.SERVICES.OPTIONS_BOOK:
              console.log('NOT_IMPLEMENTED - OPTIONS_BOOK', msg);
              break;
            case td_constants_js_1.SERVICES.TIMESALE_EQUITY:
              this.handleTimeSales(msg);
              break;
            case td_constants_js_1.SERVICES.TIMESALE_FUTURES:
              this.handleLevelOneFutures(msg, true);
              break;
            case td_constants_js_1.SERVICES.CHART_EQUITY:
              console.log('NOT_IMPLEMENTED - CHART_EQUITY', msg.content[0]);
              break;
            case td_constants_js_1.SERVICES.ACTIVES_NASDAQ:
              this.handleActivesNasdaq(msg);
              break;
            case td_constants_js_1.SERVICES.ACTIVES_NYSE:
              this.handleActivesNYSE(msg);
              break;
            case td_constants_js_1.SERVICES.ACTIVES_OPTIONS:
              this.handleActiveOptions(msg);
              break;
            case td_constants_js_1.SERVICES.NEWS_HEADLINE:
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
          parsedMessage = (0, td_notifications_js_1.parseOrderEntryMessage)(
            message,
          );
          break;
        case 'OrderFill':
        case 'OrderPartialFill':
          parsedMessage = (0, td_notifications_js_1.parseOrderFillMessage)(
            message,
          );
          break;
        case 'UROUT':
          parsedMessage = (0, td_notifications_js_1.parseCancelMessage)(
            message,
          );
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
    const data = (0, utils_js_1.transformData)(
      msg,
      td_constants_js_1.FIELDS.LEVEL_ONE_EQUITY,
    );
    this.emitEvent('QUOTE', data);
  }
  /**
   * Handles Time & Sales
   *
   * @param {TDAmeritradeStreamDataResponse} msg - Stream Data Response
   * @fires TDAmeritradeStreamer#TIMESALE_EQUITY_UPDATE
   */
  handleTimeSales(msg) {
    const data = (0, utils_js_1.transformData)(
      msg,
      td_constants_js_1.FIELDS.TIMESALE,
    );
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
    const data = (0, utils_js_1.transformData)(
      msg,
      td_constants_js_1.FIELDS.LEVEL_ONE_OPTION,
    );
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
    const data = (0, utils_js_1.transformData)(
      msg,
      timeSales
        ? td_constants_js_1.FIELDS.TIMESALE
        : td_constants_js_1.FIELDS.LEVEL_ONE_FUTURES,
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
    const data = (0, utils_js_1.transformData)(
      msg,
      td_constants_js_1.FIELDS.NEWS_HEADLINE,
    );
    this.emitEvent('NEWS_HEADLINE', data);
  }
  /**
   * Handle Nasdaq Active Equities
   *
   * @param {TDAmeritradeStreamDataResponse} msg
   * @fires TDAmeritradeStreamer#ACTIVES_NASDAQ
   */
  handleActivesNasdaq(msg) {
    const data = (0, utils_js_1.parseActivesMessage)(msg);
    this.emitEvent('ACTIVES_NASDAQ', data);
  }
  /**
   * Handle NYSE Active Equities
   *
   * @param {TDAmeritradeStreamDataResponse} msg
   * @fires TDAmeritradeStreamer#ACTIVES_NYSE
   */
  handleActivesNYSE(msg) {
    const data = (0, utils_js_1.parseActivesMessage)(msg);
    this.emitEvent('ACTIVES_NYSE', data);
  }
  /**
   * Handle Nasdaq Order Book
   *
   * @param {TDAmeritradeStreamDataResponse} msg
   * @fires TDAmeritradeStreamer#LISTED_BOOK
   */
  handleListedBook(msg) {
    const data = (0, utils_js_1.parseListedBook)(msg);
    this.emitEvent('LISTED_BOOK', data);
  }
  /**
   * Handle Nasdaq Order Book
   *
   * @param {TDAmeritradeStreamDataResponse} msg
   * @fires TDAmeritradeStreamer#NASDAQ_BOOK
   */
  handleNasdaqBook(msg) {
    const data = (0, utils_js_1.parseListedBook)(msg);
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
      const activeOptions = (0, utils_js_1.chunk)(
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
      const calls = activeOptions.filter((i) =>
        (0, utils_js_1.isCall)(i.description),
      );
      const puts = activeOptions.filter((i) =>
        (0, utils_js_1.isPut)(i.description),
      );
      const spy = {
        calls: calls.filter((i) => (0, utils_js_1.isSPY)(i.description)),
        puts: puts.filter((i) => (0, utils_js_1.isSPY)(i.description)),
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
        calls: calls.filter((i) => !(0, utils_js_1.isSPY)(i.description)),
        puts: puts.filter((i) => !(0, utils_js_1.isSPY)(i.description)),
      });
    } catch (e) {
      console.log(
        'TDAmeritradeStreamer handleActiveOptions error',
        e?.message || 'AN UNKNOWN ERROR HAS OCCURRED.',
      );
    }
  }
}
exports.TDAmeritradeStreamEventProcessor = TDAmeritradeStreamEventProcessor;
