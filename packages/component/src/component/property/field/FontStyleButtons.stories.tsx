// noinspection JSUnusedGlobalSymbols

/**
 * FontStyleButtons Story
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import FontStyleButtons from "./FontStyleButtons";
import { Meta, StoryObj } from '@storybook/react';
import { FontStyleType } from '@sunvisor/super-leopard-core';
import { fieldDecorator } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof FontStyleButtons>

const meta: Meta<typeof FontStyleButtons> = {
  component: FontStyleButtons,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
  }
};

export const Normal: Story = {
  args: {
    enabledStyles: ['bold', 'italic', 'underline', 'strike'],
  }
};

export const Bold: Story = {
  args: {
    enabledStyles: ['bold', 'italic', 'underline', 'strike'],
    value: [FontStyleType.BOLD]
  }
}

export const Italic: Story = {
  args: {
    enabledStyles: ['bold', 'italic', 'underline', 'strike'],
    value: [FontStyleType.ITALIC]
  }
}

export const Underline: Story = {
  args: {
    enabledStyles: ['bold', 'italic', 'underline', 'strike'],
    value: [FontStyleType.UNDERLINE]
  }
}

export const Strike: Story = {
  args: {
    enabledStyles: ['bold', 'italic', 'underline', 'strike'],
    value: [FontStyleType.STRIKE]
  }
}

export const All: Story = {
  args: {
    enabledStyles: ['bold', 'italic', 'underline', 'strike'],
    value: [FontStyleType.BOLD, FontStyleType.ITALIC, FontStyleType.UNDERLINE, FontStyleType.STRIKE]
  }
}

export const Disabled: Story = {
  args: {
    enabledStyles: [],
  }
}

export default meta;
