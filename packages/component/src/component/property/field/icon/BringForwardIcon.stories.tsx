// noinspection JSUnusedGlobalSymbols

/**
 * BringForwardIcon Story
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import BringForwardIcon from "./BringForwardIcon";
import { Meta, StoryObj } from '@storybook/react';
import { iconDecorator } from '@/__test_assets__';

type Story = StoryObj<typeof BringForwardIcon>

const meta: Meta<typeof BringForwardIcon> = {
  component: BringForwardIcon,
  decorators: [iconDecorator],
};

export const Normal: Story = {
  args: {}
};

export default meta;
