// noinspection JSUnusedGlobalSymbols

/**
 * ShapeTypeField Story
 *
 * Created by sunvisor on 2024/02/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ShapeTypeField from "./ShapeTypeField";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '@/__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof ShapeTypeField>

const meta: Meta<typeof ShapeTypeField> = {
  component: ShapeTypeField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    value: 'text',
  }
};

export default meta;
