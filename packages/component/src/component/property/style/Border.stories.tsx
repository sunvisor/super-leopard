// noinspection JSUnusedGlobalSymbols

/**
 * Border Story
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import Border from "./Border";
import { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';
import { createStore, Provider } from 'jotai';
import { BorderAtom } from '@/atom/StylesAtom';
import { fieldDecorator } from '@/__test_assets__';

type Story = StoryObj<typeof Border>

const decorator = (Story: StoryFn, context: StoryContext) => {
  store.set(BorderAtom, {});
  return (
    <Provider store={store}>
      {Story(context.args, context)}
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
