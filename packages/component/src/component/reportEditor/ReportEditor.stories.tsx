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
import { fontList, testAssets, testImageListData, webFontMap } from '../../__test_assets__';

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
};

const getImageUrl = (src: string) => {
  return `/api/images/${src}`;
}

const apiBaseUrl = '/api/images';

export const Bill: Story = {
  args: {
    title: 'Bill',
    data: billTestData,
    reportId: 1,
    getImageUrl,
    webFontMap,
    fontList,
    apiBaseUrl,
    language: 'ja',
  }
}

export const InEnglish: Story = {
  args: {
    title: 'Bill',
    data: en.billTestData,
    reportId: 1,
    getImageUrl,
    webFontMap,
    fontList,
    apiBaseUrl,
    language: 'en',
  }
}

export const Empty: Story = {
  args: {
    title: 'Empty',
    reportId: 1,
    getImageUrl,
    webFontMap,
    apiBaseUrl,
    language: 'ja',
  }
}

export default meta;
