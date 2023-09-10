/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */
import { EventEmitter } from 'eventemitter3';
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
export declare class TDAmeritradeStreamEventProcessor {
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
    constructor(emitter: EventEmitter, handleLevelOneFeedUpdate?: Function, handleLevelOneTimeSaleUpdate?: Function);
    /**
     *
     * @param {Object} TDAmeritradeStreamResponse
     * @param {TDAmeritradeStreamServiceResponse} TDAmeritradeStreamResponse.response - Response
     * @param {TDAmeritradeStreamDataResponse[]} TDAmeritradeStreamResponse.data - Response Data
     * @param {TDAmeritradeStreamDataResponse} TDAmeritradeStreamResponse.snapshot - Response Data Snapshot
     */
    handleMessage({ response, data, snapshot }: {
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
