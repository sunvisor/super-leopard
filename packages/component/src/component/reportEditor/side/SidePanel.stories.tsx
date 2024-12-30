// noinspection JSUnusedGlobalSymbols

/**
 * SidePanel Story
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import SidePanel from "./SidePanel";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof SidePanel>

const meta: Meta<typeof SidePanel> = {
  component: SidePanel,
  args: {
    onClosePanel: fn(),
  }
};

export const EditMode: Story = {
  args: {
    mode: "edit",
    open: true,
  }
};

export default meta;
