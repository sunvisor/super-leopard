// noinspection JSUnusedGlobalSymbols

/**
 * LineRubberBand Story
 *
 * Created by sunvisor on 2024/01/23.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { LineRubberBand } from "./LineRubberBand";
import { Meta, StoryObj } from '@storybook/react';
import { HandleType } from '@/svg';
import { PositionPair } from '@sunvisor/super-leopard-core';
import { fn, within } from '@storybook/test';
import { createTestSvgDrawer } from '@/__test_assets__';


type LineRubberBandProps = {
  type: HandleType;
  onMovePoint: (positions: PositionPair) => void;
}

type Story = StoryObj<LineRubberBandProps>

const meta: Meta<LineRubberBandProps> = {
  title: 'svg/rubberBand/LineRubberBand',
  args: {
    onMovePoint: fn(),
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

function draw(canvasElement: HTMLElement, args: LineRubberBandProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = createTestSvgDrawer(el);
  const options = {
    stroke: { style: 'solid', color: 'gray', width: 1 },
    dragThreshold: 2,
  };
  const drawer = new LineRubberBand({ svg, options, onMovePosition: args.onMovePoint });
  el.addEventListener('mousedown', (e) => {
    const pos = svg.getClientPosition({ x: e.clientX, y: e.clientY });
    const positions = {
      x1: pos.x - 50, y1: pos.y - 50, x2: pos.x, y2: pos.y
    }
    drawer.start(e.clientX, e.clientY, positions, args.type);
  });

  return el;
}

export const Position2: Story = {
  ...Template,
  args: {
    type: 'position2'
  }
};

export const Positions1: Story = {
  ...Template,
  args: {
    type: 'position1'
  }
}

export const Center: Story = {
  ...Template,
  args: {
    type: 'center'
  }
}

export default meta;
