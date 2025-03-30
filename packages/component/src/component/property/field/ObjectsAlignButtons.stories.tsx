// noinspection JSUnusedGlobalSymbols

/**
 * ObjectsAlignButtons Story
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ObjectsAlignButtons from "./ObjectsAlignButtons";
import { Meta, StoryObj } from '@storybook/react';
import { fieldDecorator } from '@/__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof ObjectsAlignButtons>

const meta: Meta<typeof ObjectsAlignButtons> = {
  component: ObjectsAlignButtons,
  decorators: [fieldDecorator],
  args: {
    onClick: fn(),
  }
};

export const Normal: Story = {
  args: {}
};

export default meta;
