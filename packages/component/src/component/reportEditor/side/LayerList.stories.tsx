// noinspection JSUnusedGlobalSymbols

/**
 * LayerList Story
 *
 * Created by sunvisor on 2024/03/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import LayerList from "./LayerList";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof LayerList>

const meta: Meta<typeof LayerList> = {
  component: LayerList,
  args: {
    onChangeActiveLayer: fn(),
    onChangeOrder: fn(),
    onRemoveLayer: fn(),
    onRenameLayer: fn(),
  }
};

export const Normal: Story = {
  args: {
    layers: [
      { name: 'Layer 1', shapes: [], },
      { name: 'Layer 2', shapes: [], },
      { name: 'Layer 3', shapes: [], },
    ],
    activeLayerIndex: 0,
  }
};

export default meta;
