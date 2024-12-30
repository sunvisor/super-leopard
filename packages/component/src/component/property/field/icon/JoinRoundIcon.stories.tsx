// noinspection JSUnusedGlobalSymbols

/**
 * JoinRoundIcon Story
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import JoinRoundIcon from "./JoinRoundIcon";
import { Meta, StoryObj } from '@storybook/react';
import { iconDecorator } from '../../../../__test_assets__';

type Story = StoryObj<typeof JoinRoundIcon>

const meta: Meta<typeof JoinRoundIcon> = {
  component: JoinRoundIcon,
  decorators: [iconDecorator],
};

export const Normal: Story = {
  args: {}
};

export default meta;
