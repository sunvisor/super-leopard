// noinspection JSUnusedGlobalSymbols

/**
 * JoinBevelIcon Story
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import JoinBevelIcon from "./JoinBevelIcon";
import { Meta, StoryObj } from '@storybook/react';
import { iconDecorator } from '../../../../__test_assets__';

type Story = StoryObj<typeof JoinBevelIcon>

const meta: Meta<typeof JoinBevelIcon> = {
  component: JoinBevelIcon,
  decorators: [iconDecorator],
};

export const Normal: Story = {
  args: {}
};

export default meta;
