/**
 * Test for UsePropertyStates
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { renderHook, act } from '@testing-library/react';
import usePropertyStates from './usePropertyStates';

describe('Tests for usePropertyStates', () => {
  const onUpdate = vi.fn();

  test('Initial values are set', () => {
    // Arrange
    const { result } = renderHook(() => usePropertyStates({ name: 'John', age: 30 }, onUpdate));
    // Assert
    expect(result.current.values).toEqual({ name: 'John', age: 30 });
  });

  test('Set all properties', () => {
    const onUpdate = vi.fn();
    // Arrange
    const { result } = renderHook(() => usePropertyStates({ name: 'John', age: 30 }, onUpdate));
    // Act
    act(() => {
      result.current.setValues({ name: 'Jane', age: 31 });
    });
    // Assert
    expect(result.current.values).toEqual({ name: 'Jane', age: 31 });
  });

  test('Handle property change events', () => {
    // Arrange
    const { result } = renderHook(() => usePropertyStates({ name: 'John', age: 30 }, onUpdate));
    // Act
    act(() => {
      result.current.handleChangeValue('age', 31);
    });
    // Assert
    expect(result.current.values).toEqual({ name: 'John', age: 31 });
  });

  test('Call onUpdate when update is true', () => {
    // Arrange
    const { result } = renderHook(() => usePropertyStates({ name: 'John', age: 30 }, onUpdate));
    // Act
    act(() => {
      result.current.handleChangeValue('age', 31, true);
    });
    // Assert
    expect(result.current.values).toEqual({ name: 'John', age: 31 });
    expect(onUpdate).toHaveBeenCalledWith({ name: 'John', age: 31 });
  });
});

