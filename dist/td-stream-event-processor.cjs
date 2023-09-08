'use strict';

var tdNotifications_js = require('./td-notifications.js');

/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */


const SERVICES = Object.freeze({
  ACCT_ACTIVITY: 'ACCT_ACTIVITY',
  ADMIN: 'ADMIN',
  ACTIVES_NASDAQ: 'ACTIVES_NASDAQ',
  ACTIVES_NYSE: 'ACTIVES_NYSE',
  ACTIVES_OTCBB: 'ACTIVES_OTCBB',
  ACTIVES_OPTIONS: 'ACTIVES_OPTIONS',
  FOREX_BOOK: 'FOREX_BOOK',
  FUTURES_BOOK: 'FUTURES_BOOK',
  LISTED_BOOK: 'LISTED_BOOK',
  NASDAQ_BOOK: 'NASDAQ_BOOK',
  OPTIONS_BOOK: 'OPTIONS_BOOK',
  FUTURES_OPTIONS_BOOK: 'FUTURES_OPTIONS_BOOK',
  CHART_EQUITY: 'CHART_EQUITY',
  CHART_FUTURES: 'CHART_FUTURES',
  CHART_HISTORY_FUTURES: 'CHART_HISTORY_FUTURES',
  QUOTE: 'QUOTE',
  LEVELONE_FUTURES: 'LEVELONE_FUTURES',
  LEVELONE_FOREX: 'LEVELONE_FOREX',
  LEVELONE_FUTURES_OPTIONS: 'LEVELONE_FUTURES_OPTIONS',
  OPTION: 'OPTION',
  LEVELTWO_FUTURES: 'LEVELTWO_FUTURES',
  NEWS_HEADLINE: 'NEWS_HEADLINE',
  NEWS_STORY: 'NEWS_STORY',
  NEWS_HEADLINE_LIST: 'NEWS_HEADLINE_LIST',
  STREAMER_SERVER: 'STREAMER_SERVER',
  TIMESALE_EQUITY: 'TIMESALE_EQUITY',
  TIMESALE_FUTURES: 'TIMESALE_FUTURES',
  TIMESALE_FOREX: 'TIMESALE_FOREX',
  TIMESALE_OPTIONS: 'TIMESALE_OPTIONS',
});

const QOS = Object.freeze({
  express: 0,
  realtime: 1,
  fast: 2,
  moderate: 3,
  slow: 4,
  delayed: 5,
});

const ACCT_ACTIVITY = Object.freeze({
  subscriptionKey: 0,
  accountNumber: 1,
  messageType: 2,
  messageData: 3,
});

const CHART_EQUITY = Object.freeze({
  key: 0,
  openPrice: 1,
  highPrice: 2,
  lowPrice: 3,
  closePrice: 4,
  volume: 5,
  sequence: 6,
  chartTime: 7,
  chartDay: 8,
});

const CHART_FUTURES = Object.freeze({
  key: 0,
  chartTime: 1,
  openPrice: 2,
  highPrice: 3,
  lowPrice: 4,
  closePrice: 5,
  volume: 6,
});

const CHART_OPTIONS = Object.freeze({
  key: 0,
  chartTime: 1,
  openPrice: 2,
  highPrice: 3,
  lowPrice: 4,
  closePrice: 5,
  volume: 6,
});

const NEWS_HEADLINE = Object.freeze({
  symbol: 0,
  errorCode: 1,
  storyDatetime: 2,
  headlineId: 3,
  status: 4,
  headline: 5,
  storyId: 6,
  countForKeyword: 7,
  keywordArray: 8,
  isHot: 9,
  storySource: 10,
});

const TIMESALE = Object.freeze({
  symbol: 0,
  tradeTime: 1,
  lastPrice: 2,
  lastSize: 3,
  lastSequence: 4,
});

