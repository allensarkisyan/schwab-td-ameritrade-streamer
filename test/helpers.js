/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */

const mockRequestId = (data) => ({
  requests: data?.requests?.map(i => { i.requestid = 123; return i; })
})

const streamerConnectionOptions = {
  accountId: 'TEST',
  token: 'TEST',
  company: 'TEST',
  segment: 'TEST',
  accountCdDomainId: 'TEST',
  userGroup: 'TEST',
  accessLevel: 'TEST',
  authorized: 'Y',
  tokenTimestamp: new Date().getTime(),
  appId: 'TEST',
  acl: 'TEST',

  streamerSubscriptionKeys: [
    { key: 'TEST' }
  ]

  // streamerSocketUrl: false
  // primaryAccountId: 'TEST',
  // tokenExpirationTime: 'TEST',
  // quotes: {}
};

const handleArrayBuffer = (message) => {
  if (message instanceof ArrayBuffer) {
    const decoder = new TextDecoder();
    return decoder.decode(message);
  }

  return message;
};

const ORDER_FILL_XML = `
<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>
<OrderFillMessage xmlns=\"urn: xmlns:api.tdameritrade.com\">
  <OrderGroupID>
    <Firm/>
    <Branch>785</Branch>
    <ClientKey>ACCT</ClientKey>
    <AccountKey>ACCT</AccountKey>
    <SubAccountType>Margin</SubAccountType>
    <CDDomainID>CDI</CDDomainID>
  </OrderGroupID>
  <ActivityTimestamp>2021-01-22T05:00:00.000-06:00</ActivityTimestamp>
  <Order xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:type=\"EquityOrderT\">
    <OrderKey>12345678</OrderKey>
    <Security>
      <CUSIP>12345678</CUSIP>
      <Symbol>TEST</Symbol>
      <SecurityType>Common Stock</SecurityType>
      <SecurityCategory>Equity</SecurityCategory>
    </Security>
    <OrderPricing xsi:type=\"LimitT\">
      <Limit>14.20</Limit>
    </OrderPricing>
    <EnteringDevice>Web</EnteringDevice>
    <OrderType>Limit</OrderType>
    <OrderDuration>Day</OrderDuration>
    <OrderEnteredDateTime>2021-01-22T09:00:00.000-06:00</OrderEnteredDateTime>
    <OrderInstructions>Buy</OrderInstructions>
    <OriginalQuantity>10</OriginalQuantity>
    <Discretionary>false</Discretionary>
    <OrderSource>Web</OrderSource>
    <Solicited>false</Solicited>
    <MarketCode>Normal</MarketCode>
    <Capacity>Agency</Capacity>
  </Order>
  <OrderDestination>BEST</OrderDestination>
  <ExecutionInformation>
    <Type>DIRECT</Type>
    <ExecutionPrice>14.20</ExecutionPrice>
    <BrokerId>123</BrokerId>
    <RemainingQuantity>0</RemainingQuantity>
  </ExecutionInformation>
  <ContraInformation>
    <Contra>
      <Broker>TDA</Broker>
    </Contra>
  </ContraInformation>
</OrderFillMessage>
`;

const INVALID_ORDER_FILL_XML = `
<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>
<OrderFillMessage xmlns=\"urn: xmlns:api.tdameritrade.com\">
  <OrderGroupID>
  </OrderGroupID>
  <ActivityTimestamp>2021-01-22T05:00:00.000-06:00</ActivityTimestamp>
  <Order xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:type=\"EquityOrderT\">
  </Order>
  <OrderDestination>BEST</OrderDestination>
  <ExecutionInformation>
  </ExecutionInformation>
  <ContraInformation>
  </ContraInformation>
  <OrderDestination>
    <Invalid></invalid_should_error>
  </OrderDestination>
  <CancelledQuantity>
    <Invalid></invalid_should_error>
  </CancelledQuantity>
</OrderFillMessage>
`;

