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

type Story = StoryObj<typeof TestApp>

const meta: Meta<typeof TestApp> = {
  component: TestApp,
};

export const Bill: Story = {
  args: {
    title: 'Bill',
    reportId: 1,
    report: billTestData,
  }
};

export const New: Story = {
  args: {
    'title': 'New Report',
    reportId: 'new',
  }
};

export default meta;
