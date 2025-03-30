// noinspection JSUnusedGlobalSymbols

/**
 * DrawToolbar Story
 *
 * Created by sunvisor on 2024/02/11.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import DrawToolbar, { DrawToolbarProps } from "./DrawToolbar";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof DrawToolbar>

const meta: Meta<typeof DrawToolbar> = {
  component: DrawToolbar,
  render: (args: DrawToolbarProps) => (
    <div style={{ width: '100%', height: '100%' }}>
      <DrawToolbar {...args} />
    </div>
  ),
  args: {
    onChange: fn(),
    onChangeLocked: fn(),
  }
};

export const Edit: Story = {
  args: {
    mode: "edit",
  }
};

export const Draw: Story = {
  args: {
    mode: "rect",
  }
};

export default meta;
