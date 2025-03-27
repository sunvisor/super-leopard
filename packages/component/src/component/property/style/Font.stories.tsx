// noinspection JSUnusedGlobalSymbols

/**
 * Font Story
 *
 * Created by sunvisor on 2024/02/29.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import Font from "./Font";
import { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';
import { createStore, Provider } from 'jotai';
import { defaultStyle, FontStyleAtom } from '@/atom/StylesAtom';
import { fieldDecorator, testFontList } from '@/__test_assets__';

type Story = StoryObj<typeof Font>

const decorator = (Story: StoryFn, context: StoryContext) => {
  store.set(FontStyleAtom, defaultStyle.font);
  return (
    <Provider store={store}>
      <div data-testid="test">
        {Story(context.args, context)}
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
    fontList: testFontList,
  },
};

export default meta;