const CANCEL_ORDER_XML = `
<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>
<UROUTMessage xmlns=\"urn: xmlns:api.tdameritrade.com\">
  <OrderGroupID>
    <Firm/>
    <Branch>785</Branch>
    <ClientKey>ACCT</ClientKey>
    <AccountKey>ACCT</AccountKey>
    <SubAccountType>Margin</SubAccountType>
    <CDDomainID>CDI</CDDomainID>
  </OrderGroupID>
  <ActivityTimestamp>2021-01-22T05:00:00.000-06:00</ActivityTimestamp>
  <Order xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:type=\"EquityOrderT\">
    <OrderKey>12345678</OrderKey>
    <Security>
      <CUSIP>12345678</CUSIP>
      <Symbol>TEST</Symbol>
      <SecurityType>Common Stock</SecurityType>
      <SecurityCategory>Equity</SecurityCategory>
    </Security>
    <OrderPricing xsi:type=\"LimitT\">
      <Limit>14.20</Limit>
    </OrderPricing>
    <EnteringDevice>Web</EnteringDevice>
    <OrderType>Limit</OrderType>
    <OrderDuration>Day</OrderDuration>
    <OrderEnteredDateTime>2021-01-22T09:00:00.000-06:00</OrderEnteredDateTime>
    <OrderInstructions>Buy</OrderInstructions>
    <OriginalQuantity>10</OriginalQuantity>
    <Discretionary>false</Discretionary>
    <OrderSource>Web</OrderSource>
    <Solicited>false</Solicited>
    <MarketCode>Normal</MarketCode>
    <Capacity>Agency</Capacity>
  </Order>
  <OrderDestination>BEST</OrderDestination>
  <CancelledQuantity>10</CancelledQuantity>
</UROUTMessage>
`;

const BASE_ORDER_NOTIFICATION_RESPONSE = {
  timestamp: 1604688024586,
  activityTimestamp: '2021-01-22T05:00:00.000-06:00',
  orderType: 'Limit',
  orderKey: '12345678',
  cusip: '12345678',
  symbol: 'TEST',
  securityType: 'Common Stock',
  orderPricing: 'Limit',
  orderDuration: 'Day',
  orderEnteredDateTime: '2021-01-22T09:00:00.000-06:00',
  orderInstructions: 'Buy',
  originalQuantity: '10',
  orderSource: 'Web',
  enteringDevice: 'Web',
};

const ORDER_FILL_NOTIFICATION = {
  service: 'ACCT_ACTIVITY',
  timestamp: 1604688024586,
  command: 'SUBS',
  content: [
    {
      1: 'TEST',
      2: 'OrderFill',
      3: ORDER_FILL_XML,
      key: 'TEST',
    },
  ],
};

const CANCEL_ORDER_NOTIFICATION = {
  service: 'ACCT_ACTIVITY',
  timestamp: 1604688024586,
  command: 'SUBS',
  content: [
    {
      1: 'TEST',
      2: 'UROUT',
      3: CANCEL_ORDER_XML,
      key: 'TEST',
    },
  ],
};

const ACTIVES_NASDAQ_NOTIFICATION = {
  service: 'ACTIVES_NASDAQ',
  timestamp: 1604688140960,
  command: 'SUBS',
  content: [
    {
      1: '49336;60;13:41:00;13:42:16;2;0:10:71911:TEST:1960:2.73:TEST:1541:2.14:TEST:1379:1.92:TEST:1112:1.55:TEST:965:1.34:TEST:878:1.22:TEST:843:1.17:TEST:826:1.15:TEST:825:1.15:TEST:727:1.01;1:10:12443515:TEST:2116402:17.01:TEST:705008:5.67:TEST:341318:2.74:TEST:288848:2.32:TEST:247410:1.99:TEST:183084:1.47:TEST:181920:1.46:TEST:175027:1.41:TEST:156917:1.26:TEST:156389:1.26',
      key: 'NASDAQ-60',
    },
  ],
};

