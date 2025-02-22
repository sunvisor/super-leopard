// noinspection JSUnusedGlobalSymbols

/**
 * Editor Story
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ReportEditor from "./ReportEditor";
import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'jotai';
import { createStore } from 'jotai/index';
import { expect, waitFor, within } from '@storybook/test';
import { emptyReport } from '../emptyReport';
import { SetReportAtom } from '../../atom/ReportAtom';
import imageHandlers from '../../__test_assets__/msw/imageHandlers';
import { testAssets, testImageListData } from '../../__test_assets__';
import { fn } from '@storybook/test';
import { testSettings } from '../../__test_assets__/settings';


const { billTestData, en } = testAssets;

type Story = StoryObj<typeof ReportEditor>

const store = createStore();

const meta: Meta<typeof ReportEditor> = {
  component: ReportEditor,
  title: 'component/reportEditor/ReportEditor',
  decorators: [
    (Story) => {
      store.set(SetReportAtom, emptyReport);
      return (

        <Provider store={store}>
          <div data-testid="test">
            <Story/>
          </div>
        </Provider>
      );
    }
  ],
  parameters: {
    msw: {
      handlers: imageHandlers(testImageListData),
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByTestId("test");
    await waitFor(async () => {
      await expect(el.querySelectorAll(".layer")).toHaveLength(2);
    });
  },
  args: {
    settings: testSettings,
    onSave: fn(),
  }
};

export const Bill: Story = {
  args: {
    title: 'Bill',
    report: billTestData,
    reportId: 1,
    language: 'ja',
  }
}

export const InEnglish: Story = {
  args: {
    title: 'Bill',
    report: en.billTestData,
    reportId: 1,
    language: 'en',
  }
}

export const Empty: Story = {
  args: {
    title: 'Empty',
    reportId: 1,
    language: 'ja',
  }
}

export const AnotherSettings: Story = {
  args: {
    title: 'Bill',
    report: billTestData,
    reportId: 1,
    language: 'ja',
    settings: {
      ...testSettings,
      boundingBox: {
        handleSize: 8,
        stroke: {
          color: '#ff8888',
          width: 2,
          cap: 'round',
          join: 'round',
          style: 'solid'
        }
      },
      designMode: {
        ...testSettings.designMode,
        fieldBorder: '#88ff88',
        textBorder: '#8080ff',
      }
    },
  }
}

export default meta;
