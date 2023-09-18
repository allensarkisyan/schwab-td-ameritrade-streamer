/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const {
  TDAmeritradeStreamer,
  createTDAmeritradeStreamer,
} = require('../dist/cjs/td-streamer.js');

const { getKeys, chunk } = require('../dist/cjs/utils.js');

const {
  streamerConnectionOptions,
  mockRequestId,
  handleArrayBuffer,
  LEVELONE_FUTURES_NOTIFICATION,
} = require('./helpers.js');

const { SSLApp, App, us_listen_socket_close } = require('uWebSockets.js');

describe('TDAmeritradeStreamer', () => {
  describe('create new TDAmeritradeStreamer instance', () => {
    it('should throw an Error if missing `streamerConnectionOptions`', async () => {
      expect(() => new TDAmeritradeStreamer(null)).toThrow(
        'Missing TDAmeritradeStreamerConnectionOptions',
      );
    });

    it('should throw an Error if missing `streamerSocketUrl`', async () => {
      expect(() => new TDAmeritradeStreamer(streamerConnectionOptions)).toThrow(
        'TDAmeritradeStreamer Missing Connection Options: [streamerSocketUrl]',
      );
    });

    // it('should throw an Error if passed an invalid `streamerSocketUrl`', async () => {
    //   expect(() => new TDAmeritradeStreamer({ ...streamerConnectionOptions, streamerSocketUrl: 'ws:/localhost:3003/invalid' })).toThrow('TDAmeritradeStreamer WebSocket Connection Failed.');
    // });

    // it('should create new instance of TDAmeritradeStreamer without ws/wss protocol', async () => {
    //   const result = new TDAmeritradeStreamer({ ...streamerConnectionOptions, streamerSocketUrl: 'localhost:3003' });

    //   expect(true).toEqual(result instanceof TDAmeritradeStreamer);
    // });
  });

  describe('TDAmeritradeStreamer subscriptions', () => {
    let server = null;
    let listenSocket = null;
    let tdStreamer = null;
    let spy = null;
    let consoleSpy = null;

    beforeAll((done) => {
      // server = SSLApp({
      //   key_file_name: 'localhost+2-key.pem',
      //   cert_file_name: 'localhost+2.pem',
      // })
      server = App().ws('/ws', {
        open: (ws) => {
          ws.send(
            JSON.stringify({
              data: [LEVELONE_FUTURES_NOTIFICATION],
            }),
          );
        },
        message: (ws, message, isBinary) => {
          const evt = JSON.parse(handleArrayBuffer(message));
          ws.send(message);
        },
      })
      .get('/shutdown', (res, req) => {
        if (listenSocket) {
          us_listen_socket_close(listenSocket);
        } else {
          res.close();
        }
      })
      .listen(3003, (socket) => {
        if (socket) {
          listenSocket = socket;
        }
      });

      tdStreamer = new TDAmeritradeStreamer({
        ...streamerConnectionOptions,
        streamerSocketUrl: 'ws://localhost:3003/ws',
      });

      // spy = jest.spyOn(tdStreamer.prototype, '#sendRequest');
      // consoleSpy = jest.spyOn(console, 'log');

      setTimeout(() => done(), 1000);
    });

    afterAll((done) => {
      // await (fetch('http://localhost:3003/shutdown'))
      setTimeout(() => {
        tdStreamer.disconnect();
        us_listen_socket_close(listenSocket);
        done();
      }, 1000);
    });

    it('should create new instance of TDAmeritradeStreamer', async () => {
      expect(true).toEqual(tdStreamer instanceof TDAmeritradeStreamer);
    });

    it('should allow custom handleLevelOneFeedUpdate / handleLevelOneTimeSaleUpdate ', (done) => {
      const levelOneUpdate = (d) => {
        return d;
      };
      const levelOneTimeSales = (d) => {
        return d;
      };

      const result = createTDAmeritradeStreamer(
        {
          ...streamerConnectionOptions,
          streamerSocketUrl: 'ws://localhost:3003/ws',
        },
        levelOneUpdate,
        levelOneTimeSales,
      );

      result.on('LEVELONE_FUTURES_UPDATE', (data) => {
        expect(levelOneUpdate).toHaveBeenCalled();
      });

      result.on('TIMESALE_FUTURES_UPDATE', (data) => {
        expect(levelOneTimeSales).toHaveBeenCalled();
      });
      
      setTimeout(() => {
        result.disconnect();
        done();
      }, 1000);
    });

    it('should set default handleLevelOneFeedUpdate / handleLevelOneTimeSaleUpdate values', (done) => {
      const result = createTDAmeritradeStreamer(
        {
          ...streamerConnectionOptions,
          streamerSocketUrl: 'ws://localhost:3003/ws',
        },
      );

      setTimeout(() => {
        result.disconnect();
        done();
      }, 1000);
    });

    it('getKeys should handle ticker symbols', async () => {
      const EXPECTED = 'SPY, QQQ, TSLA, MSFT, AAPL';
      const symbolsArr = ['SPY', 'QQQ', 'TSLA', 'MSFT', 'AAPL'];
      const keysArr = getKeys(symbolsArr);
      const keysStr = getKeys(EXPECTED);

      expect(keysArr).toEqual(EXPECTED);
      expect(keysStr).toEqual(EXPECTED);
      expect(getKeys('SPY')).toEqual('SPY');
    });

    it('chunk should handle chunking arrays', async () => {
      const arr = [1, 2, 3, 4];
      const chunkedEmpty = chunk([], 1);
      const chunkedDefault = chunk(arr);
      const chunkedNone = chunk();
      const chunked0 = chunk(arr, 0);
      const chunked1 = chunk(arr, 1);
      const chunked2 = chunk(arr, 2);
      const chunked3 = chunk(arr, 3);
      const chunked4 = chunk(arr, 4);
      const chunked5 = chunk(arr, 5);

      expect(chunkedEmpty).toEqual([]);
      expect(chunkedDefault).toEqual([[1], [2], [3], [4]]);
      expect(chunkedNone).toEqual([]);

      expect(chunked0).toEqual(arr);
      expect(chunked1).toEqual([[1], [2], [3], [4]]);
      expect(chunked2).toEqual([
        [1, 2],
        [3, 4],
      ]);
      expect(chunked3).toEqual([[1, 2, 3], [4]]);
      expect(chunked4).toEqual([[1, 2, 3, 4]]);
      expect(chunked5).toEqual([[1, 2, 3, 4]]);
    });

    it('handles subscribeActives and subscribing to events by .on || .add', async () => {
      tdStreamer.on('ACTIVES_NASDAQ', (data) => {
        console.log(
          data.requests[0].parameters,
          data.requests[1].parameters,
          data.requests[2].parameters,
        );

        expect(mockRequestId(data));
      });

      tdStreamer.add('ACTIVES_NYSE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.on('ACTIVES_OPTIONS', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeActives();

      // expect(spy).toHaveBeenCalledWith(true);
    });

    it('handles setQualityOfService(qoslevel)', async () => {
      tdStreamer.on('QOS', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.setQualityOfService(10);

      tdStreamer.setQualityOfService();

      tdStreamer.setQualityOfService(0);
    });

    // it('handles setQualityOfService default', async () => {
    //   tdStreamer.on('QOS', (data) => {
    //     expect(mockRequestId(data));
    //   });

    //   tdStreamer.setQualityOfService();
    // });

    // it('handles setQualityOfService', async () => {
    //   tdStreamer.on('QOS', (data) => {
    //     expect(mockRequestId(data));
    //   });

    //   tdStreamer.setQualityOfService(10);
    // });

    it('handles subscribeAccountActivity', async () => {
      tdStreamer.on('ACCT_ACTIVITY', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeAccountActivity();
    });

    it('handles subscribeNewsHeadlines(symbol)', async () => {
      tdStreamer.on('NEWS_HEADLINE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeNewsHeadlines('TEST');
    });

    it('handles subscribeNewsHeadlines *ALL*', async () => {
      tdStreamer.on('NEWS_HEADLINE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeNewsHeadlines();
    });

    it('handles subscribeQuotes(symbol)', async () => {
      tdStreamer.on('QUOTE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeQuotes('TEST');
    });

    it('handles subscribeCharts(symbol)', async () => {
      tdStreamer.on('CHART_SNAPSHOT', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.on('CHART_UPDATE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.on('CHART_EQUITY', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeCharts('TEST');
    });

    it('handles getChartHistoryAndSubscribeQuotes(symbol)', async () => {
      tdStreamer.on('QUOTE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.on('CHART_SNAPSHOT', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.getChartHistoryAndSubscribeQuotes('TEST');
    });

    it('handles subscribeOptions(symbol)', async () => {
      tdStreamer.on('OPTION', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeOptions('TEST');
    });

    it('handles subscribeTimeAndSales(symbol)', async () => {
      tdStreamer.on('TIMESALE_EQUITY_UPDATE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeTimeAndSales('TEST');
    });

    it('handles subscribeTimeSalesFutures(symbol)', async () => {
      tdStreamer.on('TIMESALE_FUTURES_UPDATE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeTimeSalesFutures('TEST');
    });

    it('handles subscribeFutures(symbol)', async () => {
      tdStreamer.on('CHART_SNAPSHOT', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.on('CHART_UPDATE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.on('TIMESALE_FUTURES_UPDATE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.on('LEVELONE_FUTURES_UPDATE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeFutures('TEST');
    });

    it('handles subscribeFuturesOptions(symbol)', async () => {
      tdStreamer.on('TIMESALE_FUTURES_UPDATE', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeFuturesOptions('TEST');
    });

    it('handles subscribeListedBook(symbol)', async () => {
      tdStreamer.on('LISTED_BOOK', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeListedBook('TEST');
    });

    it('handles subscribeNasdaqBook(symbol)', async () => {
      tdStreamer.on('NASDAQ_BOOK', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeNasdaqBook('TEST');
    });

    it('handles subscribeOptionsBook(symbol)', async () => {
      tdStreamer.on('OPTIONS_BOOK', (data) => {
        expect(mockRequestId(data));
      });

      tdStreamer.subscribeOptionsBook('TEST');
    });
  });
});
