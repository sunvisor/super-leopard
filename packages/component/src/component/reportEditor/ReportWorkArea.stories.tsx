// noinspection JSUnusedGlobalSymbols

/**
 * ReportEditor Story
 *
 * Created by sunvisor on 2024/01/09.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ReportWorkArea from "./ReportWorkArea";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { PaperSize, ReportData, UnitType } from '@sunvisor/super-leopard-core';
import { createStore, Provider } from "jotai";
import { SetReportAtom } from "../../atom/ReportAtom";
import { SetFontMapAtom } from '../../atom/SettingsAtom';
import { testAssets, webFontMap , lineTestData, layerTestData} from '../../__test_assets__';

type Story = StoryObj<typeof ReportWorkArea>;

const store = createStore();

const { billTestData } = testAssets;

const wrapper = (Story: StoryFn, data: ReportData) => {
  store.set(SetReportAtom, data);
  store.set(SetFontMapAtom, webFontMap);
  return (
    <Provider store={store}>
      <div data-testid="test">
        <Story />
      </div>
    </Provider>
  );
};

const billDecorator = (Story: StoryFn) => {
  return wrapper(Story, billTestData);
};

const getImageUrl = (id: string) => `/api/images/${id}`;

const layerReport = {
  page: {
    size: PaperSize.A4,
    orientation: "portrait",
    margin: { top: 20, left: 20 },
    unit: UnitType.MILLIMETER,
  },
  layers: layerTestData,
};

const layerDecorator = (Story: StoryFn) => {
  return wrapper(Story, layerReport);
};

const lineReport = {
  page: {
    size: PaperSize.A4,
    orientation: "portrait",
    margin: { top: 20, left: 20 },
    unit: UnitType.MILLIMETER,
  },
  layers: [
    {
      name: "layer1",
      shapes: lineTestData,
    },
  ],
};

const lineDecorator = (Story: StoryFn) => {
  return wrapper(Story, lineReport);
};

const meta: Meta<typeof ReportWorkArea> = {
  component: ReportWorkArea,
};

export const EditModeBill: Story = {
  args: {
    mode: "edit",
    zoom: 1,
    getImageUrl,
  },
  decorators: [billDecorator],
};

export const AppendRectModeBill: Story = {
  args: {
    mode: "rect",
    zoom: 1,
    getImageUrl,
  },
  decorators: [billDecorator],
};

export const AppendCircleModeBill: Story = {
  args: {
    mode: "circle",
    zoom: 1,
    getImageUrl,
  },
  decorators: [billDecorator],
};

export const AppendEllipseModeBill: Story = {
  args: {
    mode: "ellipse",
    zoom: 1,
    getImageUrl,
  },
  decorators: [billDecorator],
};

export const AppendLineModeBill: Story = {
  args: {
    mode: "line",
    zoom: 1,
    getImageUrl,
  },
  decorators: [billDecorator],
};

export const AppendTextModeBill: Story = {
  args: {
    mode: "text",
    zoom: 1,
    getImageUrl,
  },
  decorators: [billDecorator],
};

export const AppendFieldModeBill: Story = {
  args: {
    mode: "field",
    zoom: 1,
    getImageUrl,
  },
  decorators: [billDecorator],
};

export const AppendImageModeBill: Story = {
  args: {
    mode: "image",
    zoom: 1,
    getImageUrl,
  },
  decorators: [billDecorator],
};

export const EditModeShapes: Story = {
  args: {
    mode: "edit",
    zoom: 1,
    getImageUrl,
  },
  decorators: [layerDecorator],
};

export const EditModeLines: Story = {
  args: {
    mode: "edit",
    zoom: 1,
    getImageUrl,
  },
  decorators: [lineDecorator],
};

export default meta;
