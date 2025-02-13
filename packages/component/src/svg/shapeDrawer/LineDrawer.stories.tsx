// noinspection JSUnusedGlobalSymbols

/**
 * LineDrawer Story
 *
 * Created by sunvisor on 2023/11/26.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Meta, StoryObj } from '@storybook/react';
import { within } from "@storybook/test";
import { LineDrawer } from './LineDrawer';
import { expect } from '@storybook/test';
import {
  createLine,
  createScale,
  LineData,
  LineShape,
  UnitType,
} from '@sunvisor/super-leopard-core';
import { createTestSvgDrawer } from '../../__test_assets__';

type LineProps = {
  line: LineData;
  opacity?: number;
}

type Story = StoryObj<LineProps>

const meta: Meta<LineProps> = {
  title: 'svg/LineDrawer',
};

const Template: Story = {
  render: () => (
    <div data-testid="test">
    </div>
  ),

  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    // Assert
    await expect(el.querySelector('line')).toBeInTheDocument();
  },
}

function draw(canvasElement: HTMLElement, args: LineProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = createTestSvgDrawer(el);
  const scale = createScale({ unit: UnitType.MILLIMETER, zoom: 1, precision: 2, pointPrecision: 2 });
  const line = createLine(args.line);
  const drawer = new LineDrawer({ svg, scale });
  drawer.draw(line, { opacity: args.opacity ?? 1 });
  return el;
}

export const SolidBorder: Story = {
  ...Template,
  args: {
    line: {
      type: LineShape,
      x1: 10,
      y1: 10,
      x2: 100,
      y2: 50,
      border: {
        color: '#000000',
        width: 0.25,
      }
    }
  }
}

export const DashedBorder: Story = {
  ...Template,
  args: {
    line: {
      type: LineShape,
      x1: 10,
      y1: 10,
      x2: 100,
      y2: 50,
      border: {
        color: '#000000',
        width: 0.25,
        style: 'dashed'
      }
    }
  }
}

export const DottedBorder: Story = {
  ...Template,
  args: {
    line: {
      type: LineShape,
      x1: 10,
      y1: 10,
      x2: 100,
      y2: 50,
      border: {
        color: '#000000',
        width: 0.25,
        style: 'dotted'
      }
    }
  }
}

export const BoldBorder: Story = {
  ...Template,
  args: {
    line: {
      type: LineShape,
      x1: 10,
      y1: 10,
      x2: 100,
      y2: 50,
      border: {
        color: '#000000',
        width: 2,
        style: 'solid'
      }
    }
  }
}

export const CapButtBorder: Story = {
  ...Template,
  args: {
    line: {
      type: LineShape,
      x1: 10,
      y1: 10,
      x2: 100,
      y2: 50,
      border: {
        color: '#000000',
        width: 10,
        style: 'solid',
        cap: 'butt'
      }
    }
  }
}

export const CapSquareBorder: Story = {
  ...Template,
  args: {
    line: {
      type: LineShape,
      x1: 10,
      y1: 10,
      x2: 100,
      y2: 50,
      border: {
        color: '#000000',
        width: 10,
        style: 'solid',
        cap: 'square'
      }
    }
  }
}

export const CapRoundBorder: Story = {
  ...Template,
  args: {
    line: {
      type: LineShape,
      x1: 10,
      y1: 10,
      x2: 100,
      y2: 50,
      border: {
        color: '#000000',
        width: 10,
        style: 'solid',
        cap: 'round'
      }
    }
  }
}


export const RedBorder: Story = {
  ...Template,
  args: {
    line: {
      type: LineShape,
      x1: 10,
      y1: 10,
      x2: 100,
      y2: 50,
      border: {
        color: '#FF0000',
        width: 0.25
      }
    }
  }
}

export const Opacity: Story = {
  ...Template,
  args: {
    line: {
      type: LineShape,
      x1: 10,
      y1: 10,
      x2: 100,
      y2: 50,
      border: {
        color: '#000000',
        width: 2,
        style: 'solid'
      }
    },
    opacity: 0.5,
  }
}

export default meta;
