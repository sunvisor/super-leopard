// noinspection JSUnusedGlobalSymbols

/**
 * BoundingBox Story
 *
 * Created by sunvisor on 2024/01/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Meta, StoryObj } from '@storybook/react';
import { createScale, Box, PositionPair, UnitType } from '@sunvisor/super-leopard-core';
import { within } from "@storybook/test";
import { SVG } from "@svgdotjs/svg.js";
import { BoundingBox } from './BoundingBox';
import { BoundingBoxOptions, defaultSettings } from '../setting';

type BoundingBoxProps = {
  options: BoundingBoxOptions;
  boundingBox?: {
    box: Box;
    showCornerHandles?: boolean;
    showEdgeHandles?: boolean;
  }
  line?: {
    positions: PositionPair;
  }
  rubberBand?: Box;
  onMousedown: (event: Event, type: string) => void;
}

type Story = StoryObj<BoundingBoxProps>

const meta: Meta<BoundingBoxProps> = {
  title: 'svg/BoundingBox',
  argTypes: {
    onMousedown: { action: 'onMousedown' },
  }
};

const Template: Story = {

  render: () => {
    return (
      <div data-testid="test">
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    draw(canvasElement, args);
  }
};

function draw(canvasElement: HTMLElement, args: BoundingBoxProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = SVG().addTo(el).size(500, 500);
  const scale = createScale({ unit: UnitType.MILLIMETER, zoom: 1, precision: 2, pointPrecision: 2 });
  const drawer = new BoundingBox({
    svg, scale, options: { ...args.options }, onHandleMouseDown: args.onMousedown
  });
  if (args.boundingBox) {
    drawer.drawBoundingBox(args.boundingBox.box, args.boundingBox.showCornerHandles, args.boundingBox.showEdgeHandles);
  }
  if (args.line) {
    drawer.drawLineHandles(args.line.positions);
  }

  return el;
}

export const Full: Story = {
  ...Template,
  args: {
    options: defaultSettings.boundingBox,
    boundingBox: {
      box: {
        x: 10,
        y: 10,
        width: 100,
        height: 100
      },
    }
  }
}

export const CornerOnly: Story = {
  ...Template,
  args: {
    options: defaultSettings.boundingBox,
    boundingBox: {
      box: {
        x: 10,
        y: 10,
        width: 100,
        height: 100
      },
      showCornerHandles: true,
      showEdgeHandles: false,
    }
  }
}

export const EdgeOnly: Story = {
  ...Template,
  args: {
    options: defaultSettings.boundingBox,
    boundingBox: {
      box: {
        x: 10,
        y: 10,
        width: 100,
        height: 100
      },
      showCornerHandles: false,
      showEdgeHandles: true,
    }
  }
}

export const LargeHandle: Story = {
  ...Template,
  args: {
    options: {
      ...defaultSettings.boundingBox,
      handleSize: 12,
    },
    boundingBox: {
      box: {
        x: 10,
        y: 10,
        width: 100,
        height: 100
      },
    }
  }
}

export const WithoutBorder: Story = {
  ...Template,
  args: {
    options: {
      ...defaultSettings.boundingBox,
      stroke: {
        stroke: {},
        attr: {}
      }
    },
    boundingBox: {
      box: {
        x: 10,
        y: 10,
        width: 100,
        height: 100
      },
    }
  }
}

export const Line: Story = {
  ...Template,
  args: {
    options: defaultSettings.boundingBox,
    line: {
      positions: {
        x1: 10,
        y1: 10,
        x2: 100,
        y2: 100
      },
    }
  }
}

export default meta;
