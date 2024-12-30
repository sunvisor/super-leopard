// noinspection JSUnusedGlobalSymbols

/**
 * CapSquareIcon Story
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import CapSquareIcon from "./CapSquareIcon";
import { Meta, StoryObj } from '@storybook/react';
import { iconDecorator } from '../../../../__test_assets__';

type Story = StoryObj<typeof CapSquareIcon>

const meta: Meta<typeof CapSquareIcon> = {
  component: CapSquareIcon,
  decorators: [iconDecorator],
};

export const Normal: Story = {
  args: {}
};

export default meta;
