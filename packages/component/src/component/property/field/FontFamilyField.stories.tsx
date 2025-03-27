// noinspection JSUnusedGlobalSymbols

/**
 * FontFamilyField Story
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import FontFamilyField from "./FontFamilyField";
import { Meta, StoryObj } from "@storybook/react";
import { fieldDecorator, testFontList } from "@/__test_assets__";
import { fn } from '@storybook/test';

type Story = StoryObj<typeof FontFamilyField>;

const meta: Meta<typeof FontFamilyField> = {
  component: FontFamilyField,
  decorators: [fieldDecorator],
  args: {
    onChangeValue: fn(),
    onChangeFamily: fn(),
  }
};

export const Normal: Story = {
  args: {
    label: "Font",
    name: "fontFamily",
    fontList: testFontList,
  },
};

export default meta;
