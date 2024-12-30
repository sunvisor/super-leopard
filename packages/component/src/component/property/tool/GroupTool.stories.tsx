// noinspection JSUnusedGlobalSymbols

/**
 * GroupTool Story
 *
 * Created by sunvisor on 2024/02/26.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import GroupTool from "./GroupTool";
import { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof GroupTool>

const meta: Meta<typeof GroupTool> = {
  component: GroupTool,
};

export const Normal: Story = {
  args: {}
};

export default meta;
