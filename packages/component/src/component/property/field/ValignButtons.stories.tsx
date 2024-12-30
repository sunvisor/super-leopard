// noinspection JSUnusedGlobalSymbols

/**
 * ValignButtons Story
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ValignButtons from "./ValignButtons";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof ValignButtons>

const meta: Meta<typeof ValignButtons> = {
  component: ValignButtons,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Top: Story = {
  args: {
    name: 'valign',
    value: 'top',
  }
};

export const Middle: Story = {
  args: {
    name: 'valign',
    value: 'middle',
  }
}

export const Bottom: Story = {
  args: {
    name: 'valign',
    value: 'bottom',
  }
}

export default meta;
