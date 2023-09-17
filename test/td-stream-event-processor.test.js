/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */

const { EventEmitter } = require('eventemitter3');
const {
  TDAmeritradeStreamEventProcessor,
} = require('../dist/cjs/td-stream-event-processor.js');

const {
  CANCEL_ORDER_NOTIFICATION,
  ACTIVES_NASDAQ_NOTIFICATION,
  ACTIVES_NYSE_NOTIFICATION,
  ACTIVES_OPTIONS_NOTIFICATION,
  QUOTE_NOTIFICATION,
  TIMESALE_EQUITY_NOTIFICATION,
  NEWS_HEADLINE_NOTIFICATION,
  MESSAGE_STREAM,
  CHART_FUTURES_NOTIFICATION,
  CHART_HISTORY_FUTURES_NOTIFICATION,
  LEVELONE_FUTURES_NOTIFICATION,
  TIMESALE_FUTURES_NOTIFICATION,
  LEVELONE_FUTURES_OPTIONS_NOTIFICATION,
  FUTURES_MESSAGE_STREAM,
} = require('./helpers.js');

describe('TDAmeritradeStreamEventProcessor', () => {
  describe('create new TDAmeritradeStreamEventProcessor instance', () => {
    it('should create new instance of TDAmeritradeStreamer', async () => {
      const emitter = new EventEmitter();
      const streamEventProcessor = new TDAmeritradeStreamEventProcessor(
        emitter,
      );

      expect(true).toEqual(
        streamEventProcessor instanceof TDAmeritradeStreamEventProcessor,
      );
    });
  });

  describe('handleMessage', () => {
    let emitter = null;
    let streamEventProcessor = null;
    let spy = null;
    let consoleSpy = null;

    beforeEach((done) => {
      let levelOneFeedUpdate = (d) => {
        console.log(d);
      };
      let levelOneTimeSaleUpdate = (d) => {
        console.log(d);
      };
      emitter = new EventEmitter();
      streamEventProcessor = new TDAmeritradeStreamEventProcessor(
        emitter,
        levelOneFeedUpdate,
        levelOneTimeSaleUpdate,
      );
      spy = jest.spyOn(streamEventProcessor, 'emitEvent');
      consoleSpy = jest.spyOn(console, 'log');
      done();
    });

    it('console.log NOT_IMPLEMENTED for services not implemented or available', async () => {
      streamEventProcessor.handleMessage({
        data: [{ service: 'FUTURES_BOOK', content: [null] }],
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        'NOT_IMPLEMENTED - FUTURES_BOOK',
        [null],
      );

      streamEventProcessor.handleMessage({
        data: [{ service: 'FUTURES_OPTIONS_BOOK', content: [null] }],
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        'NOT_IMPLEMENTED - FUTURES_OPTIONS_BOOK',
        [null],
      );

      streamEventProcessor.handleMessage({
        data: [{ service: 'OPTIONS_BOOK', content: [null] }],
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        'NOT_IMPLEMENTED - OPTIONS_BOOK',
        { content: [null], service: 'OPTIONS_BOOK' },
      );
    });

    it('should log an error if emitter is missing', async () => {
      const result = new TDAmeritradeStreamEventProcessor();
      result.emitEvent();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('TDAmeriTradeStreamer emitEvent error'),
        TypeError("Cannot read properties of undefined (reading 'emit')"),
      );
    });

    it('should emit AUTHORIZED on login', async () => {
      streamEventProcessor.handleMessage({
        response: [
          {
            service: 'ADMIN',
            requestid: '123',
            command: 'LOGIN',
            timestamp: 123,
            content: {
              code: 0,
              msg: '28-2',
            },
          },
        ],
      });

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith('AUTHORIZED');
    });

    it('should handle SERVICES.ACCT_ACTIVITY', async () => {
      const evt = {
        data: [
          {
            service: 'ACCT_ACTIVITY',
            timestamp: 1604688024586,
            command: 'SUBS',
            content: [
              {
                1: 'TEST',
                2: 'OrderFill',
                3: 'TEST',
                key: 'TEST',
              },
            ],
          },
          {
            service: 'ACCT_ACTIVITY',
            timestamp: 1604688024586,
            command: 'SUBS',
            content: [
              {
                1: 'TEST',
                2: 'OrderEntryRequest',
                3: 'TEST',
                key: 'TEST',
              },
            ],
          },
          CANCEL_ORDER_NOTIFICATION,
        ],
      };

      streamEventProcessor.handleMessage(evt);

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith('ACCT_ACTIVITY', {
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
        type: 'UROUT',
        cancelledQuantity: '10',
        orderDestination: 'BEST',
      });
    });

    it('should handle SERVICES.ACTIVES_NASDAQ', async () => {
      streamEventProcessor.handleMessage({
        data: [ACTIVES_NASDAQ_NOTIFICATION],
      });

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith('ACTIVES_NASDAQ', [
        { percentChange: '17.01', symbol: 'TEST', volume: '2116402' },
        { percentChange: '5.67', symbol: 'TEST', volume: '705008' },
        { percentChange: '2.74', symbol: 'TEST', volume: '341318' },
        { percentChange: '2.32', symbol: 'TEST', volume: '288848' },
        { percentChange: '1.99', symbol: 'TEST', volume: '247410' },
        { percentChange: '1.47', symbol: 'TEST', volume: '183084' },
        { percentChange: '1.46', symbol: 'TEST', volume: '181920' },
        { percentChange: '1.41', symbol: 'TEST', volume: '175027' },
        { percentChange: '1.26', symbol: 'TEST', volume: '156917' },
        { percentChange: '1.26', symbol: 'TEST', volume: '156389' },
      ]);
    });

    it('should handle SERVICES.ACTIVES_NYSE', async () => {
      streamEventProcessor.handleMessage({ data: [ACTIVES_NYSE_NOTIFICATION] });

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith('ACTIVES_NYSE', [
        { percentChange: '9.43', symbol: 'TEST', volume: '375899981' },
        { percentChange: '5.93', symbol: 'TEST', volume: '236150045' },
        { percentChange: '2.16', symbol: 'TEST', volume: '86246634' },
        { percentChange: '1.83', symbol: 'TEST', volume: '73107260' },
        { percentChange: '1.8', symbol: 'TEST', volume: '71675523' },
        { percentChange: '1.48', symbol: 'TEST', volume: '58935758' },
        { percentChange: '1.06', symbol: 'TEST', volume: '42079334' },
        { percentChange: '0.9', symbol: 'TEST', volume: '35784390' },
        { percentChange: '0.85', symbol: 'TEST', volume: '33962115' },
        { percentChange: '0.85', symbol: 'TEST', volume: '33721081' },
      ]);
    });

    it('should handle SERVICES.QUOTE', async () => {
      streamEventProcessor.handleMessage({ data: [QUOTE_NOTIFICATION] });

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith('QUOTE', [
        {
          askID: 'N',
          askSize: 2,
          bidID: 'T',
          bidPrice: 18.78,
          bidSize: 1,
          key: 'TEST',
          quoteTime: 49396,
        },
      ]);
    });

    it('should handle SERVICES.TIMESALE_EQUITY', async () => {
      streamEventProcessor.handleMessage({
        data: [TIMESALE_EQUITY_NOTIFICATION],
      });

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith('TIMESALE_EQUITY_UPDATE', [
        {
          key: 'TEST',
          lastPrice: 18.75,
          lastSequence: 38239,
          lastSize: 100,
          seq: 453,
          tradeTime: 1604688112365,
        },
      ]);
    });

    it('should handle SERVICES.NEWS_HEADLINE', async () => {
      streamEventProcessor.handleMessage({
        data: [NEWS_HEADLINE_NOTIFICATION],
      });

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith('NEWS_HEADLINE', [
        {
          countForKeyword: 5,
          errorCode: 0,
          headline:
            "'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.",
          headlineId: '420691337',
          isHot: false,
          key: 'BTC',
          keywordArray: 'News,BTC,*ALL*',
          seq: 16,
          status: 'U',
          storyDatetime: 1604687204000,
          storyId: '420691337',
          storySource: 'BTC',
        },
      ]);
    });

    it('should handle SERVICES.CHART_SNAPSHOT & SERVICES.CHART_HISTORY_FUTURES', async () => {
      streamEventProcessor.handleMessage(CHART_HISTORY_FUTURES_NOTIFICATION);

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith(
        'CHART_SNAPSHOT',
        CHART_HISTORY_FUTURES_NOTIFICATION.snapshot,
      );

      streamEventProcessor.handleMessage({
        data: CHART_HISTORY_FUTURES_NOTIFICATION.snapshot,
      });

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith(
        'CHART_SNAPSHOT',
        CHART_HISTORY_FUTURES_NOTIFICATION.snapshot,
      );
    });

    it('should handle SERVICES.CHART_FUTURES', async () => {
      streamEventProcessor.handleMessage({
        data: [CHART_FUTURES_NOTIFICATION],
      });

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith('CHART_UPDATE', {
        1: 1604688060000,
        2: 3506.25,
        3: 3506.75,
        4: 3506,
        5: 3506.5,
        6: 451,
        key: '/ES',
        seq: 1250,
      });
    });

    it('should handle SERVICES.CHART_EQUITY', async () => {
      streamEventProcessor.handleMessage({
        data: [
          {
            service: 'CHART_EQUITY',
            timestamp: 1604688124326,
            command: 'SUBS',
            content: [null],
          },
        ],
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'NOT_IMPLEMENTED - CHART_EQUITY',
        null,
      );
    });

    it('should handle SERVICES.TIMESALE_FUTURES', async () => {
      const levelOneTimeSaleUpdateSpy = jest.spyOn(
        streamEventProcessor,
        'handleLevelOneTimeSaleUpdate',
      );

      streamEventProcessor.handleMessage({
        data: [TIMESALE_FUTURES_NOTIFICATION],
      });

      expect(levelOneTimeSaleUpdateSpy).toHaveBeenCalledWith([
        {
          key: '/ES',
          lastPrice: 3506.75,
          lastSequence: 50035211,
          lastSize: 1,
          seq: 476739,
          tradeTime: 1604688143092,
        },
        {
          key: '/ES',
          lastPrice: 3506.75,
          lastSequence: 50035212,
          lastSize: 1,
          seq: 476740,
          tradeTime: 1604688143092,
        },
      ]);
    });

    it('should handle SERVICES.LEVELONE_FUTURES & SERVICES.LEVELONE_FUTURES_OPTIONS', async () => {
      const levelOneFeedUpdateSpy = jest.spyOn(
        streamEventProcessor,
        'handleLevelOneFeedUpdate',
      );

      streamEventProcessor.handleMessage({
        data: [LEVELONE_FUTURES_NOTIFICATION],
      });

      expect(levelOneFeedUpdateSpy).toHaveBeenCalledWith({
        askPrice: 3507,
        askSize: 49,
        bidPrice: 3506.75,
        bidSize: 9,
        key: '/ES',
        quoteTime: 1604688143103,
        totalVolume: 1161346,
        tradeTime: 1604688143092,
      });

      streamEventProcessor.handleMessage({
        data: [LEVELONE_FUTURES_OPTIONS_NOTIFICATION],
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'NOT_IMPLEMENTED - LEVELONE_FUTURES_OPTIONS',
        [
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
      );
    });

    it('should handle SERVICES.ACTIVES_OPTIONS', async () => {
      // streamEventProcessor.handleMessage({ data: [{...ACTIVES_OPTIONS_NOTIFICATION, content: { ...ACTIVES_OPTIONS_NOTIFICATION.content, "1": "*" }}] });
      // expect(consoleSpy).toHaveBeenCalledWith(
      //   expect.stringContaining('TDAmeritradeStreamer handleActiveOptions error'),
      //   TypeError("Cannot read properties of undefined (reading 'emit')")
      // );

      streamEventProcessor.handleMessage({
        data: [ACTIVES_OPTIONS_NOTIFICATION],
      });

      expect(spy).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith('ACTIVES_OPTIONS', {
        calls: [
          {
            description: 'TEST Jan 15 2021 120 Call',
            percentChange: '0.43',
            symbol: 'TEST_011521C120',
            volume: '95651',
          },
          {
            description: 'TEST Nov 6 2020 118 Call',
            percentChange: '0.33',
            symbol: 'TEST_110620C118',
            volume: '72728',
          },
          {
            description: 'TEST Nov 6 2020 119 Call',
            percentChange: '0.32',
            symbol: 'TEST_110620C119',
            volume: '72528',
          },
          {
            description: 'TEST Dec 18 2020 1 Call',
            percentChange: '0.3',
            symbol: 'TEST_121820C1',
            volume: '66643',
          },
          {
            description: 'TEST Nov 6 2020 42 Call',
            percentChange: '0.37',
            symbol: 'TEST_110620C42',
            volume: '12406',
          },
          {
            description: 'TEST Nov 6 2020 43 Call',
            percentChange: '0.3',
            symbol: 'TEST_110620C43',
            volume: '10089',
          },
          {
            description: 'TEST Nov 13 2020 42 Call',
            percentChange: '0.23',
            symbol: 'TEST_111320C42',
            volume: '7690',
          },
          {
            description: 'TEST Nov 13 2020 45 Call',
            percentChange: '0.23',
            symbol: 'TEST_111320C45',
            volume: '7597',
          },
          {
            description: 'TEST Nov 13 2020 10 Call',
            percentChange: '0.22',
            symbol: 'TEST_111320C10',
            volume: '7415',
          },
          {
            description: 'TEST Nov 6 2020 200 Call',
            percentChange: '0.22',
            symbol: 'TEST_110620C200',
            volume: '7197',
          },
        ],
        puts: [
          {
            description: 'TEST Jan 15 2021 120 Put',
            percentChange: '0.38',
            symbol: 'TEST_011521P120',
            volume: '84856',
          },
          {
            description: 'VIX Dec 16 2020 20 Put',
            percentChange: '0.3',
            symbol: 'VIX_121620P20',
            volume: '67372',
          },
        ],
        spy: {
          calls: [
            {
              description: 'SPY Nov 6 2020 350 Call',
              percentChange: '0.32',
              symbol: 'SPY_110620C350',
              volume: 86157,
            },
          ],
          puts: [
            {
              description: 'SPY Nov 6 2020 350 Put',
              percentChange: '0.27',
              symbol: 'SPY_110620P350',
              volume: 95736,
            },
            {
              description: 'SPY Nov 6 2020 349 Put',
              percentChange: '0.26',
              symbol: 'SPY_110620P349',
              volume: 93837,
            },
            {
              description: 'SPY Nov 6 2020 348 Put',
              percentChange: '0.26',
              symbol: 'SPY_110620P348',
              volume: 80410,
            },
          ],
          totalCalls: 86157,
          totalPuts: 269983,
        },
      });
    });
  });
});
