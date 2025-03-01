// noinspection JSUnusedGlobalSymbols

/**
 * ObjectList Story
 *
 * Created by sunvisor on 2024/03/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ObjectList from "./ObjectList";
import { Meta, StoryObj } from '@storybook/react';
import { createShapes } from '@sunvisor/super-leopard-core';
import { fn } from '@storybook/test';
import { billTestShapesData, shapeTestData } from '@sunvisor/super-leopard-test-assets';


type Story = StoryObj<typeof ObjectList>

const meta: Meta<typeof ObjectList> = {
  title: 'component/objectList/ObjectList',
  component: ObjectList,
  args: {
    onClick: fn(),
    onSettingClick: fn(),
  }
};

export const Normal: Story = {
  args: {
    shapes: createShapes(shapeTestData),
  }
};

export const Bill: Story = {
  args: {
    shapes: createShapes(billTestShapesData)
  }
}

export default meta;