const ACTIVES_NYSE_NOTIFICATION = {
  service: 'ACTIVES_NYSE',
  timestamp: 1604688140960,
  command: 'SUBS',
  content: [
    {
      1: '49335;0;13:42:00;13:42:15;2;0:10:21632185:TEST:1578659:7.3:TEST:1027079:4.75:TEST:449372:2.08:TEST:266709:1.23:TEST:261122:1.21:TEST:223822:1.03:TEST:207701:0.96:TEST:195311:0.9:TEST:158735:0.73:TEST:149690:0.69;1:10:3984316347:TEST:375899981:9.43:TEST:236150045:5.93:TEST:86246634:2.16:TEST:73107260:1.83:TEST:71675523:1.8:TEST:58935758:1.48:TEST:42079334:1.06:TEST:35784390:0.9:TEST:33962115:0.85:TEST:33721081:0.85',
      key: 'NYSE-ALL',
    },
  ],
};

const ACTIVES_OPTIONS_NOTIFICATION = {
  service: 'ACTIVES_OPTIONS',
  timestamp: 1604688140960,
  command: 'SUBS',
  content: [
    {
      1: '49335;0;13:42:00;13:42:15;2;0:10:3325377:TEST_110620C42:TEST Nov 6 2020 42 Call:12406:0.37:SPY_110620C350:SPY Nov 6 2020 350 Call:10596:0.32:TEST_110620C43:TEST Nov 6 2020 43 Call:10089:0.3:SPY_110620P350:SPY Nov 6 2020 350 Put:8992:0.27:SPY_110620P348:SPY Nov 6 2020 348 Put:8646:0.26:SPY_110620P349:SPY Nov 6 2020 349 Put:8637:0.26:TEST_111320C42:TEST Nov 13 2020 42 Call:7690:0.23:TEST_111320C45:TEST Nov 13 2020 45 Call:7597:0.23:TEST_111320C10:TEST Nov 13 2020 10 Call:7415:0.22:TEST_110620C200:TEST Nov 6 2020 200 Call:7197:0.22;1:10:22327494:TEST_011521C120:TEST Jan 15 2021 120 Call:95651:0.43:SPY_110620P350:SPY Nov 6 2020 350 Put:86744:0.39:SPY_110620P349:SPY Nov 6 2020 349 Put:85200:0.38:TEST_011521P120:TEST Jan 15 2021 120 Put:84856:0.38:SPY_110620C350:SPY Nov 6 2020 350 Call:75561:0.34:TEST_110620C118:TEST Nov 6 2020 118 Call:72728:0.33:TEST_110620C119:TEST Nov 6 2020 119 Call:72528:0.32:SPY_110620P348:SPY Nov 6 2020 348 Put:71764:0.32:VIX_121620P20:VIX Dec 16 2020 20 Put:67372:0.3:TEST_121820C1:TEST Dec 18 2020 1 Call:66643:0.3',
      key: 'OPTS-DESC-ALL',
    },
  ],
};

const QUOTE_NOTIFICATION = {
  service: 'QUOTE',
  timestamp: 1604688196659,
  command: 'SUBS',
  content: [
    {
      1: 18.78,
      4: 1,
      5: 2,
      6: 'N',
      7: 'T',
      11: 49396,
      key: 'TEST',
    },
  ],
};

const TIMESALE_EQUITY_NOTIFICATION = {
  service: 'TIMESALE_EQUITY',
  timestamp: 1604688112762,
  command: 'SUBS',
  content: [
    {
      1: 1604688112365,
      2: 18.75,
      3: 100,
      4: 38239,
      seq: 453,
      key: 'TEST',
    },
  ],
};

const NEWS_HEADLINE_NOTIFICATION = {
  service: 'NEWS_HEADLINE',
  timestamp: 1604688112762,
  command: 'SUBS',
  content: [
    {
      1: 0,
      2: 1604687204000,
      3: '420691337',
      4: 'U',
      5: "'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.",
      6: '420691337',
      7: 5,
      8: 'News,BTC,*ALL*',
      9: false,
      10: 'BTC',
      seq: 16,
      key: 'BTC',
    },
  ],
};

const CHART_HISTORY_FUTURES_NOTIFICATION = {
  snapshot: [
    {
      service: 'CHART_HISTORY_FUTURES',
      timestamp: 1604688027606,
      command: 'GET',
      content: [
        {
          0: '420691337',
          1: 0,
          2: 1181,
          3: [
            {
              0: 1604617200000,
              1: 3508.75,
              2: 3509.5,
              3: 3503.25,
              4: 3505,
              5: 1012,
            },
            {
              0: 1604617260000,
              1: 3504.75,
              2: 3507.25,
              3: 3503.5,
              4: 3506.25,
              5: 393,
            },
          ],
          key: '/ES',
        },
      ],
    },
  ],
};

