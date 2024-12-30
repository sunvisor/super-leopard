// noinspection JSUnusedGlobalSymbols

/**
 * PageProperty Story
 *
 * Created by sunvisor on 2024/03/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import PageProperty from "./PageProperty";
import { Meta, StoryObj } from '@storybook/react';
import { Page } from '@sunvisor/super-leopard-core';

type Story = StoryObj<typeof PageProperty>

const meta: Meta<typeof PageProperty> = {
  component: PageProperty,
};

export const Normal: Story = {
  args: {
    page: new Page({ size: 'A4', unit: 'mm' }),
  }
};

export default meta;
