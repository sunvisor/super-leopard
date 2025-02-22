// noinspection JSUnusedGlobalSymbols

/**
 * ResizeRubberBand Story
 *
 * Created by sunvisor on 2024/01/22.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ResizeRubberBand } from "./ResizeRubberBand";
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@sunvisor/super-leopard-core';
import { fn, within } from '@storybook/test';
import { HandleType } from '../boundingBox';
import { createTestSvgDrawer } from '../../__test_assets__';

type ResizeRubberBandProps = {
  type: HandleType;
  onResize: (box: Box) => void;
}

type Story = StoryObj<ResizeRubberBandProps>

const meta: Meta<ResizeRubberBandProps> = {
  title: 'svg/rubberBand/ResizeRubberBand',
  args: {
    onResize: fn()
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

function draw(canvasElement: HTMLElement, args: ResizeRubberBandProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = createTestSvgDrawer(el);
  const options = {
    stroke: { style: 'solid', color: 'gray', width: 1 },
    dragThreshold: 2,
  };
  const drawer = new ResizeRubberBand({ svg, options: options, onResize: args.onResize });
  el.addEventListener('mousedown', (e) => {
    const pos = svg.getClientPosition({x: e.clientX, y: e.clientY});
    const box = {
      x: pos.x - 50, y: pos.y - 50, width: 100, height: 100
    }
    drawer.start(e.clientX, e.clientY, box, args.type);
  });

  return el;
}

export const LeftTop: Story = {
  ...Template,
  args: {
    type: 'left-top'
  }
};
export const Top: Story = {
  ...Template,
  args: {
    type: 'top'
  }
};

export const RightTop: Story = {
  ...Template,
  args: {
    type: 'right-top'
  }
}

export const Left: Story = {
  ...Template,
  args: {
    type: 'left'
  }
}

export const Right: Story = {
  ...Template,
  args: {
    type: 'right'
  }
}

export const LeftBottom: Story = {
  ...Template,
  args: {
    type: 'left-bottom'
  }
}

export const Bottom: Story = {
  ...Template,
  args: {
    type: 'bottom'
  }
}

export const RightBottom: Story = {
  ...Template,
  args: {
    type: 'right-bottom'
  }
}


export default meta;
