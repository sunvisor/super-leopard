// noinspection JSUnusedGlobalSymbols

/**
 * BorderStyle Story
 *
 * Created by sunvisor on 2024/02/14.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import BorderStyleField from "./BorderStyleField";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '@/__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof BorderStyleField>

const meta: Meta<typeof BorderStyleField> = {
  component: BorderStyleField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    label: "Border Style",
    name: "borderStyle",
    value: "solid",
  }
};

export default meta;
