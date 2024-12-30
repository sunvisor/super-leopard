// noinspection JSUnusedGlobalSymbols

/**
 * ZOrderTool Story
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ZOrderTool from "./ZOrderTool";
import { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof ZOrderTool>

const meta: Meta<typeof ZOrderTool> = {
  component: ZOrderTool,
};

export const Normal: Story = {
  args: {}
};

export default meta;
