// noinspection JSUnusedGlobalSymbols

/**
 * SelectRubberBand Story
 *
 * Created by sunvisor on 2024/01/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { SelectRubberBand, OnSelectHandler } from "./SelectRubberBand";
import { Meta, StoryObj } from '@storybook/react';
import { fn, within } from '@storybook/test';
import { createTestSvgDrawer } from '@/__test_assets__';
import { RubberBandOptions } from '@/settings';

type SelectRubberBandProps = {
  onSelect: OnSelectHandler;
}

type Story = StoryObj<SelectRubberBandProps>

const meta: Meta<SelectRubberBandProps> = {
  title: 'svg/rubberBand/SelectRubberBand',
  args: {
    onSelect: fn(),
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


function draw(canvasElement: HTMLElement, args: SelectRubberBandProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = createTestSvgDrawer(el);
  const options: RubberBandOptions = {
    stroke: {
      style: 'solid', color: '#808080', width: 1,
    },
    dragThreshold: 2,
  };
  const drawer = new SelectRubberBand({ svg, options, onSelect: args.onSelect });
  el.addEventListener('mousedown', (e) => {
    const pos = svg.getClientPosition({ x: e.clientX, y: e.clientY });
    drawer.start(pos.x, pos.y);
  });

  return el;
}

export const Select: Story = {
  ...Template,
};

export default meta;
