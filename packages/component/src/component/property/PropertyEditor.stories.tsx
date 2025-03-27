// noinspection JSUnusedGlobalSymbols

/**
 * PropertyEditor Story
 *
 * Created by sunvisor on 2024/02/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PropertyEditor from "./PropertyEditor";
import { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';
import { createShapes, Shapes } from '@sunvisor/super-leopard-core';
import { SelectionAtom } from '@/atom/SelectionAtom';
import { createStore, Provider } from 'jotai';
import { SetReportAtom } from '@/atom/ReportAtom';
import { emptyReport } from '../emptyReport';
import { ClipboardAtom } from '@/atom/ClipboardAtom';
import { testImageOptions } from '@/__test_assets__';
import { shapeTestData } from '@sunvisor/super-leopard-test-assets';


type Story = StoryObj<typeof PropertyEditor>

const meta: Meta<typeof PropertyEditor> = {
  component: PropertyEditor,
};

const report = emptyReport;
const store = createStore();

const getDecorator = (selection: Shapes, clipboard: Shapes) =>
  (Story: StoryFn, context: StoryContext) => {
    store.set(SetReportAtom, report);
    store.set(SelectionAtom, selection);
    store.set(ClipboardAtom, clipboard);
    return (
      <Provider store={store}>
        <div data-testid="test">
          {Story(context.args, context)}
        </div>
      </Provider>
    );
  }

export const NotSelected: Story = {
  args: {
    imageOptions: testImageOptions,
    errorImageUrl: '/api/images/barcode_error.svg',
    fontList: [],
  },
  decorators: [getDecorator(
    createShapes([]),
    createShapes([]),
  )]
};

export const CanPaste: Story = {
  args: {
    imageOptions: testImageOptions,
    errorImageUrl: '/api/images/barcode_error.svg',
    fontList: [],
  },
  decorators: [getDecorator(
    createShapes([]),
    createShapes([shapeTestData[0]]),
  )]
}

export const SingleObject: Story = {
  args: {
    imageOptions: testImageOptions,
    errorImageUrl: '/api/images/barcode_error.svg',
    fontList: [],
  },
  decorators: [getDecorator(
    createShapes([shapeTestData[0]]),
    createShapes([]),
  )]
};

export const MultipleObjects: Story = {
  args: {
    imageOptions: testImageOptions,
    errorImageUrl: '/api/images/barcode_error.svg',
    fontList: [],
  },
  decorators: [getDecorator(
    createShapes(shapeTestData),
    createShapes([]),
  )]
}

export const GroupObject: Story = {
  args: {
    imageOptions: testImageOptions,
    errorImageUrl: '/api/images/barcode_error.svg',
    fontList: [],
  },
  decorators: [getDecorator(
    createShapes([shapeTestData[4]]),
    createShapes([]),
  )]
}

export default meta;
