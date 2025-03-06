// noinspection JSUnusedGlobalSymbols

/**
 * TestApp Story
 *
 * Created by sunvisor on 2025/03/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import TestApp from "../../__test_assets__/TestApp";
import { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof TestApp>

const meta: Meta<typeof TestApp> = {
  component: TestApp,
};

export const Normal: Story = {
  args: {}
};

export default meta;
