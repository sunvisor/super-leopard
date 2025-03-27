// noinspection JSUnusedGlobalSymbols

/**
 * AlignFields Story
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import AlignFields from "./AlignFields";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '@/__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof AlignFields>

const meta: Meta<typeof AlignFields> = {
  component: AlignFields,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    align: 'left',
    valign: 'middle'
  }
};

export default meta;
