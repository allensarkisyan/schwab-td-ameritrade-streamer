/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */
import { FIELDS } from './td-constants.js';
const BID_FIELD_KEYS = Object.keys(FIELDS.BID_FIELDS);
const BID_FIELD_VALUES = Object.values(FIELDS.BID_FIELDS);
const ASK_FIELD_KEYS = Object.keys(FIELDS.ASK_FIELDS);
const ASK_FIELD_VALUES = Object.values(FIELDS.ASK_FIELDS);
const ORDER_BOOK_EXCHANGE_KEYS = Object.keys(FIELDS.ORDER_BOOK_EXCHANGE_FIELDS);
const ORDER_BOOK_EXCHANGE_VALUES = Object.values(
  FIELDS.ORDER_BOOK_EXCHANGE_FIELDS,
);
export const randomID = () => Math.floor(Math.random() * 2_000_000_000);
export const jsonToQueryString = (json) => {
  const queryParams = [];
  for (const [k, v] of Object.entries(json)) {
    queryParams.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  }
  return queryParams.join('&');
};
export const getKeys = (symbol) => {
  if (Array.isArray(symbol) && symbol.length > 0) {
    return symbol.join(', ');
  }
  return symbol;
};
export const chunk = (arr = [], size = 1) => {
  if (arr?.length === 0 || size < 1) {
    return arr;
  }
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
};
export const transformMessageData = (data, fieldKeys, fieldValues) => {
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
export const transformData = (data, fields) => {
  const fieldKeys = Object.keys(fields);
  const fieldValues = Object.values(fields);
  return transformMessageData(data.content, fieldKeys, fieldValues);
};
export const parseActivesMessage = (msg) => {
  const msgData = msg.content[0][1].split(';');
  const actives = chunk(
    msgData.slice(5).map((i) => i.split(':').slice(3))[1],
    3,
  ).map(([symbol, volume, percentChange]) => ({
    symbol,
    volume,
    percentChange,
  }));
  return actives;
};
export const parseListedBook = (data) => {
  try {
    const book = transformData(data, FIELDS.LISTED_BOOK);
    for (const priceLevel of book) {
      priceLevel.bids = transformMessageData(
        priceLevel.bids,
        BID_FIELD_KEYS,
        BID_FIELD_VALUES,
      );
      priceLevel.asks = transformMessageData(
        priceLevel.asks,
        ASK_FIELD_KEYS,
        ASK_FIELD_VALUES,
      );
      for (const bid of priceLevel.bids) {
        bid.bids = transformMessageData(
          bid.bids,
          ORDER_BOOK_EXCHANGE_KEYS,
          ORDER_BOOK_EXCHANGE_VALUES,
        );
      }
      for (const ask of priceLevel.asks) {
        ask.asks = transformMessageData(
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
export const isSPY = (description) => /SPY/gim.test(description);
export const isCall = (description) => /Call/gim.test(description);
export const isPut = (description) => /Put/gim.test(description);
