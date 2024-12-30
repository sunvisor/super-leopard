// noinspection JSUnusedGlobalSymbols

/**
 * PaperSizeField Story
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PaperSizeField from "./PaperSizeField";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof PaperSizeField>

const meta: Meta<typeof PaperSizeField> = {
  component: PaperSizeField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    value: 'A4',
  }
};

export default meta;
