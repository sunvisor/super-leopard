/**
 * Test for useKeyboard
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import useKeyboard from "./useKeyboard";
import { fireEvent, renderHook } from '@testing-library/react';

describe('Tests for useKeyboard', () => {

  const listeners = {
    onCopy: vi.fn(),
    onCut: vi.fn(),
    onPaste: vi.fn(),
    onRemove: vi.fn(),
    onUndo: vi.fn(),
    onRedo: vi.fn(),
  }

  describe('Case of not macOS', () => {

    it('should call onCut when ctrl + x is pressed', () => {
      // Arrange
      renderHook(() => useKeyboard(listeners));
      // Act
      fireEvent.keyDown(document, { key: 'x', ctrlKey: true });
      // Assert
      expect(listeners.onCut).toBeCalled();
    });

    it('should call onCopy when ctrl + c is pressed', () => {
      // Arrange
      renderHook(() => useKeyboard(listeners));
      // Act
      fireEvent.keyDown(document, { key: 'c', ctrlKey: true });
      // Assert
      expect(listeners.onCopy).toBeCalled();
    });

    it('should call onPaste when ctrl + v is pressed', () => {
      // Arrange
      renderHook(() => useKeyboard(listeners));
      // Act
      fireEvent.keyDown(document, { key: 'v', ctrlKey: true });
      // Assert
      expect(listeners.onPaste).toBeCalled();
    });

    it('should call onRemove when Delete is pressed', () => {
      // Arrange
      renderHook(() => useKeyboard(listeners));
      // Act
      fireEvent.keyDown(document, { key: 'Delete' });
      // Assert
      expect(listeners.onRemove).toBeCalled();
    });

    it('should call onUndo when ctrl + z is pressed', () => {
      // Arrange
      renderHook(() => useKeyboard(listeners));
      // Act
      fireEvent.keyDown(document, { key: 'z', ctrlKey: true });
      // Assert
      expect(listeners.onUndo).toBeCalled();
    });

    it('should call onRedo when ctrl + shift + z is pressed', () => {
      // Arrange
      renderHook(() => useKeyboard(listeners));
      // Act
      fireEvent.keyDown(document, { key: 'z', ctrlKey: true, shiftKey: true });
      // Assert
      expect(listeners.onRedo).toBeCalled();
    });

  });

  describe('Case of macOS', () => {

    it('should call onCut when cmd + x is pressed', () => {
      // Arrange
      renderHook(() => useKeyboard(listeners, true));
      // Act
      fireEvent.keyDown(document, { key: 'x', metaKey: true });
      // Assert
      expect(listeners.onCut).toBeCalled();
    });

    it('should call onCopy when cmd + c is pressed', () => {
      // Arrange
      renderHook(() => useKeyboard(listeners, true));
      // Act
      fireEvent.keyDown(document, { key: 'c', metaKey: true });
      // Assert
      expect(listeners.onCopy).toBeCalled();
    });

    it('should call onPaste when cmd + v is pressed', () => {
      // Arrange
      renderHook(() => useKeyboard(listeners, true));
      // Act
      fireEvent.keyDown(document, { key: 'v', metaKey: true });
      // Assert
      expect(listeners.onPaste).toBeCalled();
    });

    it('should call onUndo when cmd + z is pressed', () => {
      // Arrange
      renderHook(() => useKeyboard(listeners, true));
      // Act
      fireEvent.keyDown(document, { key: 'z', metaKey: true });
      // Assert
      expect(listeners.onUndo).toBeCalled();
    });

    it('should call onRedo when cmd + shift + z is pressed', () => {
      // Arrange
      renderHook(() => useKeyboard(listeners, true));
      // Act
      fireEvent.keyDown(document, { key: 'z', metaKey: true, shiftKey: true });
      // Assert
      expect(listeners.onRedo).toBeCalled();
    });

  });
});
