// noinspection JSUnusedGlobalSymbols

/**
 * DistributeVerticallyIcon Story
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import DistributeVerticallyIcon from "./DistributeVerticallyIcon";
import { Meta, StoryObj } from '@storybook/react';
import { iconDecorator } from '@/__test_assets__';

type Story = StoryObj<typeof DistributeVerticallyIcon>

const meta: Meta<typeof DistributeVerticallyIcon> = {
  component: DistributeVerticallyIcon,
  decorators: [iconDecorator],
};

export const Normal: Story = {
  args: {}
};

export default meta;
