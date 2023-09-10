import type { TDAmeritradeStreamServiceResponse, TDAmeritradeStreamDataResponse } from './td-stream-event-processor.js';
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
/** @typedef {(string|Array<string>)} TickerSymbolKeys */
/** @typedef {(string|Array<string>)} FuturesSymbol */
export declare class TDAmeritradeStreamer {
    #private;
    /**
     * @constructor
     * @param {TDAmeritradeStreamerConnectionOptions} streamerConnectionOptions
     * @param {Function} handleLevelOneFeedUpdate
     * @param {Function} handleLevelOneTimeSaleUpdate
     */
    constructor(streamerConnectionOptions: TDAmeritradeStreamerConnectionOptions, handleLevelOneFeedUpdate?: Function, handleLevelOneTimeSaleUpdate?: Function);
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
