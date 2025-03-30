// noinspection JSUnusedGlobalSymbols

/**
 * JoinMiter Story
 *
 * Created by sunvisor on 2024/02/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import JoinMiterIcon from "./JoinMiterIcon";
import { Meta, StoryObj } from '@storybook/react';
import { iconDecorator } from '@/__test_assets__';

type Story = StoryObj<typeof JoinMiterIcon>

const meta: Meta<typeof JoinMiterIcon> = {
  component: JoinMiterIcon,
  decorators: [iconDecorator],
};

export const Normal: Story = {
  render: () => (
    <JoinMiterIcon />
  ),
  args: {}
};

export default meta;
