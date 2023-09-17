/**
 * @author Allen Sarkisyan
 * @copyright 2019 - 2023 XT-TX
 * @license MIT Open Source License
 */

const {
  parseOrderEntryMessage,
  parseOrderFillMessage,
  parseCancelMessage,
} = require('../dist/cjs/td-notifications.js');

const {
  INVALID_ORDER_FILL_XML,
  BASE_ORDER_NOTIFICATION_RESPONSE,
  CANCEL_ORDER_NOTIFICATION,
  ORDER_FILL_NOTIFICATION,
} = require('./helpers.js');

describe('TDAmeritrade Notification Utils', () => {
  describe('parseCancelMessage', () => {
    it('should handle parsing cancel notifications', async () => {
      const message = {
        timestamp: CANCEL_ORDER_NOTIFICATION.timestamp,
        type: CANCEL_ORDER_NOTIFICATION.content[0]['2'],
        data: CANCEL_ORDER_NOTIFICATION.content[0]['3'],
      };

      const result = parseCancelMessage(message)

      expect(result).toEqual({
        ...BASE_ORDER_NOTIFICATION_RESPONSE,
        type: 'UROUT',
        cancelledQuantity: '10',
        orderDestination: 'BEST'
      });
    });

    it('should return empty if invalid', async () => {
      const result = parseCancelMessage('');
      expect(result).toEqual(null);
    });

    it('should return null if notification is invalid', async () => {
      const result = parseCancelMessage({
        data: INVALID_ORDER_FILL_XML
      });

      console.log(result)

      expect(result).toEqual(null);
    });
  });

  describe('parseOrderEntryMessage', () => {
    it('should handle parsing cancel notifications', async () => {
      const message = {
        timestamp: ORDER_FILL_NOTIFICATION.timestamp,
        type: ORDER_FILL_NOTIFICATION.content[0]['2'],
        data: ORDER_FILL_NOTIFICATION.content[0]['3'],
      };

      const result = parseOrderEntryMessage(message)

      expect(result).toEqual({
        ...BASE_ORDER_NOTIFICATION_RESPONSE,
        type: 'OrderFill'
      });
    });

    it('should return empty if invalid', async () => {
      const result = parseOrderEntryMessage('');
      expect(result).toEqual(null);
    });

    it('should return null if notification is invalid', async () => {
      const result = parseOrderEntryMessage({
        data: INVALID_ORDER_FILL_XML
      });

      console.log(result)

      expect(result).toEqual(null);
    });
  });

  describe('parseOrderFillMessage', () => {
    it('should handle parsing OrderFill notifications', async () => {
      const message = {
        timestamp: ORDER_FILL_NOTIFICATION.timestamp,
        type: ORDER_FILL_NOTIFICATION.content[0]['2'],
        data: ORDER_FILL_NOTIFICATION.content[0]['3'],
      };

      const result = parseOrderFillMessage(message)

      expect(result).toEqual({
        ...BASE_ORDER_NOTIFICATION_RESPONSE,
        type: 'OrderFill',
        broker: 'TDA',
        brokerId: '123',
        executionPrice: '14.20',
        executionType: 'DIRECT',
      });
    });

    it('should return empty if invalid', async () => {
      const result = parseOrderFillMessage('');
      expect(result).toEqual(null);
    });

    it('should return null if notification is invalid', async () => {
      const result = parseOrderFillMessage({
        data: INVALID_ORDER_FILL_XML
      });

      console.log(result)

      expect(result).toEqual(null);
    });
  });
});