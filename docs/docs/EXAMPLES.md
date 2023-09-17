# Examples

***Below are some examples of usage***

## Subscribe to Account Activity
```javascript
tdStreamer.subscribeAccountActivity();

tdStreamer.on('ACCT_ACTIVITY', (data) => console.log('ACCT_ACTIVITY', data));
```

## Set Quality of Service
```javascript
/**
 * Set Quality of Service Level
 * 
 * 0 = Express(500 ms)
 * 1 = Real - Time(750 ms) default value for http binary protocol
 * 2 = Fast(1, 000 ms) default value for websocket and http asynchronous protocol
 * 3 = Moderate(1, 500 ms)
 * 4 = Slow(3, 000 ms)
 * 5 = Delayed(5, 000 ms)
 * 
 * @param {number} qoslevel - Quality of Service level 
 */
tdStreamer.setQualityOfService(0);
```

#### Ticker Symbols may be provided as a comma separated list or array of symbols for most methods

## Subscribe to Quotes
```javascript
// Single ticker symbol
tdStreamer.subscribeQuotes('SPY');
// Comma separated list
tdStreamer.subscribeQuotes('QQQ, TSLA, AAPL');
// List of Symbols
tdStreamer.subscribeQuotes(['AAPL', 'MSFT', 'GOOGL']);

tdStreamer.on('QUOTE', (data) => console.log('QUOTE', data));
```

## Subscribe to Equity Time and Sales
```javascript
tdStreamer.subscribeTimeAndSales('TSLA');

tdStreamer.on('TIMESALE_EQUITY_UPDATE', (data) => console.log(data));
```

## Subscribe to Options
```javascript
tdStreamer.subscribeOptions('TSLA');

tdStreamer.on('OPTION', (data) => console.log('OPTION', data));
```

## Subscribe to Futures
```javascript
/**
 * Shortcut to subscribe to:
 * 
 * CHART_HISTORY_FUTURES
 * CHART_FUTURES
 * TIMESALE_FUTURES
 * LEVELONE_FUTURES
 */
tdStreamer.subscribeFutures('/ES');

tdStreamer.on('TIMESALE_FUTURES_UPDATE', (data) => console.log(data));
```

## Subscribe to Futures Time & Sales
```javascript
tdStreamer.subscribeTimeSalesFutures('/ES');

tdStreamer.on('TIMESALE_FUTURES_UPDATE', (data) => console.log(data));
```

## Subscribe to Futures Options
```javascript
tdStreamer.subscribeFuturesOptions('./FUTURES_OPTIONS_SYMBOL');

tdStreamer.on('LEVELONE_FUTURES_OPTIONS', (data) => console.log(data));
```

## Subscribe to Actives
```javascript
tdStreamer.subscribeActives();

tdStreamer.on('ACTIVES_NASDAQ', (data) => console.log(data));

tdStreamer.on('ACTIVES_NYSE', (data) => console.log(data));

tdStreamer.on('ACTIVES_OPTIONS', (data) => console.log(data));
```

## Subscribe to Charts
```javascript
tdStreamer.subscribeCharts('TSLA');

tdStreamer.on('CHART_EQUITY', (data) => console.log(data));
```

## Get Chart History / Subscribe to Quotes
```javascript
/** Shortcut to subscribe to CHART_EQUITY and QUOTE */
tdStreamer.getChartHistoryAndSubscribeQuotes('TSLA');

tdStreamer.on('CHART_EQUITY', (data) => console.log('CHART_EQUITY', data));
tdStreamer.on('QUOTE', (data) => console.log('QUOTE', data));
```

## Subscribe to Listed Book
```javascript
tdStreamer.subscribeListedBook('TSLA');

tdStreamer.on('LISTED_BOOK', (data) => console.log('LISTED_BOOK', data));
```

## Subscribe to Nasdaq Book
```javascript
tdStreamer.subscribeNasdaqBook('TSLA');

tdStreamer.on('NASDAQ_BOOK', (data) => console.log('NASDQ_BOOK', data));
```

## Subscribe to News Headlines
```javascript
tdStreamer.subscribeNewsHeadlines(['TSLA', 'AAPL']);

tdStreamer.on('NEWS_HEADLINE', (data) => console.log('NEWS_HEADLINE', data));
```

Copyright (c) 2019 - 2023 Allen Sarkisyan. XT-TX. All Rights Reserved.