// noinspection JSUnusedGlobalSymbols

/**
 * CapButtons Story
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import CapButtons from "./CapButtons";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '@/__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof CapButtons>

const meta: Meta<typeof CapButtons> = {
  component: CapButtons,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Butt: Story = {
  args: {
    name: 'cap',
    value: 'butt'
  }
};

export const Round: Story = {
  args: {
    name: 'cap',
    value: 'round'
  }
};

export const Square: Story = {
  args: {
    name: 'cap',
    value: 'square'
  }
};

export default meta;
