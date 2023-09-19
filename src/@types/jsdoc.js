/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */

/**
 * Single Symbol, Comma Seperated Symbols or Array of Symbols ("SPY" | "SPY, QQQ" | ["SPY", "QQQ"])
 * @typedef {(string|string[])} TickerSymbolKeys
 */

/** @typedef {(string|string[])} FuturesSymbol */

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

/**
 * Represents an active option.
 *
 * @typedef {Object} ActiveOption
 * @property {string} symbol - The symbol of the active option.
 * @property {string} description - The description of the active option.
 * @property {number} volume - The volume of the active option.
 * @property {number} percentChange - The percentage change of the active option.
 */

/**
 * Emitted when `AUTHORIZED` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#AUTHORIZED
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `ACCT_ACTIVITY` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#ACCT_ACTIVITY
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `QUOTE` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#QUOTE
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `TIMESALE_EQUITY_UPDATE` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#TIMESALE_EQUITY_UPDATE
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `OPTION` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#OPTION
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `TIMESALE_FUTURES_UPDATE` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#TIMESALE_FUTURES_UPDATE
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `LEVELONE_FUTURES_UPDATE` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#LEVELONE_FUTURES_UPDATE
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `NEWS_HEADLINE` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#NEWS_HEADLINE
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `ACTIVES_NASDAQ` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#ACTIVES_NASDAQ
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `ACTIVES_NYSE` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#ACTIVES_NYSE
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `ACTIVES_OPTIONS` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#ACTIVES_OPTIONS
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `LISTED_BOOK` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#LISTED_BOOK
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `NASDAQ_BOOK` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#NASDAQ_BOOK
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `CHART_SNAPSHOT` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#CHART_SNAPSHOT
 * @param {Object} data - Stream Event Data
 */

/**
 * Emitted when `CHART_UPDATE` streamer event is emitted.
 *
 * @event TDAmeritradeStreamer#CHART_UPDATE
 * @param {Object} data - Stream Event Data
 */