// noinspection JSUnusedGlobalSymbols

/**
 * BringFrontIcon Story
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import BringFrontIcon from "./BringFrontIcon";
import { Meta, StoryObj } from '@storybook/react';
import { iconDecorator } from '../../../../__test_assets__';

type Story = StoryObj<typeof BringFrontIcon>

const meta: Meta<typeof BringFrontIcon> = {
  component: BringFrontIcon,
  decorators: [iconDecorator],
};

export const Normal: Story = {
  args: {}
};

export default meta;
