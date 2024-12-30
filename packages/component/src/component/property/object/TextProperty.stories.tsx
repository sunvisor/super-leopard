// noinspection JSUnusedGlobalSymbols

/**
 * TextProperty Story
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import TextProperty from "./TextProperty";
import { Meta, StoryObj } from "@storybook/react";
import { createText, UnitType } from '@sunvisor/super-leopard-core';
import { fontList } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof TextProperty>;

const meta: Meta<typeof TextProperty> = {
  component: TextProperty,
  args: {
    onUpdate: fn(),
  }
};

const text = createText({
  type: "text",
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  text: "Text",
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
});

export const UnitMillimeter: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    shape: text,
    fontList,
  },
};

export const UnitInch: Story = {
  args: {
    unit: UnitType.INCH,
    shape: text,
    fontList,
  },
};

export default meta;
