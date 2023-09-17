## Classes

<dl>
<dt><a href="#TDAmeritradeStreamEventProcessor">TDAmeritradeStreamEventProcessor</a></dt>
<dd></dd>
<dt><a href="#TDAmeritradeStreamer">TDAmeritradeStreamer</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#STATE">STATE</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createTDAmeritradeStreamer">createTDAmeritradeStreamer(streamerConnectionOptions, handleLevelOneFeedUpdate, handleLevelOneTimeSaleUpdate)</a> ⇒ <code><a href="#TDAmeritradeStreamer">TDAmeritradeStreamer</a></code></dt>
<dd><p>Creates a new instance of TD Ameritrade Streamer</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#TickerSymbolKeys">TickerSymbolKeys</a> : <code>string</code> | <code>Array.&lt;string&gt;</code></dt>
<dd><p>Single Symbol, Comma Seperated Symbols or Array of Symbols (&quot;SPY&quot; | &quot;SPY, QQQ&quot; | [&quot;SPY&quot;, &quot;QQQ&quot;])</p>
</dd>
<dt><a href="#FuturesSymbol">FuturesSymbol</a> : <code>string</code> | <code>Array.&lt;string&gt;</code></dt>
<dd></dd>
<dt><a href="#TDAmeritradeStreamerConnectionOptions">TDAmeritradeStreamerConnectionOptions</a> : <code>Object</code></dt>
<dd><p>TD Ameritrade Stream Connection Options</p>
</dd>
<dt><a href="#TDAmeritradeStreamerCommand">TDAmeritradeStreamerCommand</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#TDAmeritradeStreamServiceResponse">TDAmeritradeStreamServiceResponse</a> : <code>Object</code></dt>
<dd><p>TD Ameritrade Stream Response</p>
</dd>
<dt><a href="#TDAmeritradeStreamDataResponse">TDAmeritradeStreamDataResponse</a> : <code>Object</code></dt>
<dd><p>TD Ameritrade Data Response</p>
</dd>
<dt><a href="#TDAmeritradeStreamNotifyResponse">TDAmeritradeStreamNotifyResponse</a> : <code>Object</code></dt>
<dd><p>TD Ameritrade Stream Notify Response</p>
</dd>
</dl>

<a name="TDAmeritradeStreamEventProcessor"></a>

## TDAmeritradeStreamEventProcessor
**Kind**: global class  

