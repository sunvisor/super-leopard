// noinspection JSUnusedGlobalSymbols

/**
 * FillColor Story
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import FillColor from "./FillColor";
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { createStore } from 'jotai/index';
import { Provider } from 'jotai';
import { FillColorAtom } from '../../../atom/StylesAtom';
import { fieldDecorator } from '../../../__test_assets__';

type Story = StoryObj<typeof FillColor>

const decorator = (Story: StoryFn) => {
  store.set(FillColorAtom, '#ff0000');
  return (
    <Provider store={store}>
        <Story/>
    </Provider>
  )
}

const meta: Meta<typeof FillColor> = {
  component: FillColor,
  decorators: [decorator, fieldDecorator],
};

const store = createStore();

export const Normal: Story = {
  args: {},
};

export default meta;
