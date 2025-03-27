/**
 * Test for SvgJsDriver
 *
 * Created by sunvisor on 2025/02/12.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Shape, Svg } from '@svgdotjs/svg.js';
import { SvgJsDrawer, SvgJsDriver } from "./SvgJsDriver";
import { StrokeOptions } from './SvgDriverInterface';


describe('Tests for SvgJsDriver', () => {

  it('should create SvgJsDrawer', () => {
    const drawer = SvgJsDriver.createDrawer();
    expect(drawer).toBeInstanceOf(SvgJsDrawer);
  });

});


describe('Tests for SvgJsDrawer', () => {

  const mockShape = {
    move: vi.fn().mockReturnThis(),
    stroke: vi.fn().mockReturnThis(),
    fill: vi.fn().mockReturnThis(),
    attr: vi.fn().mockReturnThis(),
    font: vi.fn().mockReturnThis(),
    opacity: vi.fn().mockReturnThis(),
    size: vi.fn().mockReturnThis(),
    bbox: vi.fn().mockReturnValue({
      height: 10,
      width: 10,
    }),
  } as unknown as Shape

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Tests for circle', () => {

    const mockSvg = {
      circle: vi.fn().mockReturnValue(mockShape)
    } as unknown as Svg

    it('should create circle', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      // Act
      drawer.circle({ x: 10, y: 20, diameter: 10 });
      // Assert
      expect(mockSvg.circle).toHaveBeenCalledWith(10);
      expect(mockShape.move).toHaveBeenCalledWith(10, 20);
    });

    it('should set stroke when stroke is set', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const stroke: StrokeOptions = {
        style: 'solid',
        width: 1,
        color: '#ff0000',
        cap: 'butt',
        join: 'miter'
      }
      // Act
      drawer.circle({ x: 10, y: 20, diameter: 10, stroke, fillColor: '#0000ff' });
      // Assert
      expect(mockShape.stroke).toHaveBeenCalledWith({
        color: '#ff0000',
        width: 1,
        linecap: 'butt',
        linejoin: 'miter',
        opacity: 1,
      });
    });

    it('should set fill when fillColor is set', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const stroke: StrokeOptions = {
        style: 'solid',
        width: 1,
        color: '#ff0000',
        cap: 'butt',
        join: 'miter'
      }
      // Act
      drawer.circle({ x: 10, y: 20, diameter: 10, stroke, fillColor: '#0000ff' });
      // Assert
      expect(mockShape.fill).toHaveBeenCalledWith({
        color: '#0000ff',
        opacity: 1,
      });

    });

    it('should set opacity when opacity is set', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const stroke: StrokeOptions = {
        style: 'solid',
        width: 1,
        color: '#ff0000',
        cap: 'butt',
        join: 'miter'
      }
      // Act
      drawer.circle({ x: 10, y: 20, diameter: 10, stroke, fillColor: '#0000ff', opacity: 0.5 });
      // Assert
      expect(mockShape.stroke).toHaveBeenCalledWith({
        color: '#ff0000',
        width: 1,
        linecap: 'butt',
        linejoin: 'miter',
        opacity: 0.5,
      });
      expect(mockShape.fill).toHaveBeenCalledWith({
        color: '#0000ff',
        opacity: 0.5,
      });
    });

    it('should set stroke-dasharray when style is dashed', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const stroke: StrokeOptions = {
        style: 'dashed',
        width: 1,
        color: '#ff0000',
        cap: 'butt',
        join: 'miter'
      }
      // Act
      drawer.circle({ x: 10, y: 20, diameter: 10, stroke, fillColor: '#0000ff' });
      // Assert
      expect(mockShape.attr).toHaveBeenCalledWith({ 'stroke-dasharray': '4' });
    });

    it('should set stroke-dasharray when style is dotted', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const stroke: StrokeOptions = {
        style: 'dotted',
        width: 1,
        color: '#ff0000',
        cap: 'butt',
        join: 'miter'
      }
      // Act
      drawer.circle({ x: 10, y: 20, diameter: 10, stroke, fillColor: '#0000ff' });
      // Assert
      expect(mockShape.attr).toHaveBeenCalledWith({ 'stroke-dasharray': '1 2' });
    });

  });

  describe('Tests for ellipse', () => {

    const mockSvg = {
      ellipse: vi.fn().mockReturnValue(mockShape)
    } as unknown as Svg

    it('should create ellipse', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      // Act
      drawer.ellipse({ x: 10, y: 20, width: 30, height: 40 });
      // Assert
      expect(mockSvg.ellipse).toHaveBeenCalledWith(30, 40);
      expect(mockShape.move).toHaveBeenCalledWith(10, 20);
    });

    it('should set stroke when stroke is set', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const stroke: StrokeOptions = {
        style: 'solid',
        width: 1,
        color: '#ff0000',
        cap: 'butt',
        join: 'miter'
      }
      // Act
      drawer.ellipse({ x: 10, y: 20, width: 30, height: 40, stroke, fillColor: '#0000ff' });
      // Assert
      expect(mockShape.stroke).toHaveBeenCalledWith({
        color: '#ff0000',
        width: 1,
        linecap: 'butt',
        linejoin: 'miter',
        opacity: 1,
      });
    });

    it('should set fill when fillColor is set', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const stroke: StrokeOptions = {
        style: 'solid',
        width: 1,
        color: '#ff0000',
        cap: 'butt',
        join: 'miter'
      }
      // Act
      drawer.ellipse({ x: 10, y: 20, width: 30, height: 40, stroke, fillColor: '#0000ff' });
      // Assert
      expect(mockShape.fill).toHaveBeenCalledWith({
        color: '#0000ff',
        opacity: 1,
      });
    });

  });

  describe('Tests for rect', () => {

    const mockSvg = {
      rect: vi.fn().mockReturnValue(mockShape)
    } as unknown as Svg

    it('should create rect', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      // Act
      drawer.rect({ x: 10, y: 20, width: 30, height: 40 });
      // Assert
      expect(mockSvg.rect).toHaveBeenCalledWith(30, 40);
      expect(mockShape.move).toHaveBeenCalledWith(10, 20);
    });

    it('should set stroke when stroke is set', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const stroke: StrokeOptions = {
        style: 'solid',
        width: 1,
        color: '#ff0000',
        cap: 'butt',
        join: 'miter'
      }
      // Act
      drawer.rect({ x: 10, y: 20, width: 30, height: 40, stroke, fillColor: '#0000ff' });
      // Assert
      expect(mockShape.stroke).toHaveBeenCalledWith({
        color: '#ff0000',
        width: 1,
        linecap: 'butt',
        linejoin: 'miter',
        opacity: 1,
      });
    });

    it('should set fill when fillColor is set', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const stroke: StrokeOptions = {
        style: 'solid',
        width: 1,
        color: '#ff0000',
        cap: 'butt',
        join: 'miter'
      }
      // Act
      drawer.rect({ x: 10, y: 20, width: 30, height: 40, stroke, fillColor: '#0000ff' });
      // Assert
      expect(mockShape.fill).toHaveBeenCalledWith({
        color: '#0000ff',
        opacity: 1,
      });
    });

  });

  describe('Tests for line', () => {

    const mockSvg = {
      line: vi.fn().mockReturnValue(mockShape)
    } as unknown as Svg;

    it('should create line', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      // Act
      drawer.line({ x1: 10, y1: 20, x2: 30, y2: 40 });
      // Assert
      expect(mockSvg.line).toHaveBeenCalledWith(10, 20, 30, 40);
    });

    it('should set stroke when stroke is set', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const stroke: StrokeOptions = {
        style: 'solid',
        width: 1,
        color: '#ff0000',
        cap: 'butt',
        join: 'miter'
      }
      // Act
      drawer.line({ x1: 10, y1: 20, x2: 30, y2: 40, stroke });
      // Assert
      expect(mockShape.stroke).toHaveBeenCalledWith({
        color: '#ff0000',
        width: 1,
        linecap: 'butt',
        linejoin: 'miter',
        opacity: 1,
      });
    });

  });

  describe('Tests for text', () => {

    const mockSvg = {
      text: vi.fn().mockReturnValue(mockShape)
    } as unknown as Svg;

    it('should create text', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const font = {
        family: 'Arial',
        size: 12,
        weight: 'normal',
        style: 'normal'
      }
      // Act
      drawer.text({ x: 10, y: 20, text: 'Hello', font, fillColor: '#0000ff' });
      // Assert
      expect(mockSvg.text).toHaveBeenCalledWith('Hello');
      expect(mockShape.move).toHaveBeenCalledWith(10, 21); // (12 - 10) / 2
      expect(mockShape.fill).toHaveBeenCalledWith('#0000ff');
      expect(mockShape.opacity).toHaveBeenCalledWith(1);
    });

    it('should set letterSpacing when letterSpacing is set', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const font = {
        family: 'Arial',
        size: 12,
        weight: 'normal',
        style: 'normal'
      }
      // Act
      drawer.text({
        x: 10, y: 20, text: 'Hello', font, fillColor: '#0000ff', letterSpacing: 2
      });
      // Assert
      expect(mockShape.attr).toHaveBeenCalledWith('letter-spacing', 2);
    });

    it('should set textDecoration when textDecoration is set', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      const font = {
        family: 'Arial',
        size: 12,
        weight: 'normal',
        style: 'normal'
      }
      // Act
      drawer.text({ x: 10, y: 20, text: 'Hello', font, fillColor: '#0000ff', textDecoration: 'underline' });
      // Assert
      expect(mockShape.attr).toHaveBeenCalledWith('text-decoration', 'underline');
    });

  });

  describe('Tests for image', () => {

    const mockSvg = {
      image: vi.fn().mockReturnValue(mockShape)
    } as unknown as Svg;

    it('should create image', () => {
      // Arrange
      const drawer = new SvgJsDrawer(mockSvg)
      // Act
      drawer.image({ src: 'test.png', x: 10, y: 20, width: 30, height: 40 });
      // Assert
      expect(mockSvg.image).toHaveBeenCalledWith('test.png');
      expect(mockShape.move).toHaveBeenCalledWith(10, 20);
      expect(mockShape.size).toHaveBeenCalledWith(30, 40);
      expect(mockShape.opacity).toHaveBeenCalledWith(1);
    });

  });

});
