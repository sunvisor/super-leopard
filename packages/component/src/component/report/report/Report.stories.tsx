// noinspection JSUnusedGlobalSymbols

/**
 * Report Story
 *
 * Created by sunvisor on 2023/12/13.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import Report from "./Report";
import { Meta, StoryObj } from "@storybook/react";
import { PaperSize, UnitType } from '@sunvisor/super-leopard-core';
import { createStore, Provider } from "jotai";
import { testSettings } from '@/__test_assets__/settings';
import { layerTestData } from '@/__test_assets__';
import { billListRecords, billTestData, billValues, dummyBillRecords } from '@sunvisor/super-leopard-test-assets';


type Story = StoryObj<typeof Report>;

const store = createStore();

const meta: Meta<typeof Report> = {
  component: Report,
  title: "component/report/report/Report",
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <div data-testid="test">
            <Story />
          </div>
        </Provider>
      );
    },
  ],
  args: {
    settings: testSettings,
  }
};

export const Shapes: Story = {
  args: {
    report: {
      page: {
        size: PaperSize.A4,
        orientation: "portrait",
        margin: { top: 20, left: 20 },
        unit: UnitType.MILLIMETER,
      },
      layers: layerTestData,
    },
    values: {
      myTextField: "value1",
      myTextWithEmptyShapeField: "value2",
    },
    zoom: 1,
  },
};

export const Bill: Story = {
  args: {
    report: billTestData,
    values: billValues,
    listRecords: billListRecords,
    zoom: 1,
  },
};

export const BillLargeData: Story = {
  args: {
    report: billTestData,
    values: billValues,
    listRecords: dummyBillRecords(25),
    pageNumber: 2,
    zoom: 1,
  },
};

export const BillEmptyData: Story = {
  args: {
    report: billTestData,
    values: {},
    listRecords: [],
    zoom: 1,
  },
};

export const BillEmptyList: Story = {
  args: {
    report: billTestData,
    values: billValues,
    listRecords: [],
    zoom: 1,
  },
};

export default meta;
