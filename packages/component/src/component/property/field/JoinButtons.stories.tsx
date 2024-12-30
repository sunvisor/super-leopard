// noinspection JSUnusedGlobalSymbols

/**
 * JoinButtons Story
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import JoinButtons, { JoinButtonsProps } from "./JoinButtons";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof JoinButtons>

const meta: Meta<typeof JoinButtons> = {
  component: JoinButtons,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Miter: Story = {
  render: (args: JoinButtonsProps) => (
    <JoinButtons {...args} />
  ),
  args: {
    name: 'join',
    value: 'miter',
  }
};

export const Round: Story = {
  render: (args: JoinButtonsProps) => (
    <JoinButtons {...args} />
  ),
  args: {
    name: 'join',
    value: 'round',
  }
}

export const Bevel: Story = {
  render: (args: JoinButtonsProps) => (
    <JoinButtons {...args} />
  ),
  args: {
    name: 'join',
    value: 'bevel',
  }
}

export default meta;
