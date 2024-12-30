// noinspection JSUnusedGlobalSymbols

/**
 * Font Story
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import Font from "./Font";
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { createStore } from 'jotai/index';
import { defaultStyle, FontStyleAtom } from '../../../atom/StylesAtom';
import { Provider } from 'jotai';
import { fieldDecorator } from '../../../__test_assets__';
import { fontList } from '../../../__test_assets__';

type Story = StoryObj<typeof Font>

const decorator = (Story: StoryFn) => {
  store.set(FontStyleAtom, defaultStyle.font);
  return (
    <Provider store={store}>
      <div data-testid="test">
        <Story/>
      </div>
    </Provider>
  )
}
const meta: Meta<typeof Font> = {
  component: Font,
  decorators: [fieldDecorator, decorator],
};

const store = createStore();

export const Normal: Story = {
  args: {
    fontList,
  },
};

export default meta;
