// noinspection JSUnusedGlobalSymbols

/**
 * DirectionButtons Story
 *
 * Created by sunvisor on 2024/02/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import DirectionButtons from "./DirectionButtons";
import { Meta, StoryObj } from '@storybook/react';
import { DirectionType } from '@sunvisor/super-leopard-core';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof DirectionButtons>

const meta: Meta<typeof DirectionButtons> = {
  component: DirectionButtons,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const DirectionHorizontal: Story = {
  args: {
    name: 'direction',
    value: DirectionType.HORIZONTAL,
  }
};

export const DirectionVertical: Story = {
  args: {
    name: 'direction',
    value: DirectionType.VERTICAL,
  }
}

export default meta;
