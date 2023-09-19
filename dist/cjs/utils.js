'use strict';
/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.isPut =
  exports.isCall =
  exports.isSPY =
  exports.parseListedBook =
  exports.parseActivesMessage =
  exports.transformData =
  exports.transformMessageData =
  exports.chunk =
  exports.getKeys =
  exports.jsonToQueryString =
  exports.randomID =
    void 0;
const td_constants_js_1 = require('./td-constants.js');
const BID_FIELD_KEYS = Object.keys(td_constants_js_1.FIELDS.BID_FIELDS);
const BID_FIELD_VALUES = Object.values(td_constants_js_1.FIELDS.BID_FIELDS);
const ASK_FIELD_KEYS = Object.keys(td_constants_js_1.FIELDS.ASK_FIELDS);
const ASK_FIELD_VALUES = Object.values(td_constants_js_1.FIELDS.ASK_FIELDS);
const ORDER_BOOK_EXCHANGE_KEYS = Object.keys(
  td_constants_js_1.FIELDS.ORDER_BOOK_EXCHANGE_FIELDS,
);
const ORDER_BOOK_EXCHANGE_VALUES = Object.values(
  td_constants_js_1.FIELDS.ORDER_BOOK_EXCHANGE_FIELDS,
);
const randomID = () => Math.floor(Math.random() * 2_000_000_000);
exports.randomID = randomID;
const jsonToQueryString = (json) => {
  const queryParams = [];
  for (const [k, v] of Object.entries(json)) {
    queryParams.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  }
  return queryParams.join('&');
};
exports.jsonToQueryString = jsonToQueryString;
const getKeys = (symbol) => {
  if (Array.isArray(symbol) && symbol.length > 0) {
    return symbol.join(', ');
  }
  return symbol;
};
exports.getKeys = getKeys;
const chunk = (arr = [], size = 1) => {
  if (arr?.length === 0 || size < 1) {
    return arr;
  }
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
};
exports.chunk = chunk;
const transformMessageData = (data, fieldKeys, fieldValues) => {
  return data.map((msg) => {
    const keys = Object.keys(msg);
    const vals = Object.values(msg);
    return keys
      .map((key) => {
        const idx = fieldValues.indexOf(Number(key));
        const idxVal = fieldKeys[idx];
        return idxVal || key;
      })
      .reduce((a, b, index) => ({ ...a, [b]: vals[index] }), {});
  });
};
exports.transformMessageData = transformMessageData;
const transformData = (data, fields) => {
  const fieldKeys = Object.keys(fields);
  const fieldValues = Object.values(fields);
  return (0, exports.transformMessageData)(
    data.content,
    fieldKeys,
    fieldValues,
  );
};
exports.transformData = transformData;
const parseActivesMessage = (msg) => {
  const msgData = msg.content[0][1].split(';');
  const actives = (0, exports.chunk)(
    msgData.slice(5).map((i) => i.split(':').slice(3))[1],
    3,
  ).map(([symbol, volume, percentChange]) => ({
    symbol,
    volume,
    percentChange,
  }));
  return actives;
};
exports.parseActivesMessage = parseActivesMessage;
const parseListedBook = (data) => {
  try {
    const book = (0, exports.transformData)(
      data,
      td_constants_js_1.FIELDS.LISTED_BOOK,
    );
    for (const priceLevel of book) {
      priceLevel.bids = (0, exports.transformMessageData)(
        priceLevel.bids,
        BID_FIELD_KEYS,
        BID_FIELD_VALUES,
      );
      priceLevel.asks = (0, exports.transformMessageData)(
        priceLevel.asks,
        ASK_FIELD_KEYS,
        ASK_FIELD_VALUES,
      );
      for (const bid of priceLevel.bids) {
        bid.bids = (0, exports.transformMessageData)(
          bid.bids,
          ORDER_BOOK_EXCHANGE_KEYS,
          ORDER_BOOK_EXCHANGE_VALUES,
        );
      }
      for (const ask of priceLevel.asks) {
        ask.asks = (0, exports.transformMessageData)(
          ask.asks,
          ORDER_BOOK_EXCHANGE_KEYS,
          ORDER_BOOK_EXCHANGE_VALUES,
        );
      }
    }
    return book;
  } catch (e) {
    return null;
  }
};
exports.parseListedBook = parseListedBook;
const isSPY = (description) => /SPY/gim.test(description);
exports.isSPY = isSPY;
const isCall = (description) => /Call/gim.test(description);
exports.isCall = isCall;
const isPut = (description) => /Put/gim.test(description);
exports.isPut = isPut;
