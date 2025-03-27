// noinspection JSUnusedGlobalSymbols

/**
 * UploadButton Story
 *
 * Created by sunvisor on 2024/02/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import UploadButton from "./UploadButton";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '@/__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof UploadButton>

const meta: Meta<typeof UploadButton> = {
  component: UploadButton,
  decorators: [fieldDecorator],
  args: {
    onChangeFile: fn(),
  }
};

export const Normal: Story = {
  args: {
    name: 'uploadFile',
    label: '画像をアップロードする'
  }
};

export default meta;
