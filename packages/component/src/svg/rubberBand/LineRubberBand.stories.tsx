// noinspection JSUnusedGlobalSymbols

/**
 * LineRubberBand Story
 *
 * Created by sunvisor on 2024/01/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { LineRubberBand } from "./LineRubberBand";
import { Meta, StoryObj } from '@storybook/react';
import { HandleType } from '../boundingBox';
import { PositionPair } from '@sunvisor/super-leopard-core';
import { within } from '@storybook/test';
import { SVG } from '@svgdotjs/svg.js';
import { getClientRect } from './index';

type LineRubberBandProps = {
  type: HandleType;
  onMovePoint: (positions: PositionPair) => void;
}

type Story = StoryObj<LineRubberBandProps>

const meta: Meta<LineRubberBandProps> = {
  title: 'svg/rubberBand/LineRubberBand',
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

function draw(canvasElement: HTMLElement, args: LineRubberBandProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = SVG().addTo(el).size(500, 500);
  const options = {
    stroke: {
      stroke: { color: 'gray', width: 1 },
      attr: { 'stroke-dasharray': '1 2' }
    },
    dragThreshold: 2,
  };
  const drawer = new LineRubberBand({ svg, options, onMovePosition: args.onMovePoint });
  el.addEventListener('mousedown', (e) => {
    const pos = getClientRect(svg, e.clientX, e.clientY);
    const positions = {
      x1: pos.x - 50, y1: pos.y - 50, x2: pos.x, y2: pos.y
    }
    drawer.start(e.clientX, e.clientY, positions, args.type);
  });

  return el;
}

export const LeftTop: Story = {
  ...Template,
  args: {
    onMovePoint: (positions: PositionPair) => console.log(positions),
    type: 'position2'
  }
};

export default meta;
