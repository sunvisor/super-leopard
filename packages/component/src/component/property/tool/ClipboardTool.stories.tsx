// noinspection JSUnusedGlobalSymbols

/**
 * ClipboardTool Story
 *
 * Created by sunvisor on 2025/02/20.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import ClipboardTool from "./ClipboardTool";
import { Meta, StoryObj } from '@storybook/react';
import { createStore, Provider } from 'jotai/index';
import { SelectionAtom } from '../../../atom/SelectionAtom';
import { createShapes } from '@sunvisor/super-leopard-core';
import { ClipboardAtom } from '../../../atom/ClipboardAtom';
import { shapeTestData } from '@sunvisor/super-leopard-test-assets';


type Story = StoryObj<typeof ClipboardTool>


const store = createStore();

const meta: Meta<typeof ClipboardTool> = {
  component: ClipboardTool,
  decorators: [
    (Story) => {
      const selection = createShapes([shapeTestData[0]]);
      store.set(SelectionAtom, selection);
      store.set(ClipboardAtom, selection);

      return (
        <Provider store={store}>
          <div data-testid="test">
            <Story/>
          </div>
        </Provider>
      );
    }
  ]
};

export const Normal: Story = {
  args: {}
};

export default meta;
