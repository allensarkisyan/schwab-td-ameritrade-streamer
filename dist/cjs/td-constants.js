"use strict";
/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIELDS = exports.ORDER_BOOK_EXCHANGE_FIELDS = exports.ASK_FIELDS = exports.BID_FIELDS = exports.OPTIONS_BOOK = exports.NASDAQ_BOOK = exports.LISTED_BOOK = exports.LEVEL_ONE_OPTION = exports.LEVEL_ONE_FUTURES = exports.LEVEL_ONE_EQUITY = exports.TIMESALE = exports.NEWS_HEADLINE = exports.CHART_OPTIONS = exports.CHART_FUTURES = exports.CHART_EQUITY = exports.ACCT_ACTIVITY = exports.QOS = exports.SERVICES = exports.COMMANDS = exports.ERROR = exports.EVENT = exports.STATE = void 0;
var STATE;
(function (STATE) {
    STATE["CONNECTING"] = "connecting";
    STATE["CONNECTED"] = "connected";
    STATE["AUTHENTICATED"] = "authenticated";
    STATE["DISCONNECTING"] = "disconnecting";
    STATE["DISCONNECTED"] = "disconnected";
})(STATE || (exports.STATE = STATE = {}));
;
var EVENT;
(function (EVENT) {
    EVENT["STATE_CHANGE"] = "state_change";
    EVENT["MESSAGE"] = "message";
    EVENT["ACCOUNT_ACTIVITY"] = "account_activity";
    EVENT["CHART"] = "chart";
    EVENT["CHART_EQUITY"] = "chart_equity";
    EVENT["CHART_FUTURES"] = "chart_futures";
    EVENT["CHART_OPTIONS"] = "chart_options";
    EVENT["NEWS_HEADLINE"] = "news_headline";
    EVENT["TIMESALE"] = "timesale";
    EVENT["TIMESALE_EQUITY"] = "timesale_equity";
    EVENT["TIMESALE_FUTURES"] = "timesale_futures";
    EVENT["TIMESALE_OPTIONS"] = "timesale_options";
    EVENT["TIMESALE_FOREX"] = "timesale_forex";
    EVENT["LEVEL_ONE_EQUITY"] = "level_one_equity";
    EVENT["LEVEL_ONE_FUTURES"] = "level_one_futures";
    EVENT["CHART_HISTORY_FUTURES"] = "chart_history_futures";
    EVENT["FUTURES_BOOK"] = "futures_book";
    EVENT["LISTED_BOOK"] = "listed_book";
    EVENT["NASDAQ_BOOK"] = "nasdaq_book";
    EVENT["OPTIONS_BOOK"] = "options_book";
    EVENT["FUTURES_OPTIONS_BOOK"] = "futures_options_book";
    EVENT["ERROR"] = "error";
})(EVENT || (exports.EVENT = EVENT = {}));
;
var ERROR;
(function (ERROR) {
    ERROR["UNKNOWN"] = "unknown_error";
    ERROR["UNKNOWN_MESSAGE"] = "unknown_message";
    ERROR["UNKNOWN_RESPONSE"] = "unknown_response";
    ERROR["UNKNOWN_NOTIFICATION"] = "unknown_notification";
    ERROR["UNKNOWN_DATA"] = "unknown_data";
    ERROR["INVALID_MESSAGE"] = "invalid_message";
    ERROR["CONNECTION_REFUSED"] = "connection_refused";
    ERROR["AUTHENTICATION_FAILED"] = "authentication_failed";
})(ERROR || (exports.ERROR = ERROR = {}));
;
var COMMANDS;
(function (COMMANDS) {
    COMMANDS["LOGIN"] = "LOGIN";
    COMMANDS["STREAM"] = "STREAM";
    COMMANDS["QOS"] = "QOS";
    COMMANDS["SUBS"] = "SUBS";
    COMMANDS["ADD"] = "ADD";
    COMMANDS["UNSUBS"] = "UNSUBS";
    COMMANDS["VIEW"] = "VIEW";
    COMMANDS["LOGOUT"] = "LOGOUT";
    COMMANDS["GET"] = "GET";
})(COMMANDS || (exports.COMMANDS = COMMANDS = {}));
;
var SERVICES;
(function (SERVICES) {
    SERVICES["ACCT_ACTIVITY"] = "ACCT_ACTIVITY";
    SERVICES["ADMIN"] = "ADMIN";
    SERVICES["ACTIVES_NASDAQ"] = "ACTIVES_NASDAQ";
    SERVICES["ACTIVES_NYSE"] = "ACTIVES_NYSE";
    SERVICES["ACTIVES_OTCBB"] = "ACTIVES_OTCBB";
    SERVICES["ACTIVES_OPTIONS"] = "ACTIVES_OPTIONS";
    SERVICES["FOREX_BOOK"] = "FOREX_BOOK";
    SERVICES["FUTURES_BOOK"] = "FUTURES_BOOK";
    SERVICES["LISTED_BOOK"] = "LISTED_BOOK";
    SERVICES["NASDAQ_BOOK"] = "NASDAQ_BOOK";
    SERVICES["OPTIONS_BOOK"] = "OPTIONS_BOOK";
    SERVICES["FUTURES_OPTIONS_BOOK"] = "FUTURES_OPTIONS_BOOK";
    SERVICES["CHART_EQUITY"] = "CHART_EQUITY";
    SERVICES["CHART_FUTURES"] = "CHART_FUTURES";
    SERVICES["CHART_HISTORY_FUTURES"] = "CHART_HISTORY_FUTURES";
    SERVICES["QUOTE"] = "QUOTE";
    SERVICES["LEVELONE_FUTURES"] = "LEVELONE_FUTURES";
    SERVICES["LEVELONE_FOREX"] = "LEVELONE_FOREX";
    SERVICES["LEVELONE_FUTURES_OPTIONS"] = "LEVELONE_FUTURES_OPTIONS";
    SERVICES["OPTION"] = "OPTION";
    SERVICES["LEVELTWO_FUTURES"] = "LEVELTWO_FUTURES";
    SERVICES["NEWS_HEADLINE"] = "NEWS_HEADLINE";
    SERVICES["NEWS_STORY"] = "NEWS_STORY";
    SERVICES["NEWS_HEADLINE_LIST"] = "NEWS_HEADLINE_LIST";
    SERVICES["STREAMER_SERVER"] = "STREAMER_SERVER";
    SERVICES["TIMESALE_EQUITY"] = "TIMESALE_EQUITY";
    SERVICES["TIMESALE_FUTURES"] = "TIMESALE_FUTURES";
    SERVICES["TIMESALE_FOREX"] = "TIMESALE_FOREX";
    SERVICES["TIMESALE_OPTIONS"] = "TIMESALE_OPTIONS";
})(SERVICES || (exports.SERVICES = SERVICES = {}));
;
var QOS;
(function (QOS) {
    QOS[QOS["express"] = 0] = "express";
    QOS[QOS["realtime"] = 1] = "realtime";
    QOS[QOS["fast"] = 2] = "fast";
    QOS[QOS["moderate"] = 3] = "moderate";
    QOS[QOS["slow"] = 4] = "slow";
    QOS[QOS["delayed"] = 5] = "delayed";
})(QOS || (exports.QOS = QOS = {}));
;
var ACCT_ACTIVITY;
(function (ACCT_ACTIVITY) {
    ACCT_ACTIVITY[ACCT_ACTIVITY["subscriptionKey"] = 0] = "subscriptionKey";
    ACCT_ACTIVITY[ACCT_ACTIVITY["accountNumber"] = 1] = "accountNumber";
    ACCT_ACTIVITY[ACCT_ACTIVITY["messageType"] = 2] = "messageType";
    ACCT_ACTIVITY[ACCT_ACTIVITY["messageData"] = 3] = "messageData";
})(ACCT_ACTIVITY || (exports.ACCT_ACTIVITY = ACCT_ACTIVITY = {}));
;
var CHART_EQUITY;
(function (CHART_EQUITY) {
    CHART_EQUITY[CHART_EQUITY["key"] = 0] = "key";
    CHART_EQUITY[CHART_EQUITY["openPrice"] = 1] = "openPrice";
    CHART_EQUITY[CHART_EQUITY["highPrice"] = 2] = "highPrice";
    CHART_EQUITY[CHART_EQUITY["lowPrice"] = 3] = "lowPrice";
    CHART_EQUITY[CHART_EQUITY["closePrice"] = 4] = "closePrice";
    CHART_EQUITY[CHART_EQUITY["volume"] = 5] = "volume";
    CHART_EQUITY[CHART_EQUITY["sequence"] = 6] = "sequence";
    CHART_EQUITY[CHART_EQUITY["chartTime"] = 7] = "chartTime";
    CHART_EQUITY[CHART_EQUITY["chartDay"] = 8] = "chartDay";
})(CHART_EQUITY || (exports.CHART_EQUITY = CHART_EQUITY = {}));
;
var CHART_FUTURES;
(function (CHART_FUTURES) {
    CHART_FUTURES[CHART_FUTURES["key"] = 0] = "key";
    CHART_FUTURES[CHART_FUTURES["chartTime"] = 1] = "chartTime";
    CHART_FUTURES[CHART_FUTURES["openPrice"] = 2] = "openPrice";
    CHART_FUTURES[CHART_FUTURES["highPrice"] = 3] = "highPrice";
    CHART_FUTURES[CHART_FUTURES["lowPrice"] = 4] = "lowPrice";
    CHART_FUTURES[CHART_FUTURES["closePrice"] = 5] = "closePrice";
    CHART_FUTURES[CHART_FUTURES["volume"] = 6] = "volume";
})(CHART_FUTURES || (exports.CHART_FUTURES = CHART_FUTURES = {}));
;
var CHART_OPTIONS;
(function (CHART_OPTIONS) {
    CHART_OPTIONS[CHART_OPTIONS["key"] = 0] = "key";
    CHART_OPTIONS[CHART_OPTIONS["chartTime"] = 1] = "chartTime";
    CHART_OPTIONS[CHART_OPTIONS["openPrice"] = 2] = "openPrice";
    CHART_OPTIONS[CHART_OPTIONS["highPrice"] = 3] = "highPrice";
    CHART_OPTIONS[CHART_OPTIONS["lowPrice"] = 4] = "lowPrice";
    CHART_OPTIONS[CHART_OPTIONS["closePrice"] = 5] = "closePrice";
    CHART_OPTIONS[CHART_OPTIONS["volume"] = 6] = "volume";
})(CHART_OPTIONS || (exports.CHART_OPTIONS = CHART_OPTIONS = {}));
;
var NEWS_HEADLINE;
(function (NEWS_HEADLINE) {
    NEWS_HEADLINE[NEWS_HEADLINE["symbol"] = 0] = "symbol";
    NEWS_HEADLINE[NEWS_HEADLINE["errorCode"] = 1] = "errorCode";
    NEWS_HEADLINE[NEWS_HEADLINE["storyDatetime"] = 2] = "storyDatetime";
    NEWS_HEADLINE[NEWS_HEADLINE["headlineId"] = 3] = "headlineId";
    NEWS_HEADLINE[NEWS_HEADLINE["status"] = 4] = "status";
    NEWS_HEADLINE[NEWS_HEADLINE["headline"] = 5] = "headline";
    NEWS_HEADLINE[NEWS_HEADLINE["storyId"] = 6] = "storyId";
    NEWS_HEADLINE[NEWS_HEADLINE["countForKeyword"] = 7] = "countForKeyword";
    NEWS_HEADLINE[NEWS_HEADLINE["keywordArray"] = 8] = "keywordArray";
    NEWS_HEADLINE[NEWS_HEADLINE["isHot"] = 9] = "isHot";
    NEWS_HEADLINE[NEWS_HEADLINE["storySource"] = 10] = "storySource";
})(NEWS_HEADLINE || (exports.NEWS_HEADLINE = NEWS_HEADLINE = {}));
;
var TIMESALE;
(function (TIMESALE) {
    TIMESALE[TIMESALE["symbol"] = 0] = "symbol";
    TIMESALE[TIMESALE["tradeTime"] = 1] = "tradeTime";
    TIMESALE[TIMESALE["lastPrice"] = 2] = "lastPrice";
    TIMESALE[TIMESALE["lastSize"] = 3] = "lastSize";
    TIMESALE[TIMESALE["lastSequence"] = 4] = "lastSequence";
})(TIMESALE || (exports.TIMESALE = TIMESALE = {}));
;
var LEVEL_ONE_EQUITY;
(function (LEVEL_ONE_EQUITY) {
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["symbol"] = 0] = "symbol";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["bidPrice"] = 1] = "bidPrice";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["askPrice"] = 2] = "askPrice";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["lastPrice"] = 3] = "lastPrice";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["bidSize"] = 4] = "bidSize";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["askSize"] = 5] = "askSize";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["askID"] = 6] = "askID";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["bidID"] = 7] = "bidID";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["totalVolume"] = 8] = "totalVolume";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["lastSize"] = 9] = "lastSize";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["tradeTime"] = 10] = "tradeTime";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["quoteTime"] = 11] = "quoteTime";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["highPrice"] = 12] = "highPrice";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["lowPrice"] = 13] = "lowPrice";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["bidTick"] = 14] = "bidTick";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["closePrice"] = 15] = "closePrice";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["exchangeID"] = 16] = "exchangeID";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["marginable"] = 17] = "marginable";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["shortable"] = 18] = "shortable";
    // islandBid = 19,
    // islandAsk = 20,
    // islandVolume = 21,
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["quoteDay"] = 22] = "quoteDay";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["tradeDay"] = 23] = "tradeDay";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["volatility"] = 24] = "volatility";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["description"] = 25] = "description";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["lastID"] = 26] = "lastID";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["digits"] = 27] = "digits";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["openPrice"] = 28] = "openPrice";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["netChange"] = 29] = "netChange";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["52WeekHigh"] = 30] = "52WeekHigh";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["52WeekLow"] = 31] = "52WeekLow";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["peRatio"] = 32] = "peRatio";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["dividendAmount"] = 33] = "dividendAmount";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["dividendYield"] = 34] = "dividendYield";
    // islandBidSize = 35,
    // islandAskSize = 36,
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["nav"] = 37] = "nav";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["fundPrice"] = 38] = "fundPrice";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["exchangeName"] = 39] = "exchangeName";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["dividendDate"] = 40] = "dividendDate";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["regularMarketQuote"] = 41] = "regularMarketQuote";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["regularMarketTrade"] = 42] = "regularMarketTrade";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["regularMarketLastPrice"] = 43] = "regularMarketLastPrice";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["regularMarketLastSize"] = 44] = "regularMarketLastSize";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["regularMarketTradeTime"] = 45] = "regularMarketTradeTime";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["regularMarketTradeDay"] = 46] = "regularMarketTradeDay";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["regularMarketNetChange"] = 47] = "regularMarketNetChange";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["securityStatus"] = 48] = "securityStatus";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["mark"] = 49] = "mark";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["quoteTimeInLong"] = 50] = "quoteTimeInLong";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["tradeTimeInLong"] = 51] = "tradeTimeInLong";
    LEVEL_ONE_EQUITY[LEVEL_ONE_EQUITY["regularMarketTradeTimeInLong"] = 52] = "regularMarketTradeTimeInLong";
})(LEVEL_ONE_EQUITY || (exports.LEVEL_ONE_EQUITY = LEVEL_ONE_EQUITY = {}));
;
var LEVEL_ONE_FUTURES;
(function (LEVEL_ONE_FUTURES) {
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["symbol"] = 0] = "symbol";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["bidPrice"] = 1] = "bidPrice";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["askPrice"] = 2] = "askPrice";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["lastPrice"] = 3] = "lastPrice";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["bidSize"] = 4] = "bidSize";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["askSize"] = 5] = "askSize";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["askID"] = 6] = "askID";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["bidID"] = 7] = "bidID";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["totalVolume"] = 8] = "totalVolume";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["lastSize"] = 9] = "lastSize";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["quoteTime"] = 10] = "quoteTime";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["tradeTime"] = 11] = "tradeTime";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["highPrice"] = 12] = "highPrice";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["lowPrice"] = 13] = "lowPrice";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["closePrice"] = 14] = "closePrice";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["exchangeID"] = 15] = "exchangeID";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["description"] = 16] = "description";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["lastID"] = 17] = "lastID";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["openPrice"] = 18] = "openPrice";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["netChange"] = 19] = "netChange";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["futurePercentChange"] = 20] = "futurePercentChange";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["exhangeName"] = 21] = "exhangeName";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["securityStatus"] = 22] = "securityStatus";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["openInterest"] = 23] = "openInterest";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["mark"] = 24] = "mark";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["tick"] = 25] = "tick";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["tickAmount"] = 26] = "tickAmount";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["product"] = 27] = "product";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["futurePriceFormat"] = 28] = "futurePriceFormat";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["futureTradingHours"] = 29] = "futureTradingHours";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["futureIsTradable"] = 30] = "futureIsTradable";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["futureMultiplier"] = 31] = "futureMultiplier";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["futureIsActive"] = 32] = "futureIsActive";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["futureSettlementPrice"] = 33] = "futureSettlementPrice";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["futureActiveSymbol"] = 34] = "futureActiveSymbol";
    LEVEL_ONE_FUTURES[LEVEL_ONE_FUTURES["futureExpirationDate"] = 35] = "futureExpirationDate";
})(LEVEL_ONE_FUTURES || (exports.LEVEL_ONE_FUTURES = LEVEL_ONE_FUTURES = {}));
;
var LEVEL_ONE_OPTION;
(function (LEVEL_ONE_OPTION) {
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["symbol"] = 0] = "symbol";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["description"] = 1] = "description";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["bidPrice"] = 2] = "bidPrice";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["askPrice"] = 3] = "askPrice";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["lastPrice"] = 4] = "lastPrice";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["highPrice"] = 5] = "highPrice";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["lowPrice"] = 6] = "lowPrice";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["closePrice"] = 7] = "closePrice";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["totalVolume"] = 8] = "totalVolume";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["openInterest"] = 9] = "openInterest";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["volatility"] = 10] = "volatility";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["quoteTime"] = 11] = "quoteTime";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["tradeTime"] = 12] = "tradeTime";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["intrinsicValue"] = 13] = "intrinsicValue";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["openPrice"] = 19] = "openPrice";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["bidSize"] = 20] = "bidSize";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["askSize"] = 21] = "askSize";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["lastSize"] = 22] = "lastSize";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["netChange"] = 23] = "netChange";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["strikePrice"] = 24] = "strikePrice";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["contractType"] = 25] = "contractType";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["underlying"] = 26] = "underlying";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["expirationMonth"] = 27] = "expirationMonth";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["timeValue"] = 29] = "timeValue";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["expirationDay"] = 30] = "expirationDay";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["dte"] = 31] = "dte";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["delta"] = 32] = "delta";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["gamma"] = 33] = "gamma";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["theta"] = 34] = "theta";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["vega"] = 35] = "vega";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["rho"] = 36] = "rho";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["securityStatus"] = 37] = "securityStatus";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["theoreticalOptionValue"] = 38] = "theoreticalOptionValue";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["underlyingPrice"] = 39] = "underlyingPrice";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["expirationType"] = 40] = "expirationType";
    LEVEL_ONE_OPTION[LEVEL_ONE_OPTION["mark"] = 41] = "mark";
})(LEVEL_ONE_OPTION || (exports.LEVEL_ONE_OPTION = LEVEL_ONE_OPTION = {}));
;
var LISTED_BOOK;
(function (LISTED_BOOK) {
    LISTED_BOOK[LISTED_BOOK["symbol"] = 0] = "symbol";
    LISTED_BOOK[LISTED_BOOK["bookTime"] = 1] = "bookTime";
    LISTED_BOOK[LISTED_BOOK["bids"] = 2] = "bids";
    LISTED_BOOK[LISTED_BOOK["asks"] = 3] = "asks";
})(LISTED_BOOK || (exports.LISTED_BOOK = LISTED_BOOK = {}));
;
var NASDAQ_BOOK;
(function (NASDAQ_BOOK) {
    NASDAQ_BOOK[NASDAQ_BOOK["symbol"] = 0] = "symbol";
    NASDAQ_BOOK[NASDAQ_BOOK["bookTime"] = 1] = "bookTime";
    NASDAQ_BOOK[NASDAQ_BOOK["bids"] = 2] = "bids";
    NASDAQ_BOOK[NASDAQ_BOOK["asks"] = 3] = "asks";
})(NASDAQ_BOOK || (exports.NASDAQ_BOOK = NASDAQ_BOOK = {}));
;
var OPTIONS_BOOK;
(function (OPTIONS_BOOK) {
    OPTIONS_BOOK[OPTIONS_BOOK["symbol"] = 0] = "symbol";
    OPTIONS_BOOK[OPTIONS_BOOK["bookTime"] = 1] = "bookTime";
    OPTIONS_BOOK[OPTIONS_BOOK["bids"] = 2] = "bids";
    OPTIONS_BOOK[OPTIONS_BOOK["asks"] = 3] = "asks";
})(OPTIONS_BOOK || (exports.OPTIONS_BOOK = OPTIONS_BOOK = {}));
;
var BID_FIELDS;
(function (BID_FIELDS) {
    BID_FIELDS[BID_FIELDS["price"] = 0] = "price";
    BID_FIELDS[BID_FIELDS["totalVolume"] = 1] = "totalVolume";
    BID_FIELDS[BID_FIELDS["numBids"] = 2] = "numBids";
    BID_FIELDS[BID_FIELDS["bids"] = 3] = "bids";
})(BID_FIELDS || (exports.BID_FIELDS = BID_FIELDS = {}));
;
var ASK_FIELDS;
(function (ASK_FIELDS) {
    ASK_FIELDS[ASK_FIELDS["price"] = 0] = "price";
    ASK_FIELDS[ASK_FIELDS["totalVolume"] = 1] = "totalVolume";
    ASK_FIELDS[ASK_FIELDS["numAsks"] = 2] = "numAsks";
    ASK_FIELDS[ASK_FIELDS["asks"] = 3] = "asks";
})(ASK_FIELDS || (exports.ASK_FIELDS = ASK_FIELDS = {}));
;
var ORDER_BOOK_EXCHANGE_FIELDS;
(function (ORDER_BOOK_EXCHANGE_FIELDS) {
    ORDER_BOOK_EXCHANGE_FIELDS[ORDER_BOOK_EXCHANGE_FIELDS["exchange"] = 0] = "exchange";
    ORDER_BOOK_EXCHANGE_FIELDS[ORDER_BOOK_EXCHANGE_FIELDS["volume"] = 1] = "volume";
    ORDER_BOOK_EXCHANGE_FIELDS[ORDER_BOOK_EXCHANGE_FIELDS["sequence"] = 2] = "sequence";
})(ORDER_BOOK_EXCHANGE_FIELDS || (exports.ORDER_BOOK_EXCHANGE_FIELDS = ORDER_BOOK_EXCHANGE_FIELDS = {}));
;
exports.FIELDS = Object.freeze({
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
