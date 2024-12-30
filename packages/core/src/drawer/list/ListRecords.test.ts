/**
 * Test for ListRecords
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ListRecords } from "./ListRecords";

describe('Tests for ListRecords', () => {

  test('each method should call callback for each page', () => {
    // Arrange
    const records = Array.from(
      { length: 25 }, (_, i) => ({ id: i + 1, name: `name${i + 1}` })
    );
    const count = 10;
    const callback = vi.fn();
    // Act
    const listRecords = new ListRecords(records);
    listRecords.each(count, callback);
    // Assert
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, records.slice(0, 10), 1);
    expect(callback).toHaveBeenNthCalledWith(2, records.slice(10, 20), 2);
    expect(callback).toHaveBeenNthCalledWith(3, records.slice(20, 25), 3);
  });

  test('get method should return specified page records', () => {
    // Arrange
    const records = Array.from(
      { length: 25 }, (_, i) => ({ id: i + 1, name: `name${i + 1}` })
    );
    const count = 10;
    // Act
    const listRecords = new ListRecords(records);
    const result = listRecords.get(count, 1);
    // Assert
    expect(result).toEqual(records.slice(0, count));
  });
});
