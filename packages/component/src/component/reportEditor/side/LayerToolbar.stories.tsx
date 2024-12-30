// noinspection JSUnusedGlobalSymbols

/**
 * LayerToolbar Story
 *
 * Created by sunvisor on 2024/03/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import LayerToolbar from "./LayerToolbar";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof LayerToolbar>

const meta: Meta<typeof LayerToolbar> = {
  component: LayerToolbar,
  args: {
    onAddLayer: fn(),
  }
};

export const Normal: Story = {
  args: {}
};

export default meta;
