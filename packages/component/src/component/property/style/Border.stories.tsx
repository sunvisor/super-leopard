// noinspection JSUnusedGlobalSymbols

/**
 * Border Story
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import Border from "./Border";
import { Meta, StoryObj } from '@storybook/react';
import { createStore } from 'jotai/index';
import { BorderAtom } from '../../../atom/StylesAtom';
import { Provider } from 'jotai';
import { fieldDecorator } from '../../../__test_assets__';
import { StoryFn } from '@storybook/react';

type Story = StoryObj<typeof Border>

const decorator = (Story: StoryFn) => {
  store.set(BorderAtom, {});
  return (
    <Provider store={store}>
      <Story/>
    </Provider>
  )
}

const meta: Meta<typeof Border> = {
  component: Border,
  decorators: [fieldDecorator, decorator],
};

const store = createStore();

export const Normal: Story = {
  args: {},
};

export default meta;
