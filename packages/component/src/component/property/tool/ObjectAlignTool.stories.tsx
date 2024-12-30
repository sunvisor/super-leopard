// noinspection JSUnusedGlobalSymbols

/**
 * ObjectAlignTool Story
 *
 * Created by sunvisor on 2024/02/26.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ObjectAlignTool from "./ObjectAlignTool";
import { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof ObjectAlignTool>

const meta: Meta<typeof ObjectAlignTool> = {
  component: ObjectAlignTool,
};

export const Normal: Story = {
  args: {}
};

export default meta;