* [TDAmeritradeStreamEventProcessor](#TDAmeritradeStreamEventProcessor)
    * [new TDAmeritradeStreamEventProcessor()](#new_TDAmeritradeStreamEventProcessor_new)
    * [.TDAmeritradeStreamEventProcessor](#TDAmeritradeStreamEventProcessor+TDAmeritradeStreamEventProcessor)
        * [new exports.TDAmeritradeStreamEventProcessor(emitter, [handleLevelOneFeedUpdate], [handleLevelOneTimeSaleUpdate])](#new_TDAmeritradeStreamEventProcessor+TDAmeritradeStreamEventProcessor_new)
    * [.emitter](#TDAmeritradeStreamEventProcessor+emitter) : <code>EventEmitter</code>
    * [.handleMessage(TDAmeritradeStreamResponse)](#TDAmeritradeStreamEventProcessor+handleMessage)
    * [.emitEvent(evt, [data])](#TDAmeritradeStreamEventProcessor+emitEvent)
    * [.handleAccountActivity(msg)](#TDAmeritradeStreamEventProcessor+handleAccountActivity)
    * [.handleQuotes(msg)](#TDAmeritradeStreamEventProcessor+handleQuotes)
    * [.handleTimeSales(msg)](#TDAmeritradeStreamEventProcessor+handleTimeSales)
    * [.handleOptions(msg)](#TDAmeritradeStreamEventProcessor+handleOptions)
    * [.handleLevelOneFutures(msg)](#TDAmeritradeStreamEventProcessor+handleLevelOneFutures)
    * [.handleNews(msg)](#TDAmeritradeStreamEventProcessor+handleNews)
    * [.handleActivesNasdaq(msg)](#TDAmeritradeStreamEventProcessor+handleActivesNasdaq)
    * [.handleActivesNYSE(msg)](#TDAmeritradeStreamEventProcessor+handleActivesNYSE)
    * [.handleListedBook(msg)](#TDAmeritradeStreamEventProcessor+handleListedBook)
    * [.handleNasdaqBook(msg)](#TDAmeritradeStreamEventProcessor+handleNasdaqBook)
    * [.handleActiveOptions(msg)](#TDAmeritradeStreamEventProcessor+handleActiveOptions)

<a name="new_TDAmeritradeStreamEventProcessor_new"></a>

### new TDAmeritradeStreamEventProcessor()
Represents the TDAmeritradeStreamEventProcessor class for processing stream messages / events.

<a name="TDAmeritradeStreamEventProcessor+TDAmeritradeStreamEventProcessor"></a>

### tdAmeritradeStreamEventProcessor.TDAmeritradeStreamEventProcessor
**Kind**: instance class of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
<a name="new_TDAmeritradeStreamEventProcessor+TDAmeritradeStreamEventProcessor_new"></a>

#### new exports.TDAmeritradeStreamEventProcessor(emitter, [handleLevelOneFeedUpdate], [handleLevelOneTimeSaleUpdate])
TDAmeritradeStreamEventProcessor - Handle's stream response


| Param | Type | Description |
| --- | --- | --- |
| emitter | <code>EventEmitter</code> | an instance of EventEmitter |
| [handleLevelOneFeedUpdate] | <code>function</code> | Custom L1 feed data callback |
| [handleLevelOneTimeSaleUpdate] | <code>function</code> | Custom L1 time & sales feed data callback |

<a name="TDAmeritradeStreamEventProcessor+emitter"></a>

### tdAmeritradeStreamEventProcessor.emitter : <code>EventEmitter</code>
**Kind**: instance property of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
<a name="TDAmeritradeStreamEventProcessor+handleMessage"></a>

### tdAmeritradeStreamEventProcessor.handleMessage(TDAmeritradeStreamResponse)
**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>AUTHORIZED</code>](#TDAmeritradeStreamer+event_AUTHORIZED), [<code>CHART\_SNAPSHOT</code>](#TDAmeritradeStreamer+event_CHART_SNAPSHOT), [<code>CHART\_UPDATE</code>](#TDAmeritradeStreamer+event_CHART_UPDATE)  

| Param | Type | Description |
| --- | --- | --- |
| TDAmeritradeStreamResponse | <code>TDAmeritradeStreamEventProcessorEventMessage</code> |  |
| TDAmeritradeStreamResponse.response | [<code>TDAmeritradeStreamServiceResponse</code>](#TDAmeritradeStreamServiceResponse) | Response |
| TDAmeritradeStreamResponse.data | [<code>Array.&lt;TDAmeritradeStreamDataResponse&gt;</code>](#TDAmeritradeStreamDataResponse) | Response Data |
| TDAmeritradeStreamResponse.snapshot | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | Response Data Snapshot |

<a name="TDAmeritradeStreamEventProcessor+emitEvent"></a>

### tdAmeritradeStreamEventProcessor.emitEvent(evt, [data])
Emits Events

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>string</code> | Event Name |
| [data] | <code>Object</code> \| <code>Array</code> \| <code>string</code> \| <code>number</code> \| <code>boolean</code> | Event Data |

<a name="TDAmeritradeStreamEventProcessor+handleAccountActivity"></a>

### tdAmeritradeStreamEventProcessor.handleAccountActivity(msg)
Handles Account Activity

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>ACCT\_ACTIVITY</code>](#TDAmeritradeStreamer+event_ACCT_ACTIVITY)  

| Param | Type | Description |
| --- | --- | --- |
| msg | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | Stream Data Response |

<a name="TDAmeritradeStreamEventProcessor+handleQuotes"></a>

### tdAmeritradeStreamEventProcessor.handleQuotes(msg)
Handles Quotes

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>QUOTE</code>](#TDAmeritradeStreamer+event_QUOTE)  

| Param | Type | Description |
| --- | --- | --- |
| msg | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | Stream Data Response |

<a name="TDAmeritradeStreamEventProcessor+handleTimeSales"></a>

### tdAmeritradeStreamEventProcessor.handleTimeSales(msg)
Handles Time & Sales

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>TIMESALE\_EQUITY\_UPDATE</code>](#TDAmeritradeStreamer+event_TIMESALE_EQUITY_UPDATE)  

| Param | Type | Description |
| --- | --- | --- |
| msg | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | Stream Data Response |

<a name="TDAmeritradeStreamEventProcessor+handleOptions"></a>

### tdAmeritradeStreamEventProcessor.handleOptions(msg)
Handles Options

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>OPTION</code>](#TDAmeritradeStreamer+event_OPTION)  

| Param | Type | Description |
| --- | --- | --- |
| msg | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | Stream Data Response |

<a name="TDAmeritradeStreamEventProcessor+handleLevelOneFutures"></a>

### tdAmeritradeStreamEventProcessor.handleLevelOneFutures(msg)
Handles Futures Level One / Time & Sales

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>TIMESALE\_FUTURES\_UPDATE</code>](#TDAmeritradeStreamer+event_TIMESALE_FUTURES_UPDATE), [<code>LEVELONE\_FUTURES\_UPDATE</code>](#TDAmeritradeStreamer+event_LEVELONE_FUTURES_UPDATE)  

| Param | Type | Description |
| --- | --- | --- |
| msg | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | Stream Data Response |

<a name="TDAmeritradeStreamEventProcessor+handleNews"></a>

### tdAmeritradeStreamEventProcessor.handleNews(msg)
Handle News Headlines

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>NEWS\_HEADLINE</code>](#TDAmeritradeStreamer+event_NEWS_HEADLINE)  

| Param | Type |
| --- | --- |
| msg | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | 

<a name="TDAmeritradeStreamEventProcessor+handleActivesNasdaq"></a>

### tdAmeritradeStreamEventProcessor.handleActivesNasdaq(msg)
Handle Nasdaq Active Equities

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>ACTIVES\_NASDAQ</code>](#TDAmeritradeStreamer+event_ACTIVES_NASDAQ)  

| Param | Type |
| --- | --- |
| msg | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | 

<a name="TDAmeritradeStreamEventProcessor+handleActivesNYSE"></a>

### tdAmeritradeStreamEventProcessor.handleActivesNYSE(msg)
Handle NYSE Active Equities

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>ACTIVES\_NYSE</code>](#TDAmeritradeStreamer+event_ACTIVES_NYSE)  

| Param | Type |
| --- | --- |
| msg | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | 

<a name="TDAmeritradeStreamEventProcessor+handleListedBook"></a>

### tdAmeritradeStreamEventProcessor.handleListedBook(msg)
Handle Nasdaq Order Book

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>LISTED\_BOOK</code>](#TDAmeritradeStreamer+event_LISTED_BOOK)  

| Param | Type |
| --- | --- |
| msg | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | 

<a name="TDAmeritradeStreamEventProcessor+handleNasdaqBook"></a>

### tdAmeritradeStreamEventProcessor.handleNasdaqBook(msg)
Handle Nasdaq Order Book

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>NASDAQ\_BOOK</code>](#TDAmeritradeStreamer+event_NASDAQ_BOOK)  

| Param | Type |
| --- | --- |
| msg | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | 

<a name="TDAmeritradeStreamEventProcessor+handleActiveOptions"></a>

### tdAmeritradeStreamEventProcessor.handleActiveOptions(msg)
Handle Active Options

**Kind**: instance method of [<code>TDAmeritradeStreamEventProcessor</code>](#TDAmeritradeStreamEventProcessor)  
**Emits**: [<code>ACTIVES\_OPTIONS</code>](#TDAmeritradeStreamer+event_ACTIVES_OPTIONS)  

| Param | Type |
| --- | --- |
| msg | [<code>TDAmeritradeStreamDataResponse</code>](#TDAmeritradeStreamDataResponse) | 

<a name="TDAmeritradeStreamer"></a>

## TDAmeritradeStreamer
**Kind**: global class  

* [TDAmeritradeStreamer](#TDAmeritradeStreamer)
    * [new TDAmeritradeStreamer()](#new_TDAmeritradeStreamer_new)
    * [.TDAmeritradeStreamer](#TDAmeritradeStreamer+TDAmeritradeStreamer)
        * [new exports.TDAmeritradeStreamer(streamerConnectionOptions, [handleLevelOneFeedUpdate], [handleLevelOneTimeSaleUpdate])](#new_TDAmeritradeStreamer+TDAmeritradeStreamer_new)
    * [.on(evt, method, context)](#TDAmeritradeStreamer+on)
    * [.add(evt, method, context)](#TDAmeritradeStreamer+add)
    * [.subscribeAccountActivity()](#TDAmeritradeStreamer+subscribeAccountActivity)
    * [.getChartHistoryAndSubscribeQuotes(symbol)](#TDAmeritradeStreamer+getChartHistoryAndSubscribeQuotes)
    * [.subscribeQuotes(symbol)](#TDAmeritradeStreamer+subscribeQuotes)
    * [.subscribeCharts(symbol)](#TDAmeritradeStreamer+subscribeCharts)
    * [.subscribeOptions(symbol)](#TDAmeritradeStreamer+subscribeOptions)
    * [.subscribeTimeAndSales(symbol)](#TDAmeritradeStreamer+subscribeTimeAndSales)
    * [.subscribeFutures(symbol)](#TDAmeritradeStreamer+subscribeFutures)
    * [.subscribeTimeSalesFutures(symbol)](#TDAmeritradeStreamer+subscribeTimeSalesFutures)
    * [.subscribeFuturesOptions(symbol)](#TDAmeritradeStreamer+subscribeFuturesOptions)
    * [.subscribeActives()](#TDAmeritradeStreamer+subscribeActives)
    * [.subscribeNewsHeadlines(symbol)](#TDAmeritradeStreamer+subscribeNewsHeadlines)
    * [.setQualityOfService(qoslevel)](#TDAmeritradeStreamer+setQualityOfService)
    * [.subscribeListedBook(symbol)](#TDAmeritradeStreamer+subscribeListedBook)
    * [.subscribeNasdaqBook(symbol)](#TDAmeritradeStreamer+subscribeNasdaqBook)
    * [.subscribeOptionsBook(symbol)](#TDAmeritradeStreamer+subscribeOptionsBook)
    * ["AUTHORIZED" (data)](#TDAmeritradeStreamer+event_AUTHORIZED)
    * ["ACCT_ACTIVITY" (data)](#TDAmeritradeStreamer+event_ACCT_ACTIVITY)
    * ["QUOTE" (data)](#TDAmeritradeStreamer+event_QUOTE)
    * ["TIMESALE_EQUITY_UPDATE" (data)](#TDAmeritradeStreamer+event_TIMESALE_EQUITY_UPDATE)
    * ["OPTION" (data)](#TDAmeritradeStreamer+event_OPTION)
    * ["TIMESALE_FUTURES_UPDATE" (data)](#TDAmeritradeStreamer+event_TIMESALE_FUTURES_UPDATE)
    * ["LEVELONE_FUTURES_UPDATE" (data)](#TDAmeritradeStreamer+event_LEVELONE_FUTURES_UPDATE)
    * ["NEWS_HEADLINE" (data)](#TDAmeritradeStreamer+event_NEWS_HEADLINE)
    * ["ACTIVES_NASDAQ" (data)](#TDAmeritradeStreamer+event_ACTIVES_NASDAQ)
    * ["ACTIVES_NYSE" (data)](#TDAmeritradeStreamer+event_ACTIVES_NYSE)
    * ["ACTIVES_OPTIONS" (data)](#TDAmeritradeStreamer+event_ACTIVES_OPTIONS)
    * ["LISTED_BOOK" (data)](#TDAmeritradeStreamer+event_LISTED_BOOK)
    * ["NASDAQ_BOOK" (data)](#TDAmeritradeStreamer+event_NASDAQ_BOOK)
    * ["CHART_SNAPSHOT" (data)](#TDAmeritradeStreamer+event_CHART_SNAPSHOT)
    * ["CHART_UPDATE" (data)](#TDAmeritradeStreamer+event_CHART_UPDATE)

<a name="new_TDAmeritradeStreamer_new"></a>

### new TDAmeritradeStreamer()
Represents the TDAmeritradeStreamer class for handling streaming.

<a name="TDAmeritradeStreamer+TDAmeritradeStreamer"></a>

### tdAmeritradeStreamer.TDAmeritradeStreamer
**Kind**: instance class of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  
<a name="new_TDAmeritradeStreamer+TDAmeritradeStreamer_new"></a>

#### new exports.TDAmeritradeStreamer(streamerConnectionOptions, [handleLevelOneFeedUpdate], [handleLevelOneTimeSaleUpdate])

| Param | Type | Description |
| --- | --- | --- |
| streamerConnectionOptions | [<code>TDAmeritradeStreamerConnectionOptions</code>](#TDAmeritradeStreamerConnectionOptions) | Streamer Connection Options |
| [handleLevelOneFeedUpdate] | <code>function</code> | Custom L1 feed data callback |
| [handleLevelOneTimeSaleUpdate] | <code>function</code> | Custom L1 time & sales feed data callback |

<a name="TDAmeritradeStreamer+on"></a>

### tdAmeritradeStreamer.on(evt, method, context)
EventEmitter on event handler

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>string</code> | Event Name |
| method | <code>string</code> | Method |
| context | <code>\*</code> | Context |

<a name="TDAmeritradeStreamer+add"></a>

### tdAmeritradeStreamer.add(evt, method, context)
EventEmitter addListener handler

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>string</code> | Event Name |
| method | <code>string</code> | Method |
| context | <code>\*</code> | Context |

<a name="TDAmeritradeStreamer+subscribeAccountActivity"></a>

### tdAmeritradeStreamer.subscribeAccountActivity()
Subscribe to Account Activity Service

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  
<a name="TDAmeritradeStreamer+getChartHistoryAndSubscribeQuotes"></a>

### tdAmeritradeStreamer.getChartHistoryAndSubscribeQuotes(symbol)
Subscribe to Chart and Quotes Service

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type |
| --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | 

<a name="TDAmeritradeStreamer+subscribeQuotes"></a>

### tdAmeritradeStreamer.subscribeQuotes(symbol)
Subscribe to Quote Service

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type |
| --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | 

<a name="TDAmeritradeStreamer+subscribeCharts"></a>

### tdAmeritradeStreamer.subscribeCharts(symbol)
Subscribe to Chart Equity Service

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type |
| --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | 

<a name="TDAmeritradeStreamer+subscribeOptions"></a>

### tdAmeritradeStreamer.subscribeOptions(symbol)
Subscribe to Option Service

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type |
| --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | 

<a name="TDAmeritradeStreamer+subscribeTimeAndSales"></a>

### tdAmeritradeStreamer.subscribeTimeAndSales(symbol)
Subscribe to Time & Sales Equity Service

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type |
| --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | 

<a name="TDAmeritradeStreamer+subscribeFutures"></a>

### tdAmeritradeStreamer.subscribeFutures(symbol)
Subscribe to Futures Chart History, Chart, Time & Sales & Level One Services

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Default |
| --- | --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | <code>/ES</code> | 

<a name="TDAmeritradeStreamer+subscribeTimeSalesFutures"></a>

### tdAmeritradeStreamer.subscribeTimeSalesFutures(symbol)
Subscribe to Futures Time & Sales Service

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Default |
| --- | --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | <code>/ES</code> | 

<a name="TDAmeritradeStreamer+subscribeFuturesOptions"></a>

### tdAmeritradeStreamer.subscribeFuturesOptions(symbol)
Subscribe to Level One Futures Options Service
'./EW1X20C3510, ./EW1X20C3525'

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type |
| --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | 

<a name="TDAmeritradeStreamer+subscribeActives"></a>

### tdAmeritradeStreamer.subscribeActives()
Subscribe to Actives Feed

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  
<a name="TDAmeritradeStreamer+subscribeNewsHeadlines"></a>

### tdAmeritradeStreamer.subscribeNewsHeadlines(symbol)
Subscribe to News Headlines

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Default |
| --- | --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | <code>*ALL*</code> | 

<a name="TDAmeritradeStreamer+setQualityOfService"></a>

### tdAmeritradeStreamer.setQualityOfService(qoslevel)
Set Quality of Service Level

0 = Express(500 ms)
1 = Real - Time(750 ms) default value for http binary protocol
2 = Fast(1, 000 ms) default value for websocket and http asynchronous protocol
3 = Moderate(1, 500 ms)
4 = Slow(3, 000 ms)
5 = Delayed(5, 000 ms)

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| qoslevel | <code>number</code> | <code>0</code> | Quality of Service level |

<a name="TDAmeritradeStreamer+subscribeListedBook"></a>

### tdAmeritradeStreamer.subscribeListedBook(symbol)
Subscribe to Listed Order Book Service

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type |
| --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | 

<a name="TDAmeritradeStreamer+subscribeNasdaqBook"></a>

### tdAmeritradeStreamer.subscribeNasdaqBook(symbol)
Subscribe to Nasdaq Order Book Service

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type |
| --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | 

<a name="TDAmeritradeStreamer+subscribeOptionsBook"></a>

### tdAmeritradeStreamer.subscribeOptionsBook(symbol)
Subscribe to Options Order Book Service

**Kind**: instance method of [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type |
| --- | --- |
| symbol | [<code>TickerSymbolKeys</code>](#TickerSymbolKeys) | 

<a name="TDAmeritradeStreamer+event_AUTHORIZED"></a>

### "AUTHORIZED" (data)
Emitted when `AUTHORIZED` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_ACCT_ACTIVITY"></a>

### "ACCT_ACTIVITY" (data)
Emitted when `ACCT_ACTIVITY` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_QUOTE"></a>

### "QUOTE" (data)
Emitted when `QUOTE` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_TIMESALE_EQUITY_UPDATE"></a>

### "TIMESALE_EQUITY_UPDATE" (data)
Emitted when `TIMESALE_EQUITY_UPDATE` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_OPTION"></a>

### "OPTION" (data)
Emitted when `OPTION` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_TIMESALE_FUTURES_UPDATE"></a>

### "TIMESALE_FUTURES_UPDATE" (data)
Emitted when `TIMESALE_FUTURES_UPDATE` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_LEVELONE_FUTURES_UPDATE"></a>

### "LEVELONE_FUTURES_UPDATE" (data)
Emitted when `LEVELONE_FUTURES_UPDATE` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_NEWS_HEADLINE"></a>

### "NEWS_HEADLINE" (data)
Emitted when `NEWS_HEADLINE` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_ACTIVES_NASDAQ"></a>

### "ACTIVES_NASDAQ" (data)
Emitted when `ACTIVES_NASDAQ` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_ACTIVES_NYSE"></a>

### "ACTIVES_NYSE" (data)
Emitted when `ACTIVES_NYSE` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_ACTIVES_OPTIONS"></a>

### "ACTIVES_OPTIONS" (data)
Emitted when `ACTIVES_OPTIONS` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_LISTED_BOOK"></a>

### "LISTED_BOOK" (data)
Emitted when `LISTED_BOOK` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_NASDAQ_BOOK"></a>

### "NASDAQ_BOOK" (data)
Emitted when `NASDAQ_BOOK` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_CHART_SNAPSHOT"></a>

### "CHART_SNAPSHOT" (data)
Emitted when `CHART_SNAPSHOT` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="TDAmeritradeStreamer+event_CHART_UPDATE"></a>

### "CHART_UPDATE" (data)
Emitted when `CHART_UPDATE` streamer event is emitted.

**Kind**: event emitted by [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Stream Event Data |

<a name="STATE"></a>

## STATE
**Kind**: global constant  
**Author**: Allen Sarkisyan  
**License**: MIT Open Source License  
**Copyright**: 2019 - 2023 XT-TX  
<a name="createTDAmeritradeStreamer"></a>

## createTDAmeritradeStreamer(streamerConnectionOptions, handleLevelOneFeedUpdate, handleLevelOneTimeSaleUpdate) ⇒ [<code>TDAmeritradeStreamer</code>](#TDAmeritradeStreamer)
Creates a new instance of TD Ameritrade Streamer

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| streamerConnectionOptions | [<code>TDAmeritradeStreamerConnectionOptions</code>](#TDAmeritradeStreamerConnectionOptions) | API Client Configuration |
| handleLevelOneFeedUpdate | <code>function</code> | Level one feed callback |
| handleLevelOneTimeSaleUpdate | <code>function</code> | Level one time & sales callback |

<a name="TickerSymbolKeys"></a>

## TickerSymbolKeys : <code>string</code> \| <code>Array.&lt;string&gt;</code>
Single Symbol, Comma Seperated Symbols or Array of Symbols ("SPY" | "SPY, QQQ" | ["SPY", "QQQ"])

**Kind**: global typedef  
<a name="FuturesSymbol"></a>

## FuturesSymbol : <code>string</code> \| <code>Array.&lt;string&gt;</code>
**Kind**: global typedef  
<a name="TDAmeritradeStreamerConnectionOptions"></a>

## TDAmeritradeStreamerConnectionOptions : <code>Object</code>
TD Ameritrade Stream Connection Options

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| primaryAccountId | <code>string</code> | Primary Account ID |
| accountId | <code>string</code> | Account ID to connect |
| token | <code>string</code> | Token from streamerInfo |
| accountCdDomainId | <code>string</code> | Account CD Domain ID from accounts |
| streamerSocketUrl | <code>string</code> | Streamer Socket URL |
| tokenTimestamp | <code>Date</code> | Token Timestamp |
| tokenExpirationTime | <code>Date</code> | Token Expiration Time |
| appId | <code>string</code> | App ID |
| acl | <code>string</code> | ACL from streamerInfo |
| userGroup | <code>string</code> | User Group |
| accessLevel | <code>string</code> | Access Level |
| company | <code>string</code> | Company Name |
| segment | <code>string</code> | Segment |
| streamerSubscriptionKeys | <code>Array.&lt;Object&gt;</code> | Streamer Subscription Keys |
| streamerSubscriptionKeys[].key | <code>string</code> | Subscription Key |
| quotes | <code>object</code> | Realtime Quotes |

<a name="TDAmeritradeStreamerCommand"></a>

## TDAmeritradeStreamerCommand : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| service | <code>string</code> | Service Name |
| command | <code>string</code> | Command Name |
| parameters | <code>Object</code> | Service Command Parameters |

<a name="TDAmeritradeStreamServiceResponse"></a>

## TDAmeritradeStreamServiceResponse : <code>Object</code>
TD Ameritrade Stream Response

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| service | <code>string</code> | Service Name. |
| requestid | <code>string</code> | Request ID. |
| command | <code>string</code> | Command. |
| timestamp | <code>Date</code> | Timestamp. |
| content | <code>Object</code> | Stream Response Content. |
| content.code | <code>number</code> | Response Code. |
| content.msg | <code>string</code> | Response Message. |

<a name="TDAmeritradeStreamDataResponse"></a>

## TDAmeritradeStreamDataResponse : <code>Object</code>
TD Ameritrade Data Response

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| service | <code>string</code> | Service Name. |
| timestamp | <code>Date</code> | Timestamp. |
| command | <code>string</code> | Command. |
| content | <code>Array.&lt;Object&gt;</code> \| <code>Object</code> | Stream Response Content. |
| snapshot? | <code>Array.&lt;Object&gt;</code> \| <code>Object</code> | Snapshot Data. |

<a name="TDAmeritradeStreamNotifyResponse"></a>

## TDAmeritradeStreamNotifyResponse : <code>Object</code>
TD Ameritrade Stream Notify Response

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| heartbeat | <code>Date</code> | Heartbeat. |

