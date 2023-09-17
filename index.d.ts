declare module '@allensarkisyan/schwab-td-ameritrade-streamer/td-constants' {
  /**
   * @author Allen Sarkisyan
   * @copyright 2019 - 2023 XT-TX
   * @license MIT Open Source License
   */
  export const STATE: Readonly<{
    CONNECTING: 'connecting';
    CONNECTED: 'connected';
    AUTHENTICATED: 'authenticated';
    DISCONNECTING: 'disconnecting';
    DISCONNECTED: 'disconnected';
  }>;
  export const EVENT: Readonly<{
    STATE_CHANGE: 'state_change';
    MESSAGE: 'message';
    ACCOUNT_ACTIVITY: 'account_activity';
    CHART: 'chart';
    CHART_EQUITY: 'chart_equity';
    CHART_FUTURES: 'chart_futures';
    CHART_OPTIONS: 'chart_options';
    NEWS_HEADLINE: 'news_headline';
    TIMESALE: 'timesale';
    TIMESALE_EQUITY: 'timesale_equity';
    TIMESALE_FUTURES: 'timesale_futures';
    TIMESALE_OPTIONS: 'timesale_options';
    TIMESALE_FOREX: 'timesale_forex';
    LEVEL_ONE_EQUITY: 'level_one_equity';
    LEVEL_ONE_FUTURES: 'level_one_futures';
    CHART_HISTORY_FUTURES: 'chart_history_futures';
    FUTURES_BOOK: 'futures_book';
    LISTED_BOOK: 'listed_book';
    NASDAQ_BOOK: 'nasdaq_book';
    OPTIONS_BOOK: 'options_book';
    FUTURES_OPTIONS_BOOK: 'futures_options_book';
    ERROR: 'error';
  }>;
  export const ERROR: Readonly<{
    UNKNOWN: 'unknown_error';
    UNKNOWN_MESSAGE: 'unknown_message';
    UNKNOWN_RESPONSE: 'unknown_response';
    UNKNOWN_NOTIFICATION: 'unknown_notification';
    UNKNOWN_DATA: 'unknown_data';
    INVALID_MESSAGE: 'invalid_message';
    CONNECTION_REFUSED: 'connection_refused';
    AUTHENTICATION_FAILED: 'authentication_failed';
  }>;
  export const COMMANDS: Readonly<{
    LOGIN: 'LOGIN';
    STREAM: 'STREAM';
    QOS: 'QOS';
    SUBS: 'SUBS';
    ADD: 'ADD';
    UNSUBS: 'UNSUBS';
    VIEW: 'VIEW';
    LOGOUT: 'LOGOUT';
    GET: 'GET';
  }>;
  export const SERVICES: Readonly<{
    ACCT_ACTIVITY: 'ACCT_ACTIVITY';
    ADMIN: 'ADMIN';
    ACTIVES_NASDAQ: 'ACTIVES_NASDAQ';
    ACTIVES_NYSE: 'ACTIVES_NYSE';
    ACTIVES_OTCBB: 'ACTIVES_OTCBB';
    ACTIVES_OPTIONS: 'ACTIVES_OPTIONS';
    FOREX_BOOK: 'FOREX_BOOK';
    FUTURES_BOOK: 'FUTURES_BOOK';
    LISTED_BOOK: 'LISTED_BOOK';
    NASDAQ_BOOK: 'NASDAQ_BOOK';
    OPTIONS_BOOK: 'OPTIONS_BOOK';
    FUTURES_OPTIONS_BOOK: 'FUTURES_OPTIONS_BOOK';
    CHART_EQUITY: 'CHART_EQUITY';
    CHART_FUTURES: 'CHART_FUTURES';
    CHART_HISTORY_FUTURES: 'CHART_HISTORY_FUTURES';
    QUOTE: 'QUOTE';
    LEVELONE_FUTURES: 'LEVELONE_FUTURES';
    LEVELONE_FOREX: 'LEVELONE_FOREX';
    LEVELONE_FUTURES_OPTIONS: 'LEVELONE_FUTURES_OPTIONS';
    OPTION: 'OPTION';
    LEVELTWO_FUTURES: 'LEVELTWO_FUTURES';
    NEWS_HEADLINE: 'NEWS_HEADLINE';
    NEWS_STORY: 'NEWS_STORY';
    NEWS_HEADLINE_LIST: 'NEWS_HEADLINE_LIST';
    STREAMER_SERVER: 'STREAMER_SERVER';
    TIMESALE_EQUITY: 'TIMESALE_EQUITY';
    TIMESALE_FUTURES: 'TIMESALE_FUTURES';
    TIMESALE_FOREX: 'TIMESALE_FOREX';
    TIMESALE_OPTIONS: 'TIMESALE_OPTIONS';
  }>;
  export const QOS: Readonly<{
    express: 0;
    realtime: 1;
    fast: 2;
    moderate: 3;
    slow: 4;
    delayed: 5;
  }>;
  export const ACCT_ACTIVITY: Readonly<{
    subscriptionKey: 0;
    accountNumber: 1;
    messageType: 2;
    messageData: 3;
  }>;
  export const CHART_EQUITY: Readonly<{
    key: 0;
    openPrice: 1;
    highPrice: 2;
    lowPrice: 3;
    closePrice: 4;
    volume: 5;
    sequence: 6;
    chartTime: 7;
    chartDay: 8;
  }>;
  export const CHART_FUTURES: Readonly<{
    key: 0;
    chartTime: 1;
    openPrice: 2;
    highPrice: 3;
    lowPrice: 4;
    closePrice: 5;
    volume: 6;
  }>;
  export const CHART_OPTIONS: Readonly<{
    key: 0;
    chartTime: 1;
    openPrice: 2;
    highPrice: 3;
    lowPrice: 4;
    closePrice: 5;
    volume: 6;
  }>;
  export const NEWS_HEADLINE: Readonly<{
    symbol: 0;
    errorCode: 1;
    storyDatetime: 2;
    headlineId: 3;
    status: 4;
    headline: 5;
    storyId: 6;
    countForKeyword: 7;
    keywordArray: 8;
    isHot: 9;
    storySource: 10;
  }>;
  export const TIMESALE: Readonly<{
    symbol: 0;
    tradeTime: 1;
    lastPrice: 2;
    lastSize: 3;
    lastSequence: 4;
  }>;
  export const LEVEL_ONE_EQUITY: Readonly<{
    symbol: 0;
    bidPrice: 1;
    askPrice: 2;
    lastPrice: 3;
    bidSize: 4;
    askSize: 5;
    askID: 6;
    bidID: 7;
    totalVolume: 8;
    lastSize: 9;
    tradeTime: 10;
    quoteTime: 11;
    highPrice: 12;
    lowPrice: 13;
    bidTick: 14;
    closePrice: 15;
    exchangeID: 16;
    marginable: 17;
    shortable: 18;
    quoteDay: 22;
    tradeDay: 23;
    volatility: 24;
    description: 25;
    lastID: 26;
    digits: 27;
    openPrice: 28;
    netChange: 29;
    '52WeekHigh': 30;
    '52WeekLow': 31;
    peRatio: 32;
    dividendAmount: 33;
    dividendYield: 34;
    nav: 37;
    fundPrice: 38;
    exchangeName: 39;
    dividendDate: 40;
    regularMarketQuote: 41;
    regularMarketTrade: 42;
    regularMarketLastPrice: 43;
    regularMarketLastSize: 44;
    regularMarketTradeTime: 45;
    regularMarketTradeDay: 46;
    regularMarketNetChange: 47;
    securityStatus: 48;
    mark: 49;
    quoteTimeInLong: 50;
    tradeTimeInLong: 51;
    regularMarketTradeTimeInLong: 52;
  }>;
  export const LEVEL_ONE_FUTURES: Readonly<{
    symbol: 0;
    bidPrice: 1;
    askPrice: 2;
    lastPrice: 3;
    bidSize: 4;
    askSize: 5;
    askID: 6;
    bidID: 7;
    totalVolume: 8;
    lastSize: 9;
    quoteTime: 10;
    tradeTime: 11;
    highPrice: 12;
    lowPrice: 13;
    closePrice: 14;
    exchangeID: 15;
    description: 16;
    lastID: 17;
    openPrice: 18;
    netChange: 19;
    futurePercentChange: 20;
    exhangeName: 21;
    securityStatus: 22;
    openInterest: 23;
    mark: 24;
    tick: 25;
    tickAmount: 26;
    product: 27;
    futurePriceFormat: 28;
    futureTradingHours: 29;
    futureIsTradable: 30;
    futureMultiplier: 31;
    futureIsActive: 32;
    futureSettlementPrice: 33;
    futureActiveSymbol: 34;
    futureExpirationDate: 35;
  }>;
  export const LEVEL_ONE_OPTION: Readonly<{
    symbol: 0;
    description: 1;
    bidPrice: 2;
    askPrice: 3;
    lastPrice: 4;
    highPrice: 5;
    lowPrice: 6;
    closePrice: 7;
    totalVolume: 8;
    openInterest: 9;
    volatility: 10;
    quoteTime: 11;
    tradeTime: 12;
    intrinsicValue: 13;
    openPrice: 19;
    bidSize: 20;
    askSize: 21;
    lastSize: 22;
    netChange: 23;
    strikePrice: 24;
    contractType: 25;
    underlying: 26;
    expirationMonth: 27;
    timeValue: 29;
    expirationDay: 30;
    dte: 31;
    delta: 32;
    gamma: 33;
    theta: 34;
    vega: 35;
    rho: 36;
    securityStatus: 37;
    theoreticalOptionValue: 38;
    underlyingPrice: 39;
    expirationType: 40;
    mark: 41;
  }>;
  export const LISTED_BOOK: Readonly<{
    symbol: 0;
    bookTime: 1;
    bids: 2;
    asks: 3;
  }>;
  export const NASDAQ_BOOK: Readonly<{
    symbol: 0;
    bookTime: 1;
    bids: 2;
    asks: 3;
  }>;
  export const OPTIONS_BOOK: Readonly<{
    symbol: 0;
    bookTime: 1;
    bids: 2;
    asks: 3;
  }>;
  export const BID_FIELDS: Readonly<{
    price: 0;
    totalVolume: 1;
    numBids: 2;
    bids: 3;
  }>;
  export const ASK_FIELDS: Readonly<{
    price: 0;
    totalVolume: 1;
    numAsks: 2;
    asks: 3;
  }>;
  export const ORDER_BOOK_EXCHANGE_FIELDS: Readonly<{
    exchange: 0;
    volume: 1;
    sequence: 2;
  }>;
  export const FIELDS: Readonly<{
    QOS: typeof QOS;
    ACCT_ACTIVITY: typeof ACCT_ACTIVITY;
    CHART_EQUITY: typeof CHART_EQUITY;
    CHART_FUTURES: typeof CHART_FUTURES;
    CHART_OPTIONS: typeof CHART_OPTIONS;
    NEWS_HEADLINE: typeof NEWS_HEADLINE;
    TIMESALE: typeof TIMESALE;
    LEVEL_ONE_EQUITY: typeof LEVEL_ONE_EQUITY;
    LEVEL_ONE_FUTURES: typeof LEVEL_ONE_FUTURES;
    LEVEL_ONE_OPTION: typeof LEVEL_ONE_OPTION;
    LISTED_BOOK: typeof LISTED_BOOK;
    NASDAQ_BOOK: typeof NASDAQ_BOOK;
    OPTIONS_BOOK: typeof OPTIONS_BOOK;
    BID_FIELDS: typeof BID_FIELDS;
    ASK_FIELDS: typeof ASK_FIELDS;
    ORDER_BOOK_EXCHANGE_FIELDS: typeof ORDER_BOOK_EXCHANGE_FIELDS;
  }>;
}
declare module '@allensarkisyan/schwab-td-ameritrade-streamer/@types' {
  /**
   * @author Allen Sarkisyan
   * @copyright 2019 - 2023 XT-TX
   * @license MIT Open Source License
   */
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
    quotes: Record<string, boolean>;
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
  /**
   * Type for Ticker Symbol Keys - Single Symbol, Comma Seperated Symbols or Array of Symbols ("SPY" | "SPY, QQQ" | ["SPY", "QQQ"])
   */
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
}
declare module '@allensarkisyan/schwab-td-ameritrade-streamer/td-notifications' {
  import type { TDAmeritradeActivityMessage } from '@allensarkisyan/schwab-td-ameritrade-streamer/@types';
  export const parseOrderEntryMessage: (
    msg: TDAmeritradeActivityMessage,
  ) => any;
  export const parseOrderFillMessage: (msg: TDAmeritradeActivityMessage) => any;
  export const parseCancelMessage: (msg: TDAmeritradeActivityMessage) => any;
}
declare module '@allensarkisyan/schwab-td-ameritrade-streamer/utils' {
  import type { TDAmeritradeStreamDataResponse } from '@allensarkisyan/schwab-td-ameritrade-streamer/@types';
  export const randomID: () => number;
  export const jsonToQueryString: <TObj extends object>(json: TObj) => string;
  export const getKeys: (symbol: string | string[]) => string;
  export const chunk: (arr?: any[], size?: number) => any[][];
  export const transformMessageData: (
    data: any[],
    fieldKeys: string[],
    fieldValues: any[],
  ) => any[];
  export const transformData: (
    data: TDAmeritradeStreamDataResponse,
    fields: Readonly<object>,
  ) => any[];
  export const parseActivesMessage: (msg: TDAmeritradeStreamDataResponse) => {
    symbol: any;
    volume: any;
    percentChange: any;
  }[];
  export const parseListedBook: (data: any) =>
    | {
        bids: any[];
        asks: any[];
      }[]
    | null;
}
declare module '@allensarkisyan/schwab-td-ameritrade-streamer/td-stream-event-processor' {
  /**
   * @author Allen Sarkisyan
   * @copyright 2019 - 2023 XT-TX
   * @license MIT Open Source License
   */
  import { EventEmitter } from 'eventemitter3';
  import type {
    TDAmeritradeStreamDataResponse,
    TDAmeritradeStreamEventProcessorEventMessage,
  } from '@allensarkisyan/schwab-td-ameritrade-streamer/@types';
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
      handleLevelOneTimeSaleUpdate?: Function,
    );
    /**
     *
     * @param {TDAmeritradeStreamEventProcessorEventMessage} TDAmeritradeStreamResponse
     * @param {TDAmeritradeStreamServiceResponse} TDAmeritradeStreamResponse.response - Response
     * @param {TDAmeritradeStreamDataResponse[]} TDAmeritradeStreamResponse.data - Response Data
     * @param {TDAmeritradeStreamDataResponse} TDAmeritradeStreamResponse.snapshot - Response Data Snapshot
     */
    handleMessage({
      response,
      data,
      snapshot,
    }: TDAmeritradeStreamEventProcessorEventMessage): void;
    /**
     *
     * @param {string} evt - Event Name
     * @param {(Object|Array|string|number|boolean)} [data] - Event Data
     */
    emitEvent(
      evt: string,
      data?: object | symbol | string | number | boolean | null,
    ): void;
    handleAccountActivity(msg: TDAmeritradeStreamDataResponse): void;
    handleQuotes(msg: TDAmeritradeStreamDataResponse): void;
    handleTimeSales(msg: TDAmeritradeStreamDataResponse): void;
    handleOptions(msg: TDAmeritradeStreamDataResponse): void;
    handleLevelOneFutures(
      msg: TDAmeritradeStreamDataResponse,
      timeSales?: boolean,
    ): void;
    handleNews(msg: TDAmeritradeStreamDataResponse): void;
    handleActivesNasdaq(msg: TDAmeritradeStreamDataResponse): void;
    handleActivesNYSE(msg: TDAmeritradeStreamDataResponse): void;
    handleListedBook(msg: TDAmeritradeStreamDataResponse): void;
    handleNasdaqBook(msg: TDAmeritradeStreamDataResponse): void;
    handleActiveOptions(msg: TDAmeritradeStreamDataResponse): void;
  }
}
declare module '@allensarkisyan/schwab-td-ameritrade-streamer' {
  import type {
    TDAmeritradeStreamerConnectionOptions,
    TickerSymbolKeys,
  } from '@allensarkisyan/schwab-td-ameritrade-streamer/@types';
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
      handleLevelOneTimeSaleUpdate?: Function,
    );
    on(evt: string, method: any, context?: any): void;
    add(evt: string, method: any, context?: any): void;
    /**
     * Subscribe to Account Activity Service
     */
    subscribeAccountActivity(): void;
    /**
     * Subscribe to Chart and Quotes Service
     * @param {TickerSymbolKeys} symbol
     */
    getChartHistoryAndSubscribeQuotes(symbol: TickerSymbolKeys): void;
    /**
     * Subscribe to Quote Service
     * @param {TickerSymbolKeys} symbol
     */
    subscribeQuotes(symbol: TickerSymbolKeys): void;
    /**
     * Subscribe to Chart Equity Service
     * @param {TickerSymbolKeys} symbol
     */
    subscribeCharts(symbol: TickerSymbolKeys): void;
    /**
     * Subscribe to Option Service
     * @param {TickerSymbolKeys} symbol
     */
    subscribeOptions(symbol: TickerSymbolKeys): void;
    /**
     * Subscribe to Time & Sales Equity Service
     * @param {TickerSymbolKeys} symbol
     */
    subscribeTimeAndSales(symbol: TickerSymbolKeys): void;
    /**
     * Subscribe to Futures Chart History, Chart, Time & Sales & Level One Services
     * @param {TickerSymbolKeys} symbol
     */
    subscribeFutures(symbol?: TickerSymbolKeys): void;
    /**
     * Subscribe to Futures Time & Sales Service
     * @param {TickerSymbolKeys} symbol
     */
    subscribeTimeSalesFutures(symbol?: TickerSymbolKeys): void;
    /**
     * Subscribe to Level One Futures Options Service
     * './EW1X20C3510, ./EW1X20C3525'
     * @param {TickerSymbolKeys} symbol
     */
    subscribeFuturesOptions(symbol: TickerSymbolKeys): void;
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
     * Subscribe to Listed Order Book Service
     * @param {TickerSymbolKeys} symbol
     */
    subscribeListedBook(symbol: TickerSymbolKeys): void;
    /**
     * Subscribe to Nasdaq Order Book Service
     * @param {TickerSymbolKeys} symbol
     */
    subscribeNasdaqBook(symbol: TickerSymbolKeys): void;
    /**
     * Subscribe to Options Order Book Service
     * @param {TickerSymbolKeys} symbol
     */
    subscribeOptionsBook(symbol: TickerSymbolKeys): void;
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
    handleLevelOneFeedUpdate?: Function,
    handleLevelOneTimeSaleUpdate?: Function,
  ): TDAmeritradeStreamer;
}
