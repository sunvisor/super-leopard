// noinspection JSUnusedGlobalSymbols

/**
 * EditModeButtons Story
 *
 * Created by sunvisor on 2024/02/02.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import EditModeButtons, { EditModeButtonsProps } from "./EditModeButtons";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof EditModeButtons>

const meta: Meta<typeof EditModeButtons> = {
  component: EditModeButtons,
  args: {
    onChange: fn(),
  }
};

export const Normal: Story = {
  render: (args: EditModeButtonsProps) => (
    <EditModeButtons {...args} />
  ),
  args: {}
};

export default meta;
