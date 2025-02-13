// noinspection JSUnusedGlobalSymbols

/**
 * CircleDrawer Story
 *
 * Created by sunvisor on 2023/11/26.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { CircleDrawer } from './CircleDrawer';
import {createScale, createCircle, CircleData,CircleShape,  UnitType} from '@sunvisor/super-leopard-core';
import { expect } from '@storybook/test';
import { createTestSvgDrawer } from '../../__test_assets__';


type CircleProps = {
  circle: CircleData;
  opacity?: number;
}

type Story = StoryObj<CircleProps>

const meta: Meta<CircleProps> = {
  title: 'svg/CircleDrawer'
};

const Template: Story = {

  render: () => {
    return (
      <div data-testid="test">
      </div>
    );
  },

  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    // Assert
    await expect(el.querySelector('circle')).toBeInTheDocument();
  }
};

function draw(canvasElement: HTMLElement, args: CircleProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = createTestSvgDrawer(el);
  const scale = createScale({ unit: UnitType.MILLIMETER, zoom: 1, precision: 2, pointPrecision: 2 });
  const circle = createCircle(args.circle);
  const drawer = new CircleDrawer({ svg, scale });
  drawer.draw(circle, {opacity: args.opacity ?? 1});

  return el;
}

export const SolidBorder: Story = {
  ...Template,
  args: {
    circle: {
      type: CircleShape,
      x: 10,
      y: 10,
      diameter: 20,
      border: {
        width: 0.25,
        color: '#000000',
        style: 'solid',
        cap: 'round',
        join: 'bevel'
      }
    }
  }
};

export const BoldBorder: Story = {
  ...Template,
  args: {
    circle: {
      type: CircleShape,
      x: 10,
      y: 10,
      diameter: 20,
      border: {
        width: 2,
        color: '#000000',
        style: 'solid',
        cap: 'round',
        join: 'bevel'
      }
    }
  }
};

export const DashedBorder: Story = {
  ...Template,
  args: {
    circle: {
      type: CircleShape,
      x: 10,
      y: 10,
      diameter: 20,
      border: {
        width: 0.25,
        color: '#000000',
        style: 'dashed',
        cap: 'round',
        join: 'bevel'
      }
    }
  }
};

export const DottedBorder: Story = {
  ...Template,
  args: {
    circle: {
      type: CircleShape,
      x: 10,
      y: 10,
      diameter: 20,
      border: {
        width: 0.25,
        color: '#000000',
        style: 'dotted',
        cap: 'round',
        join: 'bevel'
      }
    }
  }
};

export const RedBorder: Story = {
  ...Template,
  args: {
    circle: {
      type: CircleShape,
      x: 10,
      y: 10,
      diameter: 20,
      border: {
        width: 0.25,
        color: '#ff0000',
        style: 'solid',
        cap: 'round',
        join: 'bevel'
      }
    }
  }
};

export const RedFill: Story = {
  ...Template,
  args: {
    circle: {
      type: CircleShape,
      x: 10,
      y: 10,
      diameter: 20,
      fillColor: '#ff0000'
    }
  }
};

export const BlackBorderAndRedFill: Story = {
  ...Template,
  args: {
    circle: {
      type: CircleShape,
      x: 10,
      y: 10,
      diameter: 20,
      border: {
        width: 2,
        color: '#000000',
        style: 'solid',
        cap: 'round',
        join: 'bevel'
      },
      fillColor: '#ff0000'
    }
  }
};

export const Opacity: Story = {
  ...Template,
  args: {
    circle: {
      type: CircleShape,
      x: 10,
      y: 10,
      diameter: 20,
      border: {
        width: 2,
        color: '#000000',
        style: 'solid',
        cap: 'round',
        join: 'bevel'
      },
      fillColor: '#ff0000'
    },
    opacity: 0.5,
  }
};

export default meta;
