/**
 * Test for Boxes
 *
 * Created by sunvisor on 2024/01/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { boxIsInTheBox, mergeBoxes, moveBoxes, positionIsInTheBox, resizeBoxes } from "./boxes";
import { Box, Position } from '../../value';
import { Boxable } from '../shape';

function createBoxable(box: Box) {
  return {
    bbox: box,
    moveTo: vi.fn(),
    resize: vi.fn(),
    inTheBox: vi.fn(),
    hitTest: vi.fn(),
  }
}

describe('Tests for boxes', () => {
  const box1: Box = { x: 0, y: 0, width: 10, height: 10 };
  const box2: Box = { x: 5, y: 5, width: 10, height: 10 };
  const box3: Box = { x: 15, y: 15, width: 10, height: 10 };
  const items: Boxable[] = [
    createBoxable(box1),
    createBoxable(box2),
    createBoxable(box3),
  ];

  describe('Tests for mergeBoxes', () => {

    test('Should return box that contains all boxes when passed multiple boxes', () => {
      // Act
      const result = mergeBoxes(items);
      // Assert
      expect(result).toEqual({ x: 0, y: 0, width: 25, height: 25 });
    });

    test('Should return same box when passed one box', () => {
      // Arrange
      const box1: Box = { x: 0, y: 0, width: 10, height: 10 };
      const items: Boxable[] = [
        createBoxable(box1),
      ];
      // Act
      const result = mergeBoxes(items);
      // Assert
      expect(result).toEqual({ x: 0, y: 0, width: 10, height: 10 });
    });

  });

  describe('Test for moveBoxes', () => {

    test('Should move all boxes when passed multiple boxes', () => {
      // Arrange
      const pos: Position = { x: 10, y: 10 };
      // Act
      moveBoxes(pos, items);
      // Assert
      expect(items[0].moveTo).toHaveBeenCalledWith({ x: 10, y: 10 });
      expect(items[1].moveTo).toHaveBeenCalledWith({ x: 15, y: 15 });
      expect(items[2].moveTo).toHaveBeenCalledWith({ x: 25, y: 25 });
    });

  });

  describe('Tests for resizeBoxes', () => {

    test('Should resize all boxes when passed multiple boxes', () => {
      // Arrange
      const newBox: Box = { x: 0, y: 0, width: 100, height: 100 };
      // Act
      resizeBoxes(newBox, items);
      // Assert
      expect(items[0].resize).toHaveBeenCalledWith({ x: 0, y: 0, width: 40, height: 40 });
      expect(items[1].resize).toHaveBeenCalledWith({ x: 20, y: 20, width: 40, height: 40 });
      expect(items[2].resize).toHaveBeenCalledWith({ x: 60, y: 60, width: 40, height: 40 });
    });

    test('y-coordinate should be specified coordinate when height is 0', () => {
      // Arrange
      const newBox: Box = { x: 0, y: 10, width: 100, height: 0 };
      // Act
      resizeBoxes(newBox, items);
      // Assert
      expect(items[0].resize).toHaveBeenCalledWith({ x: 0, y: 10, width: 40, height: 0 });
      expect(items[1].resize).toHaveBeenCalledWith({ x: 20, y: 10, width: 40, height: 0 });
      expect(items[2].resize).toHaveBeenCalledWith({ x: 60, y: 10, width: 40, height: 0 });
    });

    test('x-coordinate should be specified coordinate when width is 0', () => {
      // Arrange
      const newBox: Box = { x: 0, y: 0, width: 0, height: 100 };
      // Act
      resizeBoxes(newBox, items);
      // Assert
      expect(items[0].resize).toHaveBeenCalledWith({ x: 0, y: 0, width: 0, height: 40 });
      expect(items[1].resize).toHaveBeenCalledWith({ x: 0, y: 20, width: 0, height: 40 });
      expect(items[2].resize).toHaveBeenCalledWith({ x: 0, y: 60, width: 0, height: 40 });
    });

    test('Should resize correctly when original height is 0', () => {
      // Arrange
      const box1: Box = { x: 0, y: 0, width: 10, height: 0 };
      const items: Boxable[] = [
        createBoxable(box1),
      ];
      const newBox: Box = { x: 0, y: 0, width: 100, height: 100 };
      // Act
      resizeBoxes(newBox, items);
      expect(items[0].resize).toHaveBeenCalledWith({ x: 0, y: 0, width: 100, height: 100 });
    });

    test('Should resize correctly when original width is 0', () => {
      // Arrange
      const box1: Box = { x: 0, y: 0, width: 0, height: 10 };
      const items: Boxable[] = [
        createBoxable(box1),
      ];
      const newBox: Box = { x: 0, y: 0, width: 100, height: 100 };
      // Act
      resizeBoxes(newBox, items);
      expect(items[0].resize).toHaveBeenCalledWith({ x: 0, y: 0, width: 100, height: 100 });
    });

  });

  describe('Tests for boxIsInTheBox', () => {

    test('Should return true when box1 is in box2', () => {
      // Arrange
      const box1: Box = { x: 10, y: 10, width: 20, height: 20 };
      const box2: Box = { x: 0, y: 0, width: 100, height: 100 };
      // Act
      const result = boxIsInTheBox(box1, box2);
      // Assert
      expect(result).toBeTruthy();
    });

    test('Should return false when box1 is not in box2', () => {
      // Arrange
      const box1: Box = { x: 0, y: 0, width: 100, height: 100 };
      const box2: Box = { x: 110, y: 110, width: 20, height: 20 };
      // Act
      const result = boxIsInTheBox(box1, box2);
      // Assert
      expect(result).toBeFalsy();
    });

    test('Should return false when box1 is slightly overlapping the right side of box2', () => {
      // Arrange
      const box1: Box = { x: 50, y: 50, width: 100, height: 100 };
      const box2: Box = { x: 0, y: 0, width: 100, height: 100 };
      // Act
      const result = boxIsInTheBox(box1, box2);
      // Assert
      expect(result).toBeFalsy();
    });

    test('Should return false when box1 is slightly overlapping the left side of box2', () => {
      // Arrange
      const box1: Box = { x: 0, y: 0, width: 100, height: 100 };
      const box2: Box = { x: 50, y: 50, width: 100, height: 100 };
      // Act
      const result = boxIsInTheBox(box1, box2);
      // Assert
      expect(result).toBeFalsy();
    });

  });

  describe('Tests for positionIsInTheBox', () => {

    test('Should return true when pos is in box', () => {
      // Arrange
      const pos: Position = { x: 10, y: 10 };
      const box: Box = { x: 0, y: 0, width: 100, height: 100 };
      // Act
      const result = positionIsInTheBox(pos, box);
      // Assert
      expect(result).toBeTruthy();
    });

    test('Should return false when pos is not in box', () => {
      // Arrange
      const pos: Position = { x: 0, y: 0 };
      const box: Box = { x: 10, y: 10, width: 100, height: 100 };
      // Act
      const result = positionIsInTheBox(pos, box);
      // Assert
      expect(result).toBeFalsy();
    });

  });

});