const LEVEL_ONE_EQUITY = Object.freeze({
  symbol: 0,
  bidPrice: 1,
  askPrice: 2,
  lastPrice: 3,
  bidSize: 4,
  askSize: 5,
  askID: 6,
  bidID: 7,
  totalVolume: 8,
  lastSize: 9,
  tradeTime: 10,
  quoteTime: 11,
  highPrice: 12,
  lowPrice: 13,
  bidTick: 14,
  closePrice: 15,
  exchangeID: 16,
  marginable: 17,
  shortable: 18,
  // islandBid: 19,
  // islandAsk: 20,
  // islandVolume: 21,
  quoteDay: 22,
  tradeDay: 23,
  volatility: 24,
  description: 25,
  lastID: 26,
  digits: 27,
  openPrice: 28,
  netChange: 29,
  '52WeekHigh': 30,
  '52WeekLow': 31,
  peRatio: 32,
  dividendAmount: 33,
  dividendYield: 34,
  // islandBidSize: 35,
  // islandAskSize: 36,
  nav: 37,
  fundPrice: 38,
  exchangeName: 39,
  dividendDate: 40,
  regularMarketQuote: 41,
  regularMarketTrade: 42,
  regularMarketLastPrice: 43,
  regularMarketLastSize: 44,
  regularMarketTradeTime: 45,
  regularMarketTradeDay: 46,
  regularMarketNetChange: 47,
  securityStatus: 48,
  mark: 49,
  quoteTimeInLong: 50,
  tradeTimeInLong: 51,
  regularMarketTradeTimeInLong: 52,
});

const LEVEL_ONE_FUTURES = Object.freeze({
  symbol: 0,
  bidPrice: 1,
  askPrice: 2,
  lastPrice: 3,
  bidSize: 4,
  askSize: 5,
  askID: 6,
  bidID: 7,
  totalVolume: 8,
  lastSize: 9,
  quoteTime: 10,
  tradeTime: 11,
  highPrice: 12,
  lowPrice: 13,
  closePrice: 14,
  exchangeID: 15,
  description: 16,
  lastID: 17,
  openPrice: 18,
  netChange: 19,
  futurePercentChange: 20,
  exhangeName: 21,
  securityStatus: 22,
  openInterest: 23,
  mark: 24,
  tick: 25,
  tickAmount: 26,
  product: 27,
  futurePriceFormat: 28,
  futureTradingHours: 29,
  futureIsTradable: 30,
  futureMultiplier: 31,
  futureIsActive: 32,
  futureSettlementPrice: 33,
  futureActiveSymbol: 34,
  futureExpirationDate: 35,
});

const LEVEL_ONE_OPTION = Object.freeze({
  symbol: 0,
  description: 1,
  bidPrice: 2,
  askPrice: 3,
  lastPrice: 4,
  highPrice: 5,
  lowPrice: 6,
  closePrice: 7,
  totalVolume: 8,
  openInterest: 9,
  volatility: 10,
  quoteTime: 11,
  tradeTime: 12,
  intrinsicValue: 13,
  openPrice: 19,
  bidSize: 20,
  askSize: 21,
  lastSize: 22,
  netChange: 23,
  strikePrice: 24,
  contractType: 25,
  underlying: 26,
  expirationMonth: 27,
  timeValue: 29,
  expirationDay: 30,
  dte: 31,
  delta: 32,
  gamma: 33,
  theta: 34,
  vega: 35,
  rho: 36,
  securityStatus: 37,
  theoreticalOptionValue: 38,
  underlyingPrice: 39,
  expirationType: 40,
  mark: 41,
});

const LISTED_BOOK = Object.freeze({
  symbol: 0,
  bookTime: 1,
  bids: 2,
  asks: 3,
});

const NASDAQ_BOOK = Object.freeze({
  symbol: 0,
  bookTime: 1,
  bids: 2,
  asks: 3,
});

const OPTIONS_BOOK = Object.freeze({
  symbol: 0,
  bookTime: 1,
  bids: 2,
  asks: 3,
});

const BID_FIELDS = Object.freeze({
  price: 0,
  totalVolume: 1,
  numBids: 2,
  bids: 3,
});

const ASK_FIELDS = Object.freeze({
  price: 0,
  totalVolume: 1,
  numAsks: 2,
  asks: 3,
});

const ORDER_BOOK_EXCHANGE_FIELDS = Object.freeze({
  exchange: 0,
  volume: 1,
  sequence: 2,
});

