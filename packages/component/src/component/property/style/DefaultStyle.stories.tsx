// noinspection JSUnusedGlobalSymbols

/**
 * DefaultStyle Story
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import DefaultStyle from "./DefaultStyle";
import { Meta, StoryObj } from '@storybook/react';
import { testFontList} from '../../../__test_assets__';

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
    fontList: testFontList,
  }
}

export const Field: Story = {
  args: {
    mode: 'field',
    fontList: testFontList,
  }
}

export const Rect: Story = {
  args: {
    mode: 'rect'
  }
}

export default meta;
