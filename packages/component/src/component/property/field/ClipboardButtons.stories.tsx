// noinspection JSUnusedGlobalSymbols

/**
 * ClipboardButtons Story
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ClipboardButtons from "./ClipboardButtons";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '@/__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof ClipboardButtons>

const meta: Meta<typeof ClipboardButtons> = {
  component: ClipboardButtons,
  decorators: [fieldDecorator],
  args: {
    onCopy: fn(),
    onCut: fn(),
    onPaste: fn(),
    onRemove: fn(),
  }
};

export const Normal: Story = {
  args: {
    canCopy: true,
    canPaste: true,
  }
};

export const NoCopy: Story = {
  args: {
    canCopy: false,
    canPaste: true,
  }
}

export const NoPaste: Story = {
  args: {
    canCopy: true,
    canPaste: false,
  }
}

export default meta;
