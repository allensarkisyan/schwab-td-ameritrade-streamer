# Authentication
## TDAmeritradeStreamer / WebSocket Client Initialization
```javascript
import { TDAmeritradeAPI } from '@allensarkisyan/schwab-td-ameritrade-api';

const tdApi = new TDAmeritradeAPI({
  clientId: process.env.TD_AMERITRADE_CLIENT_ID,
  callbackUrl: process.env.TD_AMERITRADE_CALLBACK_URL
});

/** Authenticate with TD Ameritrade and retrieve User Principals data to make a streaming connection */

/** Get User Principals data */
const { data: principals } = await tdApi.getUserPrincipals();

/** Configure Streamer Connection Options */
const streamerConnectionOptions = {
  streamerSubscriptionKeys: principals.streamerSubscriptionKeys.keys,
  quotes: principals.quotes,

  accountId: principals.accounts[0].accountId,
  company: principals.accounts[0].company,
  segment: principals.accounts[0].segment,
  accountCdDomainId: principals.accounts[0].accountCdDomainId,
  primaryAccountId: principals.accounts[0].primaryAccountId,
  tokenExpirationTime: principals.accounts[0].tokenExpirationTime,

  streamerSocketUrl: principals.streamerInfo.streamerSocketUrl,
  token: principals.streamerInfo.token,
  userGroup: principals.streamerInfo.userGroup,
  accessLevel: principals.streamerInfo.accessLevel,
  tokenTimestamp: principals.streamerInfo.tokenTimestamp,
  appId: principals.streamerInfo.appId,
  acl: principals.streamerInfo.acl,
};

/** Quick configuration */
const streamerConnectionOptions = {
  ...principals,
  ...principals.accounts[0],
  ...principals.streamerInfo,
  streamerSubscriptionKeys: principals.streamerSubscriptionKeys.keys,
};

/** Create a new instance of TDAmeritradeStreamer */
const tdStreamer = new TDAmeritradeStreamer(streamerConnectionOptions);
```

Copyright (c) 2019 - 2023 Allen Sarkisyan. XT-TX. All Rights Reserved.