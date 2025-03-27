// noinspection JSUnusedGlobalSymbols

/**
 * PageUnitField Story
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PageUnitField from "./PageUnitField";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '@/__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof PageUnitField>

const meta: Meta<typeof PageUnitField> = {
  component: PageUnitField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    label: '単位',
    name: 'unit',
    value: 'in'
  }
};

export default meta;
