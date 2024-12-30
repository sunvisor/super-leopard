// noinspection JSUnusedGlobalSymbols

/**
 * AppendShapeLayer Story
 *
 * Created by sunvisor on 2024/01/26.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import AppendShapeLayer from "./AppendShapeLayer";
import { Meta, StoryObj } from '@storybook/react';
import {
  CircleShape,
  EllipseShape,
  FieldShape,
  ImageShape,
  LineShape,
  RectShape,
  TextShape
} from '@sunvisor/super-leopard-core';

type Story = StoryObj<typeof AppendShapeLayer>

const meta: Meta<typeof AppendShapeLayer> = {
  component: AppendShapeLayer,
  decorators: [
    (Story) => (
      <div data-testid="test">
        <Story/>
      </div>
    ),
  ],
};

export const Rect: Story = {
  args: {
    shapeType: RectShape,
  }
}

export const Circle: Story = {
  args: {
    shapeType: CircleShape,
  }
}

export const Ellipse: Story = {
  args: {
    shapeType: EllipseShape,
  }
}

export const Line: Story = {
  args: {
    shapeType: LineShape,
  }
}

export const Text: Story = {
  args: {
    shapeType: TextShape,
  }
}

export const Field: Story = {
  args: {
    shapeType: FieldShape,
  }
}

export const Image: Story = {
  args: {
    shapeType: ImageShape,
  }
}

export default meta;
