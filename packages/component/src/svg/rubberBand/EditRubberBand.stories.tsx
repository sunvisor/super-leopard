// noinspection JSUnusedGlobalSymbols

/**
 * EditRubberBand Story
 *
 * Created by sunvisor on 2024/01/21.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { EditRubberBand } from "./EditRubberBand";
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { Box, Position } from '@sunvisor/super-leopard-core'
import { OnSelectHandler } from './SelectRubberBand';
import { OnMoveHandler } from './MoveRubberBand';
import { defaultSettings } from '../setting';
import { createTestSvgDrawer } from '../../__test_assets__';

type EditRubberBandProps = {
  listeners: {
    onSelect: OnSelectHandler;
    onMove: OnMoveHandler;
  }
}

type Story = StoryObj<EditRubberBandProps>

const meta: Meta<EditRubberBandProps> = {
  title: 'svg/rubberBand/EditRubberBand',
};

const Template: Story = {

  render: () => {
    return (
      <div data-testid="test">
      </div>
    );
  },
  args: {
    listeners: {
      onSelect: (area: Box | Position) => {
        console.log('onSelect', area);
      },
      onMove: (pos: Position) => {
        console.log('onMove', pos);
      }
    }
  },
  play: async ({ canvasElement, args }) => {
    draw(canvasElement, args);
  }
};


function draw(canvasElement: HTMLElement, args: EditRubberBandProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = createTestSvgDrawer(el);
  const drawer = new EditRubberBand({ svg, listeners: args.listeners, options: defaultSettings.rubberBand });

  return { el, svg, drawer };
}

export const Select: Story = {
  ...Template,
  play: async ({ canvasElement, args }) => {
    const { el, drawer } = draw(canvasElement, args);
    el.addEventListener('mousedown', (e) => {
      drawer.start('select', e.clientX, e.clientY);
    });
  }
}

export const Move: Story = {
  ...Template,
  play: async ({ canvasElement, args }) => {
    const { el, svg, drawer } = draw(canvasElement, args);
    el.addEventListener('mousedown', (e) => {
      const pos = svg.getClientPosition({ x: e.clientX, y: e.clientY });
      const box = {
        x: pos.x - 1, y: pos.y - 1, width: 100, height: 100
      }
      drawer.start('move', e.clientX, e.clientY, box);
    });
  }
}

export const Resize: Story = {
  ...Template,
  play: async ({ canvasElement, args }) => {
    const { el, svg, drawer } = draw(canvasElement, args);
    el.addEventListener('mousedown', (e) => {
      const pos = svg.getClientPosition({ x: e.clientX, y: e.clientY });
      const box = {
        x: pos.x - 1, y: pos.y - 1, width: 100, height: 100
      }
      drawer.start('resize', e.clientX, e.clientY, box, 'left-top');
    });
  }
}

export default meta;
