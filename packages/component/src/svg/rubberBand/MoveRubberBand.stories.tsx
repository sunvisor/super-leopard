// noinspection JSUnusedGlobalSymbols

/**
 * MoveRubberBand Story
 *
 * Created by sunvisor on 2024/01/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { MoveRubberBand, OnMoveHandler } from "./MoveRubberBand";
import { Meta, StoryObj } from '@storybook/react';
import { fn, within } from '@storybook/test';
import { createTestSvgDrawer } from '@/__test_assets__';

type MoveRubberBandProps = {
  onMove: OnMoveHandler;
}

type Story = StoryObj<MoveRubberBandProps>

const meta: Meta<MoveRubberBandProps> = {
  title: 'svg/rubberBand/MoveRubberBand',
  args: {
    onMove: fn()
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

function draw(canvasElement: HTMLElement, args: MoveRubberBandProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = createTestSvgDrawer(el);
  const options = {
    stroke: { color: 'gray', width: 1, style: 'solid' },
    dragThreshold: 2,
  };
  const drawer = new MoveRubberBand({ svg, options: options, onMove: args.onMove });
  el.addEventListener('mousedown', (e) => {
    const pos = svg.getClientPosition({ x: e.clientX, y: e.clientY });
    const box = {
      x: pos.x - 1, y: pos.y - 1, width: 100, height: 100
    }
    drawer.start(e.clientX, e.clientY, box);
  });

  return el;
}

export const Move: Story = {
  ...Template,
}

export default meta;
