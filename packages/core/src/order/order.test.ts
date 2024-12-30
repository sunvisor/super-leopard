/**
 * Test for Order
 *
 * Created by sunvisor on 2024/01/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { sendToBack, bringToForward, sendToBackward, bringToFront } from "./order";

describe('Tests for order', () => {
  const target = { id: 'target' };

  describe('Tests for bringToFront', () => {
    const items = [target, { id: 'item1' }, { id: 'item2' }, { id: 'item3' }];

    test('Bring target to front (end of array)', () => {
      // Act
      const result = bringToFront(target, items);
      // Assert
      expect(result).toEqual([{ id: 'item1' }, { id: 'item2' }, { id: 'item3' }, target]);
    });

    test('Original array should not be changed', () => {
      // Act
      bringToFront(target, items);
      // Assert
      expect(items).toEqual([target, { id: 'item1' }, { id: 'item2' }, { id: 'item3' }]);
    });

  });

  describe('Tests for sendToBack', () => {
    const items = [{ id: 'item1' }, { id: 'item2' }, { id: 'item3' }, target];

    test('Bring target to back (start of array)', () => {
      // Act
      const result = sendToBack(target, items);
      // Assert
      expect(result).toEqual([target, { id: 'item1' }, { id: 'item2' }, { id: 'item3' }]);
    });

    test('Original array should not be changed', () => {
      // Act
      sendToBack(target, items);
      // Assert
      expect(items).toEqual([{ id: 'item1' }, { id: 'item2' }, { id: 'item3' }, target]);
    });

  });

  describe('Tests for bringToForward', () => {
    const items = [{ id: 'item1' }, target, { id: 'item2' }, { id: 'item3' }];

    test('Bring target to forward (next of target)', () => {
      // Act
      const result = bringToForward(target, items);
      // Assert
      expect(result).toEqual([{ id: 'item1' }, { id: 'item2' }, target, { id: 'item3' }]);
    });

    test('Original array should not be changed', () => {
      // Act
      bringToForward(target, items);
      // Assert
      expect(items).toEqual([{ id: 'item1' }, target, { id: 'item2' }, { id: 'item3' }]);
    });
  });

  describe('Tests for sendToBackward', () => {
    const items = [{ id: 'item1' }, target, { id: 'item2' }, { id: 'item3' }];

    test('Send target to backward (previous of target)', () => {
      // Act
      const result = sendToBackward(target, items);
      // Assert
      expect(result).toEqual([target, { id: 'item1' }, { id: 'item2' }, { id: 'item3' }]);
    });

    test('Original array should not be changed', () => {
      // Act
      sendToBackward(target, items);
      // Assert
      expect(items).toEqual([{ id: 'item1' }, target, { id: 'item2' }, { id: 'item3' }]);
    });

  });

});
