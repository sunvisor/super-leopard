// noinspection JSUnusedGlobalSymbols

/**
 * NumberField Story
 *
 * Created by sunvisor on 2024/02/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { fieldDecorator } from "../../../__test_assets__";
import NumberField from "./NumberField";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof NumberField>

const meta: Meta<typeof NumberField> = {
  component: NumberField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    value: 0,
    name: 'size',
    label: "Size"
  }
};

export const Unit: Story = {
  args: {
    name: 'width',
    label: "Width",
    unit: "mm"
  }
}

export const MinMaxValue: Story = {
  args: {
    name: 'width',
    label: "Width",
    unit: "mm",
    minValue: 10,
    maxValue: 200,
  }
}

export const DecimalPlace: Story = {
  args: {
    name: 'width',
    label: "Width",
    unit: "mm",
    decimalPlace: 2
  }
}

export const Integer: Story = {
  args: {
    name: 'width',
    label: "Width",
    unit: "mm",
    decimalPlace: 0
  }
}

export default meta;
