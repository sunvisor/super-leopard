// noinspection JSUnusedGlobalSymbols

/**
 * Layer Story
 *
 * Created by sunvisor on 2023/12/13.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import Layer from "./Layer";
import { createStore, Provider } from "jotai/index";
import { Meta, StoryObj } from "@storybook/react";
import { DrawModeType } from '../../../svg';
import { Shapes, ShapeData } from '@sunvisor/super-leopard-core';
import { expect, waitFor, within } from "@storybook/test";
import { SetFontMapAtom } from '../../../atom/SettingsAtom';
import { testAssets, webFontMap } from '../../../__test_assets__';

const {
  billTestLayerData, shapeTestData, createTestShapes, fieldTestData,
  billListRecords, billValues
} = testAssets;

type Story = StoryObj<typeof Layer>;

const store = createStore();

const meta: Meta<typeof Layer> = {
  component: Layer,
  title: 'component/report/layer/Layer',
  decorators: [
    (Story) => {
      store.set(SetFontMapAtom, webFontMap);
      return (
        <Provider store={store}>
          <div data-testid="test">
            <Story/>
          </div>
        </Provider>
      );
    },
  ],
};

function getShapes(items: ShapeData[]) {
  return new Shapes(createTestShapes(items));
}

function getImageUrl(src: string) {
  return `/api/images/${src}`;
}

export const ShapesOnly: Story = {
  args: {
    name: "layer1",
    shapes: getShapes(shapeTestData),
    mode: DrawModeType.PRINT,
    values: {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByTestId("test");
    await waitFor(async () => {
      await expect(el.querySelectorAll(".layer")).toHaveLength(1);
      await expect(el.querySelectorAll(".shapes")).toHaveLength(1);
    });
  },
};
export const ShapesAndFieldsDesignMode: Story = {
  args: {
    name: "layer1",
    shapes: getShapes([...shapeTestData, ...fieldTestData]),
    mode: DrawModeType.DESIGN,
    values: {},
    getImageUrl,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByTestId("test");
    await waitFor(async () => {
      await expect(el.querySelectorAll(".layer")).toHaveLength(1);
      await expect(el.querySelectorAll(".shapes")).toHaveLength(1);
    });
  },
};
export const ShapesAndFieldsPrintMode: Story = {
  args: {
    name: "layer1",
    shapes: getShapes([...shapeTestData, ...fieldTestData]),
    mode: DrawModeType.PRINT,
    values: {
      myTextField: "value1",
      myLineField: true,
    },
    getImageUrl,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByTestId("test");
    await waitFor(async () => {
      await expect(el.querySelectorAll(".layer")).toHaveLength(1);
    });
  },
};

export const BillDesignMode: Story = {
  args: {
    name: billTestLayerData.name,
    shapes: getShapes(billTestLayerData.shapes),
    mode: DrawModeType.DESIGN,
    getImageUrl,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByTestId("test");
    await waitFor(async () => {
      await expect(el.querySelectorAll(".layer")).toHaveLength(1);
    });
  },
};

export const BillPrintMode: Story = {
  args: {
    name: billTestLayerData.name,
    shapes: getShapes(billTestLayerData.shapes),
    mode: DrawModeType.PRINT,
    values: billValues,
    listRecords: billListRecords,
    getImageUrl,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByTestId("test");
    await waitFor(async () => {
      await expect(el.querySelectorAll(".layer")).toHaveLength(1);
    });
  },
};

export default meta;
