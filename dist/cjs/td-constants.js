'use strict';
/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.FIELDS =
  exports.ORDER_BOOK_EXCHANGE_FIELDS =
  exports.ASK_FIELDS =
  exports.BID_FIELDS =
  exports.OPTIONS_BOOK =
  exports.NASDAQ_BOOK =
  exports.LISTED_BOOK =
  exports.LEVEL_ONE_OPTION =
  exports.LEVEL_ONE_FUTURES =
  exports.LEVEL_ONE_EQUITY =
  exports.TIMESALE =
  exports.NEWS_HEADLINE =
  exports.CHART_OPTIONS =
  exports.CHART_FUTURES =
  exports.CHART_EQUITY =
  exports.ACCT_ACTIVITY =
  exports.QOS =
  exports.SERVICES =
  exports.COMMANDS =
  exports.ERROR =
  exports.EVENT =
  exports.STATE =
    void 0;
exports.STATE = Object.freeze({
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  AUTHENTICATED: 'authenticated',
  DISCONNECTING: 'disconnecting',
  DISCONNECTED: 'disconnected',
});
exports.EVENT = Object.freeze({
  STATE_CHANGE: 'state_change',
  MESSAGE: 'message',
  ACCOUNT_ACTIVITY: 'account_activity',
  CHART: 'chart',
  CHART_EQUITY: 'chart_equity',
  CHART_FUTURES: 'chart_futures',
  CHART_OPTIONS: 'chart_options',
  NEWS_HEADLINE: 'news_headline',
  TIMESALE: 'timesale',
  TIMESALE_EQUITY: 'timesale_equity',
  TIMESALE_FUTURES: 'timesale_futures',
  TIMESALE_OPTIONS: 'timesale_options',
  TIMESALE_FOREX: 'timesale_forex',
  LEVEL_ONE_EQUITY: 'level_one_equity',
  LEVEL_ONE_FUTURES: 'level_one_futures',
  CHART_HISTORY_FUTURES: 'chart_history_futures',
  FUTURES_BOOK: 'futures_book',
  LISTED_BOOK: 'listed_book',
  NASDAQ_BOOK: 'nasdaq_book',
  OPTIONS_BOOK: 'options_book',
  FUTURES_OPTIONS_BOOK: 'futures_options_book',
  ERROR: 'error',
});
exports.ERROR = Object.freeze({
  UNKNOWN: 'unknown_error',
  UNKNOWN_MESSAGE: 'unknown_message',
  UNKNOWN_RESPONSE: 'unknown_response',
  UNKNOWN_NOTIFICATION: 'unknown_notification',
  UNKNOWN_DATA: 'unknown_data',
  INVALID_MESSAGE: 'invalid_message',
  CONNECTION_REFUSED: 'connection_refused',
  AUTHENTICATION_FAILED: 'authentication_failed',
});
exports.COMMANDS = Object.freeze({
  LOGIN: 'LOGIN',
  STREAM: 'STREAM',
  QOS: 'QOS',
  SUBS: 'SUBS',
  ADD: 'ADD',
  UNSUBS: 'UNSUBS',
  VIEW: 'VIEW',
  LOGOUT: 'LOGOUT',
  GET: 'GET',
});
exports.SERVICES = Object.freeze({
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
exports.QOS = Object.freeze({
  express: 0,
  realtime: 1,
  fast: 2,
  moderate: 3,
  slow: 4,
  delayed: 5,
});
exports.ACCT_ACTIVITY = Object.freeze({
  subscriptionKey: 0,
  accountNumber: 1,
  messageType: 2,
  messageData: 3,
});
exports.CHART_EQUITY = Object.freeze({
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
exports.CHART_FUTURES = Object.freeze({
  key: 0,
  chartTime: 1,
  openPrice: 2,
  highPrice: 3,
  lowPrice: 4,
  closePrice: 5,
  volume: 6,
});
exports.CHART_OPTIONS = Object.freeze({
  key: 0,
  chartTime: 1,
  openPrice: 2,
  highPrice: 3,
  lowPrice: 4,
  closePrice: 5,
  volume: 6,
});
exports.NEWS_HEADLINE = Object.freeze({
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
exports.TIMESALE = Object.freeze({
  symbol: 0,
  tradeTime: 1,
  lastPrice: 2,
  lastSize: 3,
  lastSequence: 4,
});
exports.LEVEL_ONE_EQUITY = Object.freeze({
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
exports.LEVEL_ONE_FUTURES = Object.freeze({
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
exports.LEVEL_ONE_OPTION = Object.freeze({
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
exports.LISTED_BOOK = Object.freeze({
  symbol: 0,
  bookTime: 1,
  bids: 2,
  asks: 3,
});
exports.NASDAQ_BOOK = Object.freeze({
  symbol: 0,
  bookTime: 1,
  bids: 2,
  asks: 3,
});
exports.OPTIONS_BOOK = Object.freeze({
  symbol: 0,
  bookTime: 1,
  bids: 2,
  asks: 3,
});
exports.BID_FIELDS = Object.freeze({
  price: 0,
  totalVolume: 1,
  numBids: 2,
  bids: 3,
});
exports.ASK_FIELDS = Object.freeze({
  price: 0,
  totalVolume: 1,
  numAsks: 2,
  asks: 3,
});
exports.ORDER_BOOK_EXCHANGE_FIELDS = Object.freeze({
  exchange: 0,
  volume: 1,
  sequence: 2,
});
exports.FIELDS = Object.freeze({
  QOS: exports.QOS,
  ACCT_ACTIVITY: exports.ACCT_ACTIVITY,
  CHART_EQUITY: exports.CHART_EQUITY,
  CHART_FUTURES: exports.CHART_FUTURES,
  CHART_OPTIONS: exports.CHART_OPTIONS,
  NEWS_HEADLINE: exports.NEWS_HEADLINE,
  TIMESALE: exports.TIMESALE,
  LEVEL_ONE_EQUITY: exports.LEVEL_ONE_EQUITY,
  LEVEL_ONE_FUTURES: exports.LEVEL_ONE_FUTURES,
  LEVEL_ONE_OPTION: exports.LEVEL_ONE_OPTION,
  LISTED_BOOK: exports.LISTED_BOOK,
  NASDAQ_BOOK: exports.NASDAQ_BOOK,
  OPTIONS_BOOK: exports.OPTIONS_BOOK,
  BID_FIELDS: exports.BID_FIELDS,
  ASK_FIELDS: exports.ASK_FIELDS,
  ORDER_BOOK_EXCHANGE_FIELDS: exports.ORDER_BOOK_EXCHANGE_FIELDS,
});
