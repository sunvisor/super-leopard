// noinspection JSUnusedGlobalSymbols

/**
 * SvCheckboxField Story
 *
 * Created by sunvisor on 2024/02/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import SvCheckboxField from "./SvCheckboxField";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof SvCheckboxField>

const meta: Meta<typeof SvCheckboxField> = {
  component: SvCheckboxField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Unchecked: Story = {
  args: {
    name: 'check',
    label: 'Check',
    value: false
  }
};

export const Checked: Story = {
  args: {
    name: 'check',
    label: 'Check',
    value: true
  }
};

export default meta;
