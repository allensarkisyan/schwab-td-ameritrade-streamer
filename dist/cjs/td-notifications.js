'use strict';
/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.parseCancelMessage =
  exports.parseOrderFillMessage =
  exports.parseOrderEntryMessage =
    void 0;
const xml_js_1 = require('xml-js');
const getElementText = (elements, key, field = 'text') => {
  try {
    if (!elements?.length) {
      return null;
    }
    const text = elements?.find(({ name }) => name === key)?.elements[0][field];
    return text;
  } catch (e) {
    return null;
  }
};
const parseOrderData = (data = []) => {
  try {
    const { elements } = data.find((i) => i.name === 'Order');
    const security = elements?.find(({ name }) => name === 'Security');
    const orderType = getElementText(elements, 'OrderType');
    const orderKey = getElementText(elements, 'OrderKey');
    const orderPricing = getElementText(elements, 'OrderPricing', 'name');
    const orderDuration = getElementText(elements, 'OrderDuration');
    const orderEnteredDateTime = getElementText(
      elements,
      'OrderEnteredDateTime',
    );
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
    return null;
  }
};
const parseMessage = ({ timestamp, type, data }) => {
  try {
    const xml = (0, xml_js_1.xml2js)(data);
    const xmlData = xml.elements[0].elements;
    const activityTimestamp = getElementText(xmlData, 'ActivityTimestamp');
    const orderData = parseOrderData(xmlData);
    return {
      xmlData,
      response: {
        timestamp,
        type,
        activityTimestamp,
        ...orderData,
      },
    };
  } catch (e) {
    console.log('parseMessage Error', e?.message);
    return { xmlData: null, response: null };
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
exports.parseOrderEntryMessage = parseOrderEntryMessage;
const parseOrderFillMessage = (msg) => {
  try {
    const { xmlData, response } = parseMessage(msg);
    if (!xmlData) {
      return null;
    }
    const execution = xmlData.find(
      (i) => i.name === 'ExecutionInformation',
    )?.elements;
    const contraInformation = xmlData.find(
      (i) => i.name === 'ContraInformation',
    )?.elements[0]?.elements;
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
    return null;
  }
};
exports.parseOrderFillMessage = parseOrderFillMessage;
const parseCancelMessage = (msg) => {
  try {
    const { xmlData, response } = parseMessage(msg);
    if (!xmlData) {
      return null;
    }
    const cancelledQuantity = getElementText(xmlData, 'CancelledQuantity');
    const orderDestination = getElementText(xmlData, 'OrderDestination');
    return {
      ...response,
      cancelledQuantity,
      orderDestination,
    };
  } catch (e) {
    return null;
  }
};
exports.parseCancelMessage = parseCancelMessage;
