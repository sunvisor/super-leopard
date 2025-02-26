// noinspection JSUnusedGlobalSymbols

/**
 * LayerPanel Story
 *
 * Created by sunvisor on 2024/03/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import LayerPanel from "./LayerPanel";
import { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';
import { ReportData } from '@sunvisor/super-leopard-core';
import { createStore } from 'jotai/index';
import { SetActiveLayerIndexAtom, SetReportAtom } from "../../../atom/ReportAtom";
import { Provider } from 'jotai';
import { layerTestData } from '../../../__test_assets__';

type Story = StoryObj<typeof LayerPanel>

const meta: Meta<typeof LayerPanel> = {
  component: LayerPanel,
};

const report: ReportData = {
  layers: layerTestData,
  page: {
    unit: 'mm',
    size: 'A4',
  }
}
const store = createStore();

const decorator = (Story: StoryFn, context: StoryContext) => {
  store.set(SetReportAtom, report);
  store.set(SetActiveLayerIndexAtom, 0);
  return (
    <Provider store={store}>
      <div data-testid="test">
        {Story(context.args, context)}
      </div>
    </Provider>
  )
}

export const Normal: Story = {
  args: {},
  decorators: [decorator]
};

export default meta;
