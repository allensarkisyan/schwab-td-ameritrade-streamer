/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */
export type TDAmeritradeActivityMessage = {
    timestamp: Date;
    type: string;
    data: string;
};
export declare const parseOrderEntryMessage: (msg: TDAmeritradeActivityMessage) => any;
export declare const parseOrderFillMessage: (msg: TDAmeritradeActivityMessage) => any;
export declare const parseCancelMessage: (msg: TDAmeritradeActivityMessage) => any;
