// noinspection JSUnusedGlobalSymbols

/**
 * LockToggle Story
 *
 * Created by sunvisor on 2025/03/30.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import LockToggle from "./LockToggle";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof LockToggle>

const meta: Meta<typeof LockToggle> = {
  component: LockToggle,
  args: {
    onChange: fn(),
  }
};

export const Unlocked: Story = {
  args: {
    locked: false
  }
};

export const Locked: Story = {
  args: {
    locked: true
  }
}

export default meta;
