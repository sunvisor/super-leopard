// noinspection JSUnusedGlobalSymbols

/**
 * Paper Story
 *
 * Created by sunvisor on 2023/12/13.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import ReportPaper from "./ReportPaper";
import { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof ReportPaper>

const meta: Meta<typeof ReportPaper> = {
  component: ReportPaper,
  title: 'component/report/paper/Paper',
  decorators: [
    (Story) => (
      <div data-testid="test">
        <Story/>
      </div>
    ),
  ],
};

export const Normal: Story = {
  args: {},
};


export default meta;
