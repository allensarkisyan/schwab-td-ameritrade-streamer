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