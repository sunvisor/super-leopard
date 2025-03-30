// noinspection JSUnusedGlobalSymbols

/**
 * DistributeHorizontallyIcon Story
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import DistributeHorizontallyIcon from "./DistributeHorizontallyIcon";
import { Meta, StoryObj } from '@storybook/react';
import { iconDecorator } from '@/__test_assets__';

type Story = StoryObj<typeof DistributeHorizontallyIcon>

const meta: Meta<typeof DistributeHorizontallyIcon> = {
  component: DistributeHorizontallyIcon,
  decorators: [iconDecorator],
};

export const Normal: Story = {
  args: {}
};

export default meta;
