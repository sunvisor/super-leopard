// noinspection JSUnusedGlobalSymbols

/**
 * BarcodeRotateField Story
 *
 * Created by sunvisor on 2025/02/16.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import BarcodeRotateField from "./BarcodeRotateField";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';
import getCaptions from '../../../captions/getCaptions';

type Story = StoryObj<typeof BarcodeRotateField>

const meta: Meta<typeof BarcodeRotateField> = {
  component: BarcodeRotateField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    label: 'Rotate',
    name: 'rotate',
    value: 'N',
    rotateTypeList: getCaptions('barcodeRotateName'),
  }
};

export default meta;
