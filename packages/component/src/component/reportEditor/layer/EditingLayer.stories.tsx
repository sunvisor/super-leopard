// noinspection JSUnusedGlobalSymbols

/**
 * EditingLayer Story
 *
 * Created by sunvisor on 2024/01/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import EditingLayer from "./EditingLayer";
import { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';
import { createLine, createRect, Shapes } from '@sunvisor/super-leopard-core';
import { createStore, Provider } from 'jotai';
import { SetReportAtom } from '@/atom/ReportAtom';
import { emptyReport } from '@/component/emptyReport';
import { SelectionAtom } from '@/atom/SelectionAtom';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof EditingLayer>

const report = emptyReport;

const store = createStore();

const wrapper = (Story: StoryFn, context: StoryContext, selection: Shapes) => {
  store.set(SetReportAtom, report);
  store.set(SelectionAtom, selection);
  return (
    <Provider store={store}>
      <div data-testid="test">
        {Story(context.args, context)}
      </div>
    </Provider>
  );
}

const planeDecorator = (Story: StoryFn, context: StoryContext) => {
  return wrapper(Story, context , new Shapes([]));
}

const RectDecorator = (Story: StoryFn, context: StoryContext ) => {
  const shape = createRect({ x: 10, y: 10, width: 100, height: 100, type: 'rect', fillColor: '#000000' });
  return wrapper(Story, context, new Shapes([shape]))
}

const LineDecorator = (Story: StoryFn, context: StoryContext) => {
  const shape = createLine({ x1: 10, y1: 10, x2: 110, y2: 110, type: 'line', border: { color: '#000000' }});
  return wrapper(Story, context, new Shapes([shape]))
}

const meta: Meta<typeof EditingLayer> = {
  component: EditingLayer,
  args: {
    onSelect: fn(),
    onMove: fn(),
    onResize: fn(),
    onMovePosition: fn(),
  }
};


export const Plane: Story = {
  args: {},
  decorators: [planeDecorator]
};

export const Rect: Story = {
  args: {},
  decorators: [RectDecorator]
};

export const Line: Story = {
  args: {},
  decorators: [LineDecorator]
};

export default meta;
