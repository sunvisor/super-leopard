/**
 * Test for ExpandEllipse
 *
 * Created by sunvisor on 2024/02/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { expandEllipse } from "./expandEllipse";
import { createEllipse } from '../creator';
import { EllipseShape } from '../object';

describe('Test for expandEllipse', () => {

  test('Should expand Ellipse to EllipsePropertyValue', () => {
    // Arrange
    const ellipse = createEllipse({
      type: EllipseShape,
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      fillColor: '#FF0000',
      border: {
        color: '#00FF00',
        width: 2,
        cap: 'round',
        join: 'bevel',
      },
    });
    // Act
    const expandedEllipse = expandEllipse(ellipse);
    // Assert
    expect(expandedEllipse).toEqual({
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      useFillColor: true,
      fillColor: '#FF0000',
      useStroke: true,
      borderColor: '#00FF00',
      borderWidth: 2,
      borderStyle: 'solid',
      borderCap: 'round',
      borderJoin: 'bevel',
    });
  });

});