const FIELDS = Object.freeze({
  QOS,
  ACCT_ACTIVITY,
  CHART_EQUITY,
  CHART_FUTURES,
  CHART_OPTIONS,
  NEWS_HEADLINE,
  TIMESALE,
  LEVEL_ONE_EQUITY,
  LEVEL_ONE_FUTURES,
  LEVEL_ONE_OPTION,
  LISTED_BOOK,
  NASDAQ_BOOK,
  OPTIONS_BOOK,
  BID_FIELDS,
  ASK_FIELDS,
  ORDER_BOOK_EXCHANGE_FIELDS,
});

/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */


const BID_FIELD_KEYS = Object.keys(FIELDS.BID_FIELDS);
const BID_FIELD_VALUES = Object.values(FIELDS.BID_FIELDS);
const ASK_FIELD_KEYS = Object.keys(FIELDS.ASK_FIELDS);
const ASK_FIELD_VALUES = Object.values(FIELDS.ASK_FIELDS);
const ORDER_BOOK_EXCHANGE_KEYS = Object.keys(FIELDS.ORDER_BOOK_EXCHANGE_FIELDS);
const ORDER_BOOK_EXCHANGE_VALUES = Object.values(FIELDS.ORDER_BOOK_EXCHANGE_FIELDS);

const chunk = (arr = [], size) => Array.from(
  { length: Math.ceil(arr.length / size) },
  (_, i) => arr.slice(i * size, i * size + size)
);

