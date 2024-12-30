/**
 * Test for SettingsAtom
 *
 * Created by sunvisor on 2024/02/09.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { SettingsAtom, UpdateSettingsAtom } from "./SettingsAtom";
import { renderHook, act } from '@testing-library/react';
import { useAtomValue, useSetAtom } from 'jotai';

describe('Tests for SettingsAtom', () => {

  const getSettings = () => {
    const { result } = renderHook(
      () => useAtomValue(SettingsAtom)
    );
    return result.current;
  };

  test('Updates a part of the settings using UpdateSettingsAtom', () => {
    // Arrange
    const { result } = renderHook(
      () => useSetAtom(UpdateSettingsAtom)
    );
    // Act
    act(() => {
      result.current({ boundingBox: { handleSize: 10 } });
    });
    // Assert
    const newSettings = getSettings();
    expect(newSettings.boundingBox.handleSize).toBe(10);
  });
});
