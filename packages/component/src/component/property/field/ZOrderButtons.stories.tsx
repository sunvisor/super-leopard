// noinspection JSUnusedGlobalSymbols

/**
 * ZOrderButtons Story
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ZOrderButtons from "./ZOrderButtons";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '@/__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof ZOrderButtons>

const meta: Meta<typeof ZOrderButtons> = {
  component: ZOrderButtons,
  decorators: [fieldDecorator],
  args: {
    onBringTo: fn(),
  }
};

export const Normal: Story = {
  args: {}
};

export default meta;
