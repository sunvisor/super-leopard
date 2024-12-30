// noinspection JSUnusedGlobalSymbols

/**
 * DefaultStyle Story
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import DefaultStyle from "./DefaultStyle";
import { Meta, StoryObj } from '@storybook/react';
import { fontList} from '../../../__test_assets__';

type Story = StoryObj<typeof DefaultStyle>

const meta: Meta<typeof DefaultStyle> = {
  component: DefaultStyle,
};

export const Line: Story = {
  args: {
    mode: 'line'
  }
};

export const Text: Story = {
  args: {
    mode: 'text',
    fontList,
  }
}

export const Field: Story = {
  args: {
    mode: 'field',
    fontList,
  }
}

export const Rect: Story = {
  args: {
    mode: 'rect'
  }
}

export default meta;
