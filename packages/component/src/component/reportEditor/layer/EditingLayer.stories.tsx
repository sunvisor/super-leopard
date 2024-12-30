// noinspection JSUnusedGlobalSymbols

/**
 * EditingLayer Story
 *
 * Created by sunvisor on 2024/01/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import EditingLayer from "./EditingLayer";
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { createRect, Shapes } from '@sunvisor/super-leopard-core';
import { createStore, Provider } from 'jotai';
import { SetReportAtom } from '../../../atom/ReportAtom';
import { emptyReport } from '../../emptyReport';
import { SelectionAtom } from '../../../atom/SelectionAtom';

type Story = StoryObj<typeof EditingLayer>

const report = emptyReport;

const store = createStore();

const wrapper = (Story: StoryFn, selection: Shapes) => {
  store.set(SetReportAtom, report);
  store.set(SelectionAtom, selection);
  return (
    <Provider store={store}>
      <div data-testid="test">
        <Story/>
      </div>
    </Provider>
  );
}

const planeDecorator = (Story: StoryFn) => {
  return wrapper(Story, new Shapes([]));
}

const BoundingBoxDecorator = (Story: StoryFn) => {
  const shape = createRect({ x: 10, y: 10, width: 100, height: 100, type: 'rect', fillColor: '#000000' });
  return wrapper(Story, new Shapes([shape]))
}

const meta: Meta<typeof EditingLayer> = {
  component: EditingLayer,
};


export const Plane: Story = {
  args: {},
  decorators: [planeDecorator]
};

export const BoundingBox: Story = {
  args: {},
  decorators: [BoundingBoxDecorator]
};

export default meta;
