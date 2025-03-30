// noinspection JSUnusedGlobalSymbols

/**
 * FieldProperty Story
 *
 * Created by sunvisor on 2024/02/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import FieldProperty from "./FieldProperty";
import { Meta, StoryObj } from "@storybook/react";
import { createField, Field } from "@sunvisor/super-leopard-core";
import { testFontList, testImageOptions } from '@/__test_assets__';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof FieldProperty>;

const meta: Meta<typeof FieldProperty> = {
  component: FieldProperty,
  args: {
    onUpdate: fn(),
  }
};

const textField: Field = createField({
  type: "field",
  name: "MyTextField",
  shape: {
    type: "text",
    x: 10,
    y: 20,
    width: 30,
    height: 40,
    font: {
      family: "Helvetica",
      size: 12,
      style: "bold",
    },
    color: "#000000",
    fillColor: undefined,
    align: "left",
    valign: "middle",
    multiLine: true,
    linePitch: 7,
    fitCell: false,
  },
});

const circleField: Field = createField({
  type: "field",
  name: "MyCircleField",
  shape: {
    type: "circle",
    x: 1,
    y: 2,
    diameter: 3,
    fillColor: undefined,
    border: {
      style: "solid",
      width: 1,
      color: "#000000",
      cap: "butt",
      join: "miter",
    },
  },
});

const ellipseField: Field = createField({
  type: "field",
  name: "MyEllipseField",
  shape: {
    type: "ellipse",
    x: 1,
    y: 2,
    width: 3,
    height: 4,
    fillColor: undefined,
    border: {
      style: "solid",
      width: 1,
      color: "#000000",
      cap: "butt",
      join: "miter",
    },
  },
});

const imageField: Field = createField({
  type: "field",
  name: "MyImageField",
  shape: {
    type: "image",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    src: '',
  },
});

const lineField: Field = createField({
  type: "field",
  name: "MyLineField",
  shape: {
    type: "line",
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    border: {
      style: "solid",
      width: 1,
      color: "#000000",
      cap: "butt",
      join: "miter",
    },
  },
});

const rectField: Field = createField({
  type: "field",
  name: "MyRectField",
  shape: {
    type: "rect",
    x: 1,
    y: 2,
    width: 3,
    height: 4,
    fillColor: undefined,
    border: {
      style: "solid",
      width: 1,
      color: "#000000",
      cap: "butt",
      join: "miter",
    },
  },
});

const barcodeField: Field = createField({
  type: "field",
  name: "MyBarcodeField",
  shape: {
    type: "barcode",
    x: 1,
    y: 2,
    width: 3,
    height: 4,
    format: "qr",
    value: "https://www.sunvisor.net",
  },
})

export const TextField: Story = {
  args: {
    shape: textField,
    fontList: testFontList,
    imageOptions: testImageOptions,
  },
};

export const CircleField: Story = {
  args: {
    shape: circleField,
    fontList: testFontList,
    imageOptions: testImageOptions,
  },
};

export const EllipseField: Story = {
  args: {
    shape: ellipseField,
    fontList: testFontList,
    imageOptions: testImageOptions,
  },
};

export const ImageField: Story = {
  args: {
    shape: imageField,
    fontList: testFontList,
    imageOptions: testImageOptions,
  },
};

export const LineField: Story = {
  args: {
    shape: lineField,
    fontList: testFontList,
    imageOptions: testImageOptions,
  },
};

export const RectField: Story = {
  args: {
    shape: rectField,
    fontList: testFontList,
    imageOptions: testImageOptions,
  },
};

export const BarcodeField: Story = {
  args: {
    shape: barcodeField,
    fontList: testFontList,
    imageOptions: testImageOptions,
  },
};

export default meta;
