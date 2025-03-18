// noinspection JSUnusedGlobalSymbols

/**
 * TestApp Story
 *
 * Created by sunvisor on 2025/03/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import TestApp from "../../__test_assets__/TestApp";
import { Meta, StoryObj } from '@storybook/react';
import { billTestData } from '@sunvisor/super-leopard-test-assets';
import { fn } from '@storybook/test';

type Story = StoryObj<typeof TestApp>

const meta: Meta<typeof TestApp> = {
  component: TestApp,
  args: {
    onSave: fn(),
  }
};

export const Bill: Story = {
  args: {
    title: 'Bill',
    report: billTestData,
  }
};

export const New: Story = {
  args: {
    'title': 'New Report',
  }
};

export default meta;
