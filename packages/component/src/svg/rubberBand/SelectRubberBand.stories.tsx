// noinspection JSUnusedGlobalSymbols

/**
 * SelectRubberBand Story
 *
 * Created by sunvisor on 2024/01/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { SelectRubberBand, OnSelectHandler } from "./SelectRubberBand";
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { SVG } from '@svgdotjs/svg.js';
import { getClientRect } from './index';
import { Box, Position } from '@sunvisor/super-leopard-core';

type SelectRubberBandProps = {
  onSelect: OnSelectHandler;
}

type Story = StoryObj<SelectRubberBandProps>

const meta: Meta<SelectRubberBandProps> = {
  title: 'svg/rubberBand/SelectRubberBand',
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


function draw(canvasElement: HTMLElement, args: SelectRubberBandProps) {
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
  const drawer = new SelectRubberBand({ svg, options, onSelect: args.onSelect });
  el.addEventListener('mousedown', (e) => {
    const pos = getClientRect(svg, e.clientX, e.clientY);
    drawer.start(pos.x, pos.y);
  });

  return el;
}

export const Select: Story = {
  ...Template,
  args: {
    onSelect: (area: Box | Position) => {
      console.log(area);
    }
  }
};

export default meta;
