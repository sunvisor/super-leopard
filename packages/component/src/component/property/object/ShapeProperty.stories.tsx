// noinspection JSUnusedGlobalSymbols

/**
 * ShapeProperty Story
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ShapeProperty from "./ShapeProperty";
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import {
  Circle,
  createCircle,
  createEllipse,
  createField,
  createGroup,
  createImage,
  createLine,
  createList,
  createRect,
  createText,
  DirectionType,
  Ellipse,
  Field,
  Image,
  Line,
  Rect, Shape, Shapes,
  UnitType
} from '@sunvisor/super-leopard-core';
import { testAssets, testFontList, testImageOptions } from '../../../__test_assets__';
import { Provider } from 'jotai';
import { createStore } from 'jotai/index';
import { SelectionAtom } from '../../../atom/SelectionAtom';

const { fieldTestData, shapeTestData } = testAssets;

type Story = StoryObj<typeof ShapeProperty>

const meta: Meta<typeof ShapeProperty> = {
  component: ShapeProperty,
};

const circle: Circle = createCircle({
  type: 'circle',
  x: 1,
  y: 2,
  diameter: 3,
  fillColor: undefined,
  border: {
    style: 'solid',
    width: 1,
    color: '#000000',
    cap: 'butt',
    join: 'miter',
  }
});

const ellipse: Ellipse = createEllipse({
  type: 'ellipse',
  x: 1,
  y: 2,
  width: 3,
  height: 4,
  fillColor: undefined,
  border: {
    style: 'solid',
    width: 1,
    color: '#000000',
    cap: 'butt',
    join: 'miter',
  }
});

const textField: Field = createField({
  type: 'field',
  name: '氏名',
  shape: {
    type: 'text',
    x: 10,
    y: 20,
    width: 30,
    height: 40,
    font: {
      family: 'NotoSansJP',
      size: 12,
      style: 'bold',
    },
    color: '#000000',
    fillColor: undefined,
    align: 'left',
    valign: 'middle',
    multiLine: true,
    linePitch: 7,
    fitCell: false,
  }
});

const group = createGroup({
  type: 'group',
  width: 100,
  height: 100,
  repeatCount: 1,
  direction: 'horizontal',
  shapes: shapeTestData,
});

const image: Image= createImage( {
  type: 'image',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  src: '',
});

const line: Line = createLine({
  type: 'line',
  x1: 1,
  y1: 2,
  x2: 3,
  y2: 4,
  border: {
    style: 'solid',
    width: 1,
    color: '#000000',
    cap: 'butt',
    join: 'miter',
  }
});

const list = createList({
  type: 'list',
  width: 100,
  height: 100,
  direction: DirectionType.HORIZONTAL,
  rows: 10,
  columns: 2,
  shapes: fieldTestData,
});

const rect: Rect = createRect({
  type: 'rect',
  x: 1,
  y: 2,
  width: 3,
  height: 4,
  fillColor: undefined,
  border: {
    style: 'solid',
    width: 1,
    color: '#000000',
    cap: 'butt',
    join: 'miter',
  }
});

const text = createText({
  type: 'text',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  text: 'Text',
  font: {
    family: 'NotoSansJP',
    size: 12,
    style: 'bold',
  },
  color: '#000000',
  fillColor: undefined,
  align: 'left',
  valign: 'middle',
  multiLine: true,
  linePitch: 7,
  fitCell: false,
});

const store = createStore();

const getDecorator = (shape: Shape) =>
  (Story: StoryFn) => {
    const selection: Shapes = new Shapes([shape]);
    store.set(SelectionAtom, selection);
    return (
      <Provider store={store}>
        <div data-testid="test">
          <Story/>
        </div>
      </Provider>
    )
  }

export const CircleProperty: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: circle,
  },
  decorators: [getDecorator(circle)]
};

export const EllipseProperty: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: ellipse,
  },
  decorators: [getDecorator(ellipse)]
}

export const FieldProperty: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: textField,
    fontList: testFontList,
  },
  decorators: [getDecorator(textField)]
}

export const GroupProperty: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: group,
  },
  decorators: [getDecorator(group)]
}

export const ImageProperty: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: image,
    imageOptions: testImageOptions,
  },
  decorators: [getDecorator(image)]
}

export const LineProperty: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: line,
  },
  decorators: [getDecorator(line)]
}

export const ListProperty: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: list,
  },
  decorators: [getDecorator(list)]
}

export const RectProperty: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: rect,
  },
  decorators: [getDecorator(rect)]
}

export const TextProperty: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: text,
    fontList: testFontList,
  },
  decorators: [getDecorator(text)]
}

export default meta;
