// noinspection JSUnusedGlobalSymbols

/**
 * AlignButtons Story
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import AlignButtons from "./AlignButtons";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof AlignButtons>

const meta: Meta<typeof AlignButtons> = {
  component: AlignButtons,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  },
};

export const Normal: Story = {
  args: {
    name: 'align'
  }
};

export default meta;
