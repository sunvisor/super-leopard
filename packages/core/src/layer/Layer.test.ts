/**
 * Test for Layer
 *
 * Created by sunvisor on 2024/03/04.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { addLayer, removeLayer, updateLayer, updateLayerName, updateLayerShapes } from "./Layer";
import { createShapes } from '../creator';
import { LayerData } from '../data';
import { shapeTestData, shapeTestData2 } from '../__test_assets__';


describe('Tests for Layer', () => {

  describe('Test for updateLayerShapes', () => {

    test('Should return the new instance with updated shapes', () => {
      // Arrange
      const layer: LayerData = {
        name: 'test',
        shapes: shapeTestData2,
      }
      const shapes = createShapes(shapeTestData);
      // Act
      const result = updateLayerShapes(layer, shapes);
      // Assert
      expect(layer.shapes).toEqual(shapeTestData2);
      expect(result.shapes).toEqual(shapeTestData);
    });

  });

  describe('Test for updateLayerName', () => {

    test('Should return new instance with updated name', () => {
      // Arrange
      const layer: LayerData = {
        name: 'test',
        shapes: [],
      }
      // Act
      const result = updateLayerName(layer, 'test2');
      // Assert
      expect(layer.name).toEqual('test');
      expect(result.name).toEqual('test2');
    });

  });

  describe('Test for updateLayer', () => {

    test('Should return new instance with updated layer', () => {
      // Arrange
      const layers: LayerData[] = [{
        name: 'test1',
        shapes: [],
      }, {
        name: 'test2',
        shapes: [],
      }];
      const layer = {
        name: 'new',
        shapes: shapeTestData,
      }
      // Act
      const result = updateLayer(layers, 1, layer);
      // Assert
      expect(layers[1]).toEqual({
        name: 'test2',
        shapes: [],
      });
      expect(result[1].name).toEqual('new');
      expect(result[1].shapes).toEqual(shapeTestData);
    });

  });

  describe('Test for addLayer', () => {

    test('Should return new instance with added layer', () => {
      // Arrange
      const layers: LayerData[] = [
        {
          name: 'test1',
          shapes: [],
        },
      ];
      const layer = {
        name: 'new',
        shapes: shapeTestData,
      }
      // Act
      const result = addLayer(layers, layer);
      // Assert
      expect(layers.length).toBe(1);
      expect(result.length).toBe(2);
      expect(result[1].name).toEqual('new');
      expect(result[1].shapes).toEqual(shapeTestData);
    });
  });

  describe('Test for removeLayer', () => {

    test('Should return new instance with removed layer', () => {
      // Arrange
      const layers: LayerData[] = [
        {
          name: 'test1',
          shapes: [],
        },
        {
          name: 'test2',
          shapes: [],
        },
      ];
      // Act
      const result = removeLayer(layers, 1);
      // Assert
      expect(layers.length).toBe(2);
      expect(result.length).toBe(1);
      expect(result[0].name).toEqual('test1');
    });

  });

});
