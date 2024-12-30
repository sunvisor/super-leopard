// noinspection JSUnusedGlobalSymbols

/**
 * SvTextField Story
 *
 * Created by sunvisor on 2024/02/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import SvTextField from "./SvTextField";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof SvTextField>

const meta: Meta<typeof SvTextField> = {
  component: SvTextField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    name: 'fieldName'
  }
};

export default meta;
