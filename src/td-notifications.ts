/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */

import { xml2js } from 'xml-js';

import type {
  TDAmeritradeActivityMessage
} from 'tdameritradestreamer';

const getElementText = (elements: any[] | null, key: string, field: string = 'text') => {
  try {
    if (!elements || !elements?.length) { return null; }

    const text = elements?.find(({ name }) => (name === key))?.elements[0][field];

    return text;
  } catch (e) {
    console.log(e);
    return null;
  }
}

const parseOrderData = (data: any[] = []) => {
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
}

const parseMessage = ({ timestamp, type, data }) : { xmlData: null|any[], response: any } => {
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
    console.log('parseMessage Error', e)
    return { xmlData: null, response: null };
  }
};

export const parseOrderEntryMessage = (msg: TDAmeritradeActivityMessage) => {
  try {
    const { response } = parseMessage(msg);
    return response;
  } catch (e) {
    return null;
  }
};

export const parseOrderFillMessage = (msg: TDAmeritradeActivityMessage) => {
  try {
    const { xmlData, response } = parseMessage(msg);

    if (!xmlData) { return; }

    const execution = xmlData.find(i => i.name === 'ExecutionInformation')?.elements;
    const contraInformation = xmlData.find(i => i.name === 'ContraInformation')?.elements[0]?.elements;
    
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

export const parseCancelMessage = (msg: TDAmeritradeActivityMessage) => {
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