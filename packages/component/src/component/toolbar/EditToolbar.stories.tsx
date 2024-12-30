// noinspection JSUnusedGlobalSymbols

/**
 * EditToolbar Story
 *
 * Created by sunvisor on 2024/02/02.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import EditToolbar from "./EditToolbar";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof EditToolbar>

const meta: Meta<typeof EditToolbar> = {
  component: EditToolbar,
  args: {
    onSave: fn(),
    onPropertyOpen: fn(),
    onChangeTitle: fn(),
  }
};

export const Normal: Story = {
  args: {
    title: 'Title',
  }
};

export default meta;
