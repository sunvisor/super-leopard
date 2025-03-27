// noinspection JSUnusedGlobalSymbols

/**
 * SendBackwardIcon Story
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import SendBackwardIcon from "./SendBackwardIcon";
import { Meta, StoryObj } from '@storybook/react';
import { iconDecorator } from '@/__test_assets__';

type Story = StoryObj<typeof SendBackwardIcon>

const meta: Meta<typeof SendBackwardIcon> = {
  component: SendBackwardIcon,
  decorators: [iconDecorator],
};

export const Normal: Story = {
  args: {}
};

export default meta;