const CHART_FUTURES_NOTIFICATION = {
  service: 'CHART_FUTURES',
  timestamp: 1604688124326,
  command: 'SUBS',
  content: [
    {
      1: 1604688060000,
      2: 3506.25,
      3: 3506.75,
      4: 3506,
      5: 3506.5,
      6: 451,
      seq: 1250,
      key: '/ES',
    },
  ],
};

const LEVELONE_FUTURES_NOTIFICATION = {
  service: 'LEVELONE_FUTURES',
  timestamp: 1604688143582,
  command: 'SUBS',
  content: [
    {
      1: 3506.75,
      2: 3507,
      4: 9,
      5: 49,
      8: 1161346,
      10: 1604688143103,
      11: 1604688143092,
      key: '/ES',
    },
  ],
};

const TIMESALE_FUTURES_NOTIFICATION = {
  service: 'TIMESALE_FUTURES',
  timestamp: 1604688143582,
  command: 'SUBS',
  content: [
    {
      1: 1604688143092,
      2: 3506.75,
      3: 1,
      4: 50035211,
      seq: 476739,
      key: '/ES',
    },
    {
      1: 1604688143092,
      2: 3506.75,
      3: 1,
      4: 50035212,
      seq: 476740,
      key: '/ES',
    },
  ],
};

const LEVELONE_FUTURES_OPTIONS_NOTIFICATION = {
  service: 'LEVELONE_FUTURES_OPTIONS',
  timestamp: 1604688143582,
  command: 'SUBS',
  content: [
    {
      1: 1.5,
      4: 54,
      5: 178,
      10: 1604688143096,
      key: './EW1X20C3525',
    },
    {
      4: 128,
      5: 79,
      10: 1604688143105,
      key: './EW1X20C3510',
    },
  ],
};

const FUTURES_MESSAGE_STREAM = [
  {
    data: [
      CHART_HISTORY_FUTURES_NOTIFICATION,
      CHART_FUTURES_NOTIFICATION,
      LEVELONE_FUTURES_NOTIFICATION,
      TIMESALE_FUTURES_NOTIFICATION,
      LEVELONE_FUTURES_OPTIONS_NOTIFICATION,
    ],
  },
];

const MESSAGE_STREAM = [
  {
    data: [
      ACTIVES_OPTIONS_NOTIFICATION,
      ACTIVES_NASDAQ_NOTIFICATION,
      ACTIVES_NYSE_NOTIFICATION,
      QUOTE_NOTIFICATION,
      TIMESALE_EQUITY_NOTIFICATION,
      NEWS_HEADLINE_NOTIFICATION,
      ORDER_FILL_NOTIFICATION,
      CANCEL_ORDER_NOTIFICATION,
      ...FUTURES_MESSAGE_STREAM[0].data,
    ],
  },
];

module.exports = {
  streamerConnectionOptions,
  mockRequestId,
  handleArrayBuffer,

  ORDER_FILL_XML,
  INVALID_ORDER_FILL_XML,
  CANCEL_ORDER_XML,
  BASE_ORDER_NOTIFICATION_RESPONSE,
  ORDER_FILL_NOTIFICATION,
  CANCEL_ORDER_NOTIFICATION,
  ACTIVES_NASDAQ_NOTIFICATION,
  ACTIVES_NYSE_NOTIFICATION,
  ACTIVES_OPTIONS_NOTIFICATION,
  QUOTE_NOTIFICATION,
  TIMESALE_EQUITY_NOTIFICATION,
  NEWS_HEADLINE_NOTIFICATION,
  CHART_FUTURES_NOTIFICATION,
  CHART_HISTORY_FUTURES_NOTIFICATION,
  LEVELONE_FUTURES_NOTIFICATION,
  TIMESALE_FUTURES_NOTIFICATION,
  LEVELONE_FUTURES_OPTIONS_NOTIFICATION,
  FUTURES_MESSAGE_STREAM,
  MESSAGE_STREAM,
}