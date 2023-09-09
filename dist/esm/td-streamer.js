import { EventEmitter } from 'eventemitter3';
import ws from 'isomorphic-ws';
import { FIELDS, SERVICES, STATE, EVENT, COMMANDS } from './td-constants.js';
import { xml2js } from 'xml-js';

/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */


const getElementText = (elements, key, field = 'text') => {
  try {
    const text = elements?.find(({ name }) => (name === key))?.elements[0][field];
    return text;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const parseOrderData = (data = []) => {
  try {
    const { elements } = data.find(i => i.name === 'Order');
    const security = elements?.find(({ name }) => (name === 'Security'));

    const orderType = getElementText(elements, 'OrderType');
    const orderKey = getElementText(elements, 'OrderKey');
    const orderPricing = getElementText(elements, 'OrderPricing', 'name');
    const orderDuration = getElementText(elements, 'OrderDuration');
    const orderEnteredDateTime = getElementText(elements, 'OrderEnteredDateTime');
    const orderInstructions = getElementText(elements, 'OrderInstructions');
    const originalQuantity = getElementText(elements, 'OriginalQuantity');
    const orderSource = getElementText(elements, 'OrderSource');
    const enteringDevice = getElementText(elements, 'EnteringDevice');
    // const openClose = getElementText(elements, 'OpenClose');

    const cusip = getElementText(security?.elements, 'CUSIP');
    const symbol = getElementText(security?.elements, 'Symbol');
    const securityType = getElementText(security?.elements, 'SecurityType');

    return {
      orderType,
      orderKey,
      cusip,
      symbol,
      securityType,
      orderPricing,
      orderDuration,
      orderEnteredDateTime,
      orderInstructions,
      originalQuantity,
      orderSource,
      enteringDevice,
      // openClose,
    };
  } catch (e) {
    console.log(e);
    return null; 
  }
};

const parseMessage = ({ timestamp, type, data }) => {
  try {
    const xml = xml2js(data);
    const xmlData = xml.elements[0].elements;
    const activityTimestamp = getElementText(xmlData, 'ActivityTimestamp');
    const orderData = parseOrderData(xmlData);

    return {
      xmlData,
      response: {
        timestamp,
        type,
        activityTimestamp,
        ...orderData
      }
    };
  } catch (e) {
    console.log('parseMessage Error', e);
    return null;
  }
};

const parseOrderEntryMessage = (msg) => {
  try {
    const { response } = parseMessage(msg);
    return response;
  } catch (e) {
    return null;
  }
};

const parseOrderFillMessage = (msg) => {
  try {
    const { xmlData, response } = parseMessage(msg);

    const execution = xmlData.find(i => i.name === 'ExecutionInformation').elements;
    const contraInformation = xmlData.find(i => i.name === 'ContraInformation').elements[0]?.elements;
    
    const executionType = getElementText(execution, 'Type');
    const executionPrice = getElementText(execution, 'ExecutionPrice');
    const brokerId = getElementText(execution, 'BrokerId');
    const broker = getElementText(contraInformation, 'Broker');
    const partialFill = getElementText(xmlData, 'RemainingQuantity');
  
    const parsedResponse = {
      ...response,
      broker,
      brokerId,
      executionType,
      executionPrice,
    };
  
    if (partialFill) {
      parsedResponse.remainingQuantity = partialFill;
    }
  
    return parsedResponse; 
  } catch (e) {
    console.log(e);
    return null;
  }
};

const parseCancelMessage = (msg) => {
  try {
    const { xmlData, response } = parseMessage(msg);

    const cancelledQuantity = getElementText(xmlData, 'CancelledQuantity');
    const orderDestination = getElementText(xmlData, 'OrderDestination');
  
    return {
      ...response,
      cancelledQuantity,
      orderDestination
    }; 
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */


const BID_FIELD_KEYS = Object.keys(FIELDS.BID_FIELDS);
const BID_FIELD_VALUES = Object.values(FIELDS.BID_FIELDS);
const ASK_FIELD_KEYS = Object.keys(FIELDS.ASK_FIELDS);
const ASK_FIELD_VALUES = Object.values(FIELDS.ASK_FIELDS);
const ORDER_BOOK_EXCHANGE_KEYS = Object.keys(FIELDS.ORDER_BOOK_EXCHANGE_FIELDS);
const ORDER_BOOK_EXCHANGE_VALUES = Object.values(FIELDS.ORDER_BOOK_EXCHANGE_FIELDS);

const chunk = (arr = [], size) => Array.from(
  { length: Math.ceil(arr.length / size) },
  (_, i) => arr.slice(i * size, i * size + size)
);

const transformMessageData = (data, fieldKeys, fieldValues) => {
  return data.map(msg => {
    const keys = Object.keys(msg);
    const vals = Object.values(msg);

    return keys.map(key => {
      const idx = fieldValues.indexOf(Number(key));
      const idxVal = fieldKeys[idx];

      return idxVal || key;
    })
      .reduce((a, b, index) => ({ ...a, [b]: vals[index] }), {});
  });
};

const transformData = (data, fields) => {
  const fieldKeys = Object.keys(fields);
  const fieldValues = Object.values(fields);

  return transformMessageData(data.content, fieldKeys, fieldValues);
};

const parseActivesMessage = (msg) => {
  const msgData = msg.content[0][1].split(';');

  const actives = chunk(
    msgData.slice(5)
    .map(i => i.split(':').slice(3))[1],
    3,
  )
  .map(([
    symbol,
    volume,
    percentChange
  ]) => ({
    symbol,
    volume,
    percentChange
  }));

  return actives;
};

const parseListedBook = (data) => {
  try {
    const book = transformData(data, FIELDS.LISTED_BOOK);

    for (let i = 0; i < book.length; i++) {
      book[i].bids = transformMessageData(
        book[i].bids,
        BID_FIELD_KEYS,
        BID_FIELD_VALUES
      );
  
      book[i].asks = transformMessageData(
        book[i].asks,
        ASK_FIELD_KEYS,
        ASK_FIELD_VALUES
      );
  
      for (let x = 0; x < book[i].bids.length; x++) {
        book[i].bids[x].bids = transformMessageData(
          book[i].bids[x].bids,
          ORDER_BOOK_EXCHANGE_KEYS,
          ORDER_BOOK_EXCHANGE_VALUES
        );
      }
  
      for (let x = 0; x < book[i].asks.length; x++) {
        book[i].asks[x].asks = transformMessageData(
          book[i].asks[x].asks,
          ORDER_BOOK_EXCHANGE_KEYS,
          ORDER_BOOK_EXCHANGE_VALUES
        );
      }
    }
  
    return book; 
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * TD Ameritrade Stream Response
 * @typedef {Object} TDAmeritradeStreamServiceResponse
 * @property {boolean} service - Service Name.
 * @property {boolean} requestid - Request ID.
 * @property {boolean} command - Command.
 * @property {Date} timestamp - Timestamp.
 * @property {Object} content - Stream Response Content.
 * @property {number} content.code - Response Code.
 * @property {string} content.msg - Response Message.
 */

/**
 * TD Ameritrade Data Response
 * @typedef {Object} TDAmeritradeStreamDataResponse
 * @property {boolean} service - Service Name.
 * @property {Date} timestamp - Timestamp.
 * @property {boolean} command - Command.
 * @property {Array<Object>} content - Stream Response Content.
 */

/**
 * TD Ameritrade Stream Notify Response
 * @typedef {Object} TDAmeritradeStreamNotifyResponse
 * @property {Date} heartbeat - Heartbeat.
 */

class TDAmeritradeStreamEventProcessor {
  /**
   * TDAmeritradeStreamEventProcessor - Handle's stream response
   * @param {EventEmitter} emitter 
   * @param {Function} handleLevelOneFeedUpdate 
   * @param {Function} handleLevelOneTimeSaleUpdate 
   */
  constructor(
    emitter,
    handleLevelOneFeedUpdate = (data) => {},
    handleLevelOneTimeSaleUpdate = (data) => {},
  ) {
    this.emitter = emitter;
    this.handleLevelOneFeedUpdate = handleLevelOneFeedUpdate;
    this.handleLevelOneTimeSaleUpdate = handleLevelOneTimeSaleUpdate;
  }

  /**
   * 
   * @param {Object} TDAmeritradeStreamResponse
   * @param {TDAmeritradeStreamServiceResponse} TDAmeritradeStreamResponse.response - Response
   * @param {TDAmeritradeStreamDataResponse[]} TDAmeritradeStreamResponse.data - Response Data
   * @param {TDAmeritradeStreamDataResponse} TDAmeritradeStreamResponse.snapshot - Response Data Snapshot
   */
  handleMessage({ response, data, snapshot }) {
    try {
      if (
        response && response[0]
        && response[0]?.command === 'LOGIN'
        && response[0]?.content?.code === 0
      ) {
        this.emitEvent('AUTHORIZED');
      }

      if (snapshot) {
        this.emitEvent('CHART_SNAPSHOT', snapshot);
      } else if (data) {
        data?.forEach(msg => {
          switch (msg.service) {
            case SERVICES.ACCT_ACTIVITY:
              this.handleAccountActivity(msg);
              break;
            case SERVICES.QUOTE:
              this.handleQuotes(msg);
              break;
            case SERVICES.OPTION:
              console.log('NOT_IMPLEMENTED - OPTION', msg.content);
              break;
            case SERVICES.CHART_HISTORY_FUTURES:
              this.emitEvent('CHART_SNAPSHOT', msg.content.snapshot);
              break;
            case SERVICES.CHART_FUTURES:
              this.emitEvent('CHART_UPDATE', msg.content[0]);
              break;
            case SERVICES.LEVELONE_FUTURES:
              this.handleLevelOneFutures(msg);
              break;
            case SERVICES.LEVELONE_FUTURES_OPTIONS:
              console.log('NOT_IMPLEMENTED - LEVELONE_FUTURES_OPTIONS', msg.content);
              break;
            case SERVICES.FUTURES_BOOK:
              console.log('NOT_IMPLEMENTED - FUTURES_BOOK', msg.content);
              break;
            case SERVICES.FUTURES_OPTIONS_BOOK:
              console.log('NOT_IMPLEMENTED - FUTURES_OPTIONS_BOOK', msg.content);
              break;
            case SERVICES.LISTED_BOOK:
              this.handleListedBook(msg);
              break;
            case SERVICES.NASDAQ_BOOK:
              this.handleNasdaqBook(msg);
              break;
            case SERVICES.OPTIONS_BOOK:
              console.log('NOT_IMPLEMENTED - OPTIONS_BOOK', msg);
              break;
            case SERVICES.TIMESALE_EQUITY:
              this.handleTimeSales(msg);
              break;
            case SERVICES.TIMESALE_FUTURES:
              this.handleLevelOneFutures(msg, true);
              break;
            case SERVICES.CHART_EQUITY:
              console.log('NOT_IMPLEMENTED - CHART_EQUITY', msg.content[0]);
              break;
            case SERVICES.ACTIVES_NASDAQ:
              this.handleActivesNasdaq(msg);
              break;
            case SERVICES.ACTIVES_NYSE:
              this.handleActivesNYSE(msg);
              break;
            case SERVICES.ACTIVES_OPTIONS:
              this.handleActiveOptions(msg);
              break;
            case SERVICES.NEWS_HEADLINE:
              this.handleNews(msg);
              break;
          }
        });
      }
    } catch (e) {
      console.log('TDAmeriTradeStreamer handleMessage Error', e);
    }
  }

  /**
   * 
   * @param {string} evt - Event Name
   * @param {(Object|Array|string|number|boolean)} [data] - Event Data
   */
  emitEvent(evt, data = null) {
    try {
      this.emitter.emit(evt, data);
    } catch (e) {
      console.log('TDAmeriTradeStreamer emitEvent error', e);
    }
  }

  handleAccountActivity(msg) {
    try {
      const message = {
        timestamp: msg.timestamp,
        type: msg.content[0]['2'],
        data: msg.content[0]['3'],
      };
  
      let parsedMessage = null;
  
      switch (message.type) {
        case 'OrderEntryRequest':
          parsedMessage = parseOrderEntryMessage(message);
          break;
        case 'OrderFill':
        case 'OrderPartialFill':
          parsedMessage = parseOrderFillMessage(message);
          break;
        case 'UROUT':
          parsedMessage = parseCancelMessage(message);
          break;
      }
  
      if (parsedMessage) {
        this.emitEvent('ACCT_ACTIVITY', parsedMessage);
      } 
    } catch (e) {
      console.log('TDAmeriTradeStreamer handleAccountActivity error', e);
    }
  }

  handleQuotes(msg) {
    const data = transformData(msg, FIELDS.LEVEL_ONE_EQUITY);
    this.emitEvent('QUOTE', data);
  }

  handleTimeSales(msg) {
    const data = transformData(msg, FIELDS.TIMESALE);
    this.emitEvent('TIMESALE_EQUITY_UPDATE', data);
    this.handleLevelOneTimeSaleUpdate(data);
  }

  handleOptions(msg) {
    const data = transformData(msg, FIELDS.OPTION);
    this.emitEvent('OPTION', data);
  }

  handleLevelOneFutures(msg, timeSales = false) {
    const data = transformData(msg, (timeSales ? FIELDS.TIMESALE : FIELDS.LEVEL_ONE_FUTURES));

    if (timeSales) {
      this.emitEvent('TIMESALE_FUTURES_UPDATE', data);
      this.handleLevelOneTimeSaleUpdate(data);
    } else {
      // this.emitEvent('LEVELONE_FUTURES_UPDATE', data[0]);
      this.handleLevelOneFeedUpdate(data[0]);
    }
  }

  handleNews(msg) {
    const data = transformData(msg, FIELDS.NEWS_HEADLINE);
    this.emitEvent('NEWS_HEADLINE', data);
  }

  handleActivesNasdaq(msg) {
    const data = parseActivesMessage(msg);
    this.emitEvent('ACTIVES_NASDAQ', data);
  }

  handleActivesNYSE(msg) {
    const data = parseActivesMessage(msg);
    this.emitEvent('ACTIVES_NYSE', data);
  }

  handleListedBook(msg) {
    const data = parseListedBook(msg);
    this.emitEvent('LISTED_BOOK', data);
  }

  handleNasdaqBook(msg) {
    const data = parseListedBook(msg);
    this.emitEvent('NASDAQ_BOOK', data);
  }

  handleActiveOptions(msg) {
    try {
      const msgData = msg.content[0][1].split(';');
      // const activeOptions = chunk(msg.content[0][1].split(';').slice(5).map(i => i.split(':').slice(3))[1], 4).map(([symbol, description, volume, percentChange]) => ({ symbol, description, volume, percentChange }))
      const activeOptions = chunk(
        msgData.slice(5)
        .reverse()
        .map(i => i.split(':').slice(3))
        .flat(),
        4,
      )
      .map(([
        symbol,
        description,
        volume,
        percentChange
      ]) => ({
        symbol,
        description,
        volume,
        percentChange
      }));
  
      var calls = activeOptions.filter(i => /Call/gim.test(i.description));
      var puts = activeOptions.filter(i => /Put/gim.test(i.description));
  
      var spy = {
        calls: calls.filter(i => /SPY/gim.test(i.description)),
        puts: puts.filter(i => /SPY/gim.test(i.description)),
      };
  
      const spyCalls = new Map();
      const spyPuts = new Map();
  
      for (let i = 0; i < spy.calls.length; i++) {
        if (spyCalls.has(spy.calls[i].symbol)) {
          spyCalls.set(spy.calls[i].symbol, {
            ...spy.calls[i],
            volume: spyCalls.get(spy.calls[i].symbol).volume + Number(spy.calls[i].volume)
          });
        } else {
          spyCalls.set(spy.calls[i].symbol, {
            ...spy.calls[i],
            volume: Number(spy.calls[i].volume)
          });
        }
      }
  
      for (let i = 0; i < spy.puts.length; i++) {
        if (spyPuts.has(spy.puts[i].symbol)) {
          spyPuts.set(spy.puts[i].symbol, {
            ...spy.puts[i],
            volume: spyPuts.get(spy.puts[i].symbol).volume + Number(spy.puts[i].volume)
          });
        } else {
          spyPuts.set(spy.puts[i].symbol, {
            ...spy.puts[i],
            volume: Number(spy.puts[i].volume)
          });
        }
      }
  
      spy.calls = Array.from(spyCalls.values());
      spy.puts = Array.from(spyPuts.values());
  
      spy.totalCalls = spy.calls.reduce((a, b) => {
        a += b.volume;
        return a;
      }, 0);
  
      spy.totalPuts = spy.puts.reduce((a, b) => {
        a += b.volume;
        return a;
      }, 0);
  
      this.emitEvent('ACTIVES_OPTIONS', {
        spy,
        calls: calls.filter(i => !/SPY/gim.test(i.description)),
        puts: puts.filter(i => !/SPY/gim.test(i.description)),
      }); 
    } catch (e) {
      console.log('TDAmeritradeStreamer handleActiveOptions error', e);
    }
  }
}

/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */


const randomID = () => Math.floor(Math.random() * 2000000000);

const jsonToQueryString = (json) => Object.keys(json).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`).join('&');

class TDAmeritradeStreamer {
  constructor(
    streamerInfo,
    handleLevelOneFeedUpdate = (data) => {},
    handleLevelOneTimeSaleUpdate = (data) => {},
  ) {
    console.log('TDAmeritradeStreamer Client', { streamerInfo });
    this.streamerInfo = streamerInfo;
    this.emitter = new EventEmitter();

    this.streamEventProcessor = new TDAmeritradeStreamEventProcessor(
      this.emitter,
      handleLevelOneFeedUpdate,
      handleLevelOneTimeSaleUpdate,
    );

    this.emitter.on(STATE.CONNECTED, () => this.login());
    this.emitter.on(STATE.DISCONNECTING, () => this.logout());
    this.emitter.on(EVENT.MESSAGE, (evtData) => this.streamEventProcessor.handleMessage(evtData));

    this.connect();

    // TODO: REMOVE
    // this.test();
  }

  on(evt, method, context) {
    this.emitter.on(evt, method, context);
  }
  
  add(evt, method, context) {
    this.emitter.addListener(evt, method, context);
  }

  test() {
    var idx = 0;
    var interval = setInterval(() => {
      this.emitter.emit('TIMESALE_FUTURES_UPDATE', [{ lastPrice: Math.random() }, { lastPrice: Math.random() }, { lastPrice: Math.random() }, { lastPrice: Math.random() }]);
      // this.emitter.emit(EVENT.MESSAGE, logs[idx]);

      idx++;

      if (idx >= 1000) {
        clearInterval(interval);
      }
    }, 500);
  }

  connect() {
    this.socket = new ws(`wss://${this.streamerInfo.streamerSocketUrl}/ws`);
    this.socket.onopen = () => this.emitter.emit(STATE.CONNECTED);
    this.socket.onclose = () => this.emitter.emit(STATE.DISCONNECTING);
    this.socket.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        this.emitter.emit(EVENT.MESSAGE, data);
      } catch (e) {
        console.log('TDAmeritradeStreamer error', e);
      }
    };
  }

  sendRequest(commands = []) {
    try {
      const requests = commands.map(cmd => ({
        ...cmd,
        requestid: randomID(),
        account: this.streamerInfo.accountId,
        source: this.streamerInfo.appId,
      }));
  
      this.socket.send(JSON.stringify({ requests })); 
    } catch (e) {
      console.log('TDAmeritradeStreamer sendRequest error', e);
    }
  }

  login() {
    if (!this.streamerInfo) { return; }

    const credential = jsonToQueryString({
      userid: this.streamerInfo.accountId,
      token: this.streamerInfo.token,
      company: this.streamerInfo.company,
      segment: this.streamerInfo.segment,
      cddomain: this.streamerInfo.accountCdDomainId,
      usergroup: this.streamerInfo.userGroup,
      accesslevel: this.streamerInfo.accessLevel,
      authorized: 'Y',
      timestamp: (new Date(this.streamerInfo.tokenTimestamp)).getTime(),
      appid: this.streamerInfo.appId,
      acl: this.streamerInfo.acl
    });

    this.sendRequest([
      { 
        service: SERVICES.ADMIN,
        command: COMMANDS.LOGIN,
        parameters: {
          credential,
          version: '1.0',
          token: this.streamerInfo.token
        }
      },
      // {
      //   service: SERVICES.ADMIN,
      //   command: COMMANDS.QOS,
      //   parameters: { qoslevel: 0 }
      // },
    ]);
  }

  logout() {
    this.sendRequest([
      {
        service: SERVICES.ADMIN,
        command: COMMANDS.LOGOUT,
        parameters: {}
      }
    ]);
  }

  subscribeAccountActivity() {
    const keys = this.streamerInfo.streamerSubscriptionKeys.keys[0].key;
    this.sendRequest([
      {
        service: SERVICES.ACCT_ACTIVITY,
        command: COMMANDS.SUBS,
        parameters: { keys, fields: '0,1,2,3' }
      },
    ]);
  }

  getChartHistoryAndSubscribeQuotes(keys) {
    this.subscribeQuotes(keys);
    this.subscribeCharts(keys);
  }

  // TODO: Resolve these values from somewhere else
  subscribeQuotes(keys) {
    const fields = '0,1,2,3,4,5,8,9,10,11,12,13,15,17,18,24,28,29,30,31,48,49,50,51';
    this.sendRequest([
      {
        service: SERVICES.QUOTE,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }

  subscribeCharts(keys) {
    const fields = '0,1,2,3,4,5,6,7,8';
    this.sendRequest([
      {
        service: SERVICES.CHART_EQUITY,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }

  subscribeOptions(keys) {
    const fields = '0,1,2,3,4,5,6,7,8,9,10,11,12,13,19,20,21,22,23,24,25,26,27,29,30,31,32,33,34,35,36,37,38,39,40,41';
    this.sendRequest([
      {
        service: SERVICES.OPTION,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }

  subscribeTimeAndSales(keys) {
    const fields = '0,1,2,3,4';
    this.sendRequest([
      {
        service: SERVICES.TIMESALE_EQUITY,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
      // {
      //   service: SERVICES.TIMESALE_OPTIONS,
      //   command: COMMANDS.SUBS,
      //   parameters: { keys, fields }
      // }
    ]);
  }

  subscribeFutures(symbol = '/ES') {
    const fields = '0,1,2,3,4,5,8,9,10,11,12,13,14,18,23';
    this.sendRequest([
      {
        service: SERVICES.CHART_HISTORY_FUTURES,
        command: COMMANDS.GET,
        parameters: { symbol, frequency: 'm1', period: 'd1' }
      },
      {
        service: SERVICES.CHART_FUTURES,
        command: COMMANDS.SUBS,
        parameters: { keys: symbol, fields: '0,1,2,3,4,5,6,7' }
      },
      {
        service: SERVICES.TIMESALE_FUTURES,
        command: COMMANDS.SUBS,
        parameters: { keys: symbol, fields: '0,1,2,3,4' }
      },
      {
        service: SERVICES.LEVELONE_FUTURES,
        command: COMMANDS.SUBS,
        parameters: { keys: symbol, fields }
      },
    ]);
  }
  
  subscribeTimeSalesFutures(symbol = '/ES') {
    this.sendRequest([
      {
        service: SERVICES.TIMESALE_FUTURES,
        command: COMMANDS.SUBS,
        parameters: { keys: symbol, fields: '0,1,2,3,4' }
      },
    ]);
  }

  // './EW1X20C3510, ./EW1X20C3525'
  subscribeFuturesOptions(keys) {
    const fields = '0,1,2,3,4,5,8,9,10,11,12,13,14,18,23';
    this.sendRequest([
      {
        service: SERVICES.LEVELONE_FUTURES_OPTIONS,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      }
    ]);
  }

  subscribeActives() {
    this.sendRequest([
      {
        service: SERVICES.ACTIVES_NASDAQ,
        command: COMMANDS.SUBS,
        parameters: { keys: 'NASDAQ-60', fields: '0,1' }
      },
      {
        service: SERVICES.ACTIVES_NYSE,
        command: COMMANDS.SUBS,
        parameters: { keys: 'NYSE-ALL', fields: '0,1' }
      },
      {
        service: SERVICES.ACTIVES_OPTIONS,
        command: COMMANDS.SUBS,
        parameters: { keys: 'OPTS-DESC-ALL', fields: '0,1' }
      },
    ]);
  }

  subscribeNewsHeadlines(keys = '*ALL*') {
    this.sendRequest([
      {
        service: SERVICES.NEWS_HEADLINE,
        command: COMMANDS.SUBS,
        parameters: { keys, fields: '0,1,2,3,4,5,6,7,8,9,10' }
      }
    ]);
  }

  // 0 = Express(500 ms)
  // 1 = Real - Time(750 ms) default value for http binary protocol
  // 2 = Fast(1, 000 ms) default value for websocket and http asynchronous protocol
  // 3 = Moderate(1, 500 ms)
  // 4 = Slow(3, 000 ms)
  // 5 = Delayed(5, 000 ms)
  setQualityOfService(qoslevel = 0) {
    this.sendRequest([
      {
        service: SERVICES.ADMIN,
        command: COMMANDS.QOS,
        parameters: { qoslevel }
      },
    ]);
  }

  subscribeListedBook(keys) {
    const fields = '0,1,2,3';
    this.sendRequest([
      {
        service: SERVICES.LISTED_BOOK,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }

  subscribeNasdaqBook(keys) {
    const fields = '0,1,2,3';
    this.sendRequest([
      {
        service: SERVICES.NASDAQ_BOOK,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }

  subscribeOptionsBook(keys) {
    const fields = '0,1,2,3';
    this.sendRequest([
      {
        service: SERVICES.OPTIONS_BOOK,
        command: COMMANDS.SUBS,
        parameters: { keys, fields }
      },
    ]);
  }
}

export { TDAmeritradeStreamer };
