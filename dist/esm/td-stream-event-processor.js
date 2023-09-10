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
const BID_FIELD_KEYS = Object.keys(FIELDS.BID_FIELDS);
const BID_FIELD_VALUES = Object.values(FIELDS.BID_FIELDS);
const ASK_FIELD_KEYS = Object.keys(FIELDS.ASK_FIELDS);
const ASK_FIELD_VALUES = Object.values(FIELDS.ASK_FIELDS);
const ORDER_BOOK_EXCHANGE_KEYS = Object.keys(FIELDS.ORDER_BOOK_EXCHANGE_FIELDS);
const ORDER_BOOK_EXCHANGE_VALUES = Object.values(
  FIELDS.ORDER_BOOK_EXCHANGE_FIELDS,
);
const chunk = (arr = [], size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
const transformMessageData = (data, fieldKeys, fieldValues) => {
  return data.map((msg) => {
    const keys = Object.keys(msg);
    const vals = Object.values(msg);
    return keys
      .map((key) => {
        const idx = fieldValues.indexOf(Number(key));
        const idxVal = fieldKeys[idx];
        return idxVal || key;
      })
      .reduce((a, b, index) => ({ ...a, [b]: vals[index] }), {});
  });
};
const transformData = (data, fields) => {
  const fieldKeys = Object.keys(fields);
  const fieldValues = Object.values(fields);
  return transformMessageData(data.content, fieldKeys, fieldValues);
};
const parseActivesMessage = (msg) => {
  const msgData = msg.content[0][1].split(';');
  const actives = chunk(
    msgData.slice(5).map((i) => i.split(':').slice(3))[1],
    3,
  ).map(([symbol, volume, percentChange]) => ({
    symbol,
    volume,
    percentChange,
  }));
  return actives;
};
const parseListedBook = (data) => {
  try {
    const book = transformData(data, FIELDS.LISTED_BOOK);
    for (let i = 0; i < book.length; i++) {
      book[i].bids = transformMessageData(
        book[i].bids,
        BID_FIELD_KEYS,
        BID_FIELD_VALUES,
      );
      book[i].asks = transformMessageData(
        book[i].asks,
        ASK_FIELD_KEYS,
        ASK_FIELD_VALUES,
      );
      for (let x = 0; x < book[i].bids.length; x++) {
        book[i].bids[x].bids = transformMessageData(
          book[i].bids[x].bids,
          ORDER_BOOK_EXCHANGE_KEYS,
          ORDER_BOOK_EXCHANGE_VALUES,
        );
      }
      for (let x = 0; x < book[i].asks.length; x++) {
        book[i].asks[x].asks = transformMessageData(
          book[i].asks[x].asks,
          ORDER_BOOK_EXCHANGE_KEYS,
          ORDER_BOOK_EXCHANGE_VALUES,
        );
      }
    }
    return book;
  } catch (e) {
    console.log(e);
    return null;
  }
};
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
export class TDAmeritradeStreamEventProcessor {
  /** @type {EventEmitter} */
  emitter;
  handleLevelOneFeedUpdate;
  handleLevelOneTimeSaleUpdate;
  /**
   * TDAmeritradeStreamEventProcessor - Handle's stream response
   * @constructor
   * @param {EventEmitter} emitter
   * @param {Function} handleLevelOneFeedUpdate
   * @param {Function} handleLevelOneTimeSaleUpdate
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
      console.log('TDAmeriTradeStreamer handleMessage Error', e);
    }
  }
  /**
   *
   * @param {string} evt - Event Name
   * @param {(Object|Array|string|number|boolean)} [data] - Event Data
   */
  emitEvent(evt, data) {
    try {
      this.emitter.emit(evt, data);
    } catch (e) {
      console.log('TDAmeriTradeStreamer emitEvent error', e);
    }
  }
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
      console.log('TDAmeriTradeStreamer handleAccountActivity error', e);
    }
  }
  handleQuotes(msg) {
    const data = transformData(msg, FIELDS.LEVEL_ONE_EQUITY);
    this.emitEvent('QUOTE', data);
  }
  handleTimeSales(msg) {
    const data = transformData(msg, FIELDS.TIMESALE);
    this.emitEvent('TIMESALE_EQUITY_UPDATE', data);
    this.handleLevelOneTimeSaleUpdate(data);
  }
  handleOptions(msg) {
    const data = transformData(msg, FIELDS.LEVEL_ONE_OPTION);
    this.emitEvent('OPTION', data);
  }
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
  handleNews(msg) {
    const data = transformData(msg, FIELDS.NEWS_HEADLINE);
    this.emitEvent('NEWS_HEADLINE', data);
  }
  handleActivesNasdaq(msg) {
    const data = parseActivesMessage(msg);
    this.emitEvent('ACTIVES_NASDAQ', data);
  }
  handleActivesNYSE(msg) {
    const data = parseActivesMessage(msg);
    this.emitEvent('ACTIVES_NYSE', data);
  }
  handleListedBook(msg) {
    const data = parseListedBook(msg);
    this.emitEvent('LISTED_BOOK', data);
  }
  handleNasdaqBook(msg) {
    const data = parseListedBook(msg);
    this.emitEvent('NASDAQ_BOOK', data);
  }
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
      var calls = activeOptions.filter((i) => /Call/gim.test(i.description));
      var puts = activeOptions.filter((i) => /Put/gim.test(i.description));
      var spy = {
        calls: calls.filter((i) => /SPY/gim.test(i.description)),
        puts: puts.filter((i) => /SPY/gim.test(i.description)),
        totalCalls: 0,
        totalPuts: 0,
      };
      const spyCalls = new Map();
      const spyPuts = new Map();
      for (let i = 0; i < spy.calls.length; i++) {
        if (spyCalls.has(spy.calls[i].symbol)) {
          spyCalls.set(spy.calls[i].symbol, {
            ...spy.calls[i],
            volume:
              spyCalls.get(spy.calls[i].symbol).volume +
              Number(spy.calls[i].volume),
          });
        } else {
          spyCalls.set(spy.calls[i].symbol, {
            ...spy.calls[i],
            volume: Number(spy.calls[i].volume),
          });
        }
      }
      for (let i = 0; i < spy.puts.length; i++) {
        if (spyPuts.has(spy.puts[i].symbol)) {
          spyPuts.set(spy.puts[i].symbol, {
            ...spy.puts[i],
            volume:
              spyPuts.get(spy.puts[i].symbol).volume +
              Number(spy.puts[i].volume),
          });
        } else {
          spyPuts.set(spy.puts[i].symbol, {
            ...spy.puts[i],
            volume: Number(spy.puts[i].volume),
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
      console.log('TDAmeritradeStreamer handleActiveOptions error', e);
    }
  }
}
