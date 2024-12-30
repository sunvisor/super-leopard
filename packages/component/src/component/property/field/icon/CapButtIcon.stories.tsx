// noinspection JSUnusedGlobalSymbols

/**
 * ButtIcon Story
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import CapButtIcon from "./CapButtIcon";
import { Meta, StoryObj } from '@storybook/react';
import { iconDecorator } from '../../../../__test_assets__';

type Story = StoryObj<typeof CapButtIcon>

const meta: Meta<typeof CapButtIcon> = {
  component: CapButtIcon,
  decorators: [iconDecorator],
};

export const Normal: Story = {
  args: {}
};

export default meta;
