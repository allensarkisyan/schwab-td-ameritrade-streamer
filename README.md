# JavaScript / TypeScript TD Ameritrade Streamer - WebSocket client

[![npm (scoped)](https://img.shields.io/npm/v/@allensarkisyan/schwab-td-ameritrade-streamer)](https://npmjs.com/@allensarkisyan/schwab-td-ameritrade-streamer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)
![Last Commit](https://img.shields.io/github/last-commit/allensarkisyan/schwab-td-ameritrade-streamer)
![CodeQL](https://github.com/allensarkisyan/schwab-td-ameritrade-streamer/workflows/CodeQL/badge.svg?branch=main)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/allensarkisyan/schwab-td-ameritrade-streamer/badge)](https://securityscorecards.dev/viewer/?uri=github.com/allensarkisyan/schwab-td-ameritrade-streamer)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/7856/badge)](https://www.bestpractices.dev/projects/7856)
![GitHub issues](https://img.shields.io/github/issues/allensarkisyan/schwab-td-ameritrade-streamer)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/allensarkisyan/schwab-td-ameritrade-streamer/tests.yml?label=tests)
[![codecov](https://codecov.io/gh/allensarkisyan/schwab-td-ameritrade-streamer/graph/badge.svg?token=Q1LGUU3M8Q)](https://codecov.io/gh/allensarkisyan/schwab-td-ameritrade-streamer)

## Overview

This is an unofficial JavaScript/TypeScript WebSocket client implementation for the Charles Schwab / TD Ameritrade Streaming APIs. It allows developers to interact with TD Ameritrade's services and access streaming financial data programmatically. Please note that this implementation is not affiliated with or endorsed by Charles Schwab and/or TD Ameritrade.

### TD Ameritrade API SDK Client [@allensarkisyan/schwab-td-ameritrade-api](https://github.com/allensarkisyan/schwab-td-ameritrade-api)

## Features

- MIT Licensed: This project is fully open source and available under the MIT License.
- Cross-Platform: It is designed to work in both Node.js and Browser environments.
- Strongly Typed: The codebase is strongly typed using JSDoc annotations for enhanced code quality and autocompletion support in TypeScript.
- Implementation of Official Streaming Data Endpoints: [Official TD Ameritrade Streaming Data Documentation](https://developer.tdameritrade.com/content/streaming-data)
- Derived from proprietary & internally developed quantitative trading and research software.

## Installation

To install and use this TD Ameritrade Streamer client, you can add it to your project using npm or yarn:

```bash
npm install @allensarkisyan/schwab-td-ameritrade-streamer
```

```bash
yarn add @allensarkisyan/schwab-td-ameritrade-streamer
```

# Getting Started
To get started with this library, follow the documentation provided [here](https://allensarkisyan.github.io/schwab-td-ameritrade-streamer/getting-started) for detailed instructions on how to set up and use the client to access TD Ameritrade's Streaming Endpoints.

# See [Examples](https://allensarkisyan.github.io/schwab-td-ameritrade-streamer/EXAMPLES)

## Import Module
```javascript
/** Using ECMAScript Modules */
import { TDAmeritradeStreamer } from '@allensarkisyan/schwab-td-ameritrade-streamer';

/** Using CommonJS */
const { TDAmeritradeStreamer } = require('@allensarkisyan/schwab-td-ameritrade-streamer');
```

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
}

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

#### createTDAmeritradeStreamer Factory
```javascript
import { createTDAmeritradeStreamer } from '@allensarkisyan/schwab-td-ameritrade-streamer';

const tdStreamer = createTDAmeritradeStreamer(streamerConnectionOptions);
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

MIT License

Copyright (c) 2023 Allen Sarkisyan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing
Contributions are welcome! If you have suggestions, bug reports, or would like to contribute to this project,
please open an issue or submit a pull request.

## Author

[Allen Sarkisyan](https://github.com/allensarkisyan)

Copyright (c) 2019 - 2023 Allen Sarkisyan. XT-TX. All Rights Reserved.