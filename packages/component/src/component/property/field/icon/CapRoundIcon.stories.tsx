// noinspection JSUnusedGlobalSymbols

/**
 * CapRoundIcon Story
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import CapRoundIcon from "./CapRoundIcon";
import { Meta, StoryObj } from '@storybook/react';
import { iconDecorator } from '@/__test_assets__';

type Story = StoryObj<typeof CapRoundIcon>

const meta: Meta<typeof CapRoundIcon> = {
  component: CapRoundIcon,
  decorators: [iconDecorator],
};

export const Normal: Story = {
  args: {}
};

export default meta;
