import { EventEmitter } from 'eventemitter3';
import ws from 'isomorphic-ws';
import { STATE, EVENT, SERVICES, COMMANDS } from './td-constants.js';
import { TDAmeritradeStreamEventProcessor } from './td-stream-event-processor.js';

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
