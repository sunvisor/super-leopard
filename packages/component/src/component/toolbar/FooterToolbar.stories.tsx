// noinspection JSUnusedGlobalSymbols

/**
 * FooterToolbar Story
 *
 * Created by sunvisor on 2024/02/02.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import FooterToolbar, { FooterToolbarProps } from "./FooterToolbar";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof FooterToolbar>

const meta: Meta<typeof FooterToolbar> = {
  component: FooterToolbar,
  args: {
    onChange: fn(),
  }
};

export const Normal: Story = {
  render: (args: FooterToolbarProps) => (
    <FooterToolbar {...args} />
  ),
  args: {}
};

export default meta;