const transformMessageData = (data, fieldKeys, fieldValues) => {
  return data.map(msg => {
    const keys = Object.keys(msg);
    const vals = Object.values(msg);

    return keys.map(key => {
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
    msgData.slice(5)
    .map(i => i.split(':').slice(3))[1],
    3,
  )
  .map(([
    symbol,
    volume,
    percentChange
  ]) => ({
    symbol,
    volume,
    percentChange
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
        BID_FIELD_VALUES
      );
  
      book[i].asks = transformMessageData(
        book[i].asks,
        ASK_FIELD_KEYS,
        ASK_FIELD_VALUES
      );
  
      for (let x = 0; x < book[i].bids.length; x++) {
        book[i].bids[x].bids = transformMessageData(
          book[i].bids[x].bids,
          ORDER_BOOK_EXCHANGE_KEYS,
          ORDER_BOOK_EXCHANGE_VALUES
        );
      }
  
      for (let x = 0; x < book[i].asks.length; x++) {
        book[i].asks[x].asks = transformMessageData(
          book[i].asks[x].asks,
          ORDER_BOOK_EXCHANGE_KEYS,
          ORDER_BOOK_EXCHANGE_VALUES
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
 * @property {boolean} service - Service Name.
 * @property {boolean} requestid - Request ID.
 * @property {boolean} command - Command.
 * @property {Date} timestamp - Timestamp.
 * @property {Object} content - Stream Response Content.
 * @property {number} content.code - Response Code.
 * @property {string} content.msg - Response Message.
 */

/**
 * TD Ameritrade Data Response
 * @typedef {Object} TDAmeritradeStreamDataResponse
 * @property {boolean} service - Service Name.
 * @property {Date} timestamp - Timestamp.
 * @property {boolean} command - Command.
 * @property {Array<Object>} content - Stream Response Content.
 */

/**
 * TD Ameritrade Stream Notify Response
 * @typedef {Object} TDAmeritradeStreamNotifyResponse
 * @property {Date} heartbeat - Heartbeat.
 */

class TDAmeritradeStreamEventProcessor {
  /**
   * TDAmeritradeStreamEventProcessor - Handle's stream response
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
   * @param {Object} TDAmeritradeStreamResponse
   * @param {TDAmeritradeStreamServiceResponse} TDAmeritradeStreamResponse.response - Response
   * @param {TDAmeritradeStreamDataResponse[]} TDAmeritradeStreamResponse.data - Response Data
   * @param {TDAmeritradeStreamDataResponse} TDAmeritradeStreamResponse.snapshot - Response Data Snapshot
   */
  handleMessage({ response, data, snapshot }) {
    try {
      if (
        response && response[0]
        && response[0]?.command === 'LOGIN'
        && response[0]?.content?.code === 0
      ) {
        this.emitEvent('AUTHORIZED');
      }

      if (snapshot) {
        this.emitEvent('CHART_SNAPSHOT', snapshot);
      } else if (data) {
        data?.forEach(msg => {
          switch (msg.service) {
            case SERVICES.ACCT_ACTIVITY:
              this.handleAccountActivity(msg);
              break;
            case SERVICES.QUOTE:
              this.handleQuotes(msg);
              break;
            case SERVICES.OPTION:
              console.log('NOT_IMPLEMENTED - OPTION', msg.content);
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
              console.log('NOT_IMPLEMENTED - LEVELONE_FUTURES_OPTIONS', msg.content);
              break;
            case SERVICES.FUTURES_BOOK:
              console.log('NOT_IMPLEMENTED - FUTURES_BOOK', msg.content);
              break;
            case SERVICES.FUTURES_OPTIONS_BOOK:
              console.log('NOT_IMPLEMENTED - FUTURES_OPTIONS_BOOK', msg.content);
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
  emitEvent(evt, data = null) {
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
          parsedMessage = tdNotifications_js.parseOrderEntryMessage(message);
          break;
        case 'OrderFill':
        case 'OrderPartialFill':
          parsedMessage = tdNotifications_js.parseOrderFillMessage(message);
          break;
        case 'UROUT':
          parsedMessage = tdNotifications_js.parseCancelMessage(message);
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
    const data = transformData(msg, FIELDS.OPTION);
    this.emitEvent('OPTION', data);
  }

  handleLevelOneFutures(msg, timeSales = false) {
    const data = transformData(msg, (timeSales ? FIELDS.TIMESALE : FIELDS.LEVEL_ONE_FUTURES));

    if (timeSales) {
      this.emitEvent('TIMESALE_FUTURES_UPDATE', data);
      this.handleLevelOneTimeSaleUpdate(data);
    } else {
      // this.emitEvent('LEVELONE_FUTURES_UPDATE', data[0]);
      this.handleLevelOneFeedUpdate(data[0]);
    }

    return update;
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
      // const activeOptions = chunk(msg.content[0][1].split(';').slice(5).map(i => i.split(':').slice(3))[1], 4).map(([symbol, description, volume, percentChange]) => ({ symbol, description, volume, percentChange }))
      const activeOptions = chunk(
        msgData.slice(5)
        .reverse()
        .map(i => i.split(':').slice(3))
        .flat(),
        4,
      )
      .map(([
        symbol,
        description,
        volume,
        percentChange
      ]) => ({
        symbol,
        description,
        volume,
        percentChange
      }));
  
      var calls = activeOptions.filter(i => /Call/gim.test(i.description));
      var puts = activeOptions.filter(i => /Put/gim.test(i.description));
  
      var spy = {
        calls: calls.filter(i => /SPY/gim.test(i.description)),
        puts: puts.filter(i => /SPY/gim.test(i.description)),
      };
  
      const spyCalls = new Map();
      const spyPuts = new Map();
  
      for (let i = 0; i < spy.calls.length; i++) {
        if (spyCalls.has(spy.calls[i].symbol)) {
          spyCalls.set(spy.calls[i].symbol, {
            ...spy.calls[i],
            volume: spyCalls.get(spy.calls[i].symbol).volume + Number(spy.calls[i].volume)
          });
        } else {
          spyCalls.set(spy.calls[i].symbol, {
            ...spy.calls[i],
            volume: Number(spy.calls[i].volume)
          });
        }
      }
  
      for (let i = 0; i < spy.puts.length; i++) {
        if (spyPuts.has(spy.puts[i].symbol)) {
          spyPuts.set(spy.puts[i].symbol, {
            ...spy.puts[i],
            volume: spyPuts.get(spy.puts[i].symbol).volume + Number(spy.puts[i].volume)
          });
        } else {
          spyPuts.set(spy.puts[i].symbol, {
            ...spy.puts[i],
            volume: Number(spy.puts[i].volume)
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
        calls: calls.filter(i => !/SPY/gim.test(i.description)),
        puts: puts.filter(i => !/SPY/gim.test(i.description)),
      }); 
    } catch (e) {
      console.log('TDAmeritradeStreamer handleActiveOptions error', e);
    }
  }
}

exports.TDAmeritradeStreamEventProcessor = TDAmeritradeStreamEventProcessor;
