// noinspection JSUnusedGlobalSymbols

/**
 * EllipseDrawer Story
 *
 * Created by sunvisor on 2023/12/04.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Meta, StoryObj } from '@storybook/react';
import { within } from "@storybook/test";
import { SVG } from "@svgdotjs/svg.js";
import { EllipseDrawer } from './EllipseDrawer';
import { expect } from '@storybook/test';
import { createEllipse, createScale, EllipseData, EllipseShape, UnitType } from '@sunvisor/super-leopard-core';


type EllipseProps = {
  ellipse: EllipseData;
  opacity?: number;
}

type Story = StoryObj<EllipseProps>

const meta: Meta<EllipseProps> = {
  title: 'svg/EllipseDrawer'
};

const Template: Story = {
  render: () => (
    <div data-testid="test">
    </div>
  ),

  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    // Assert
    await expect(el.querySelector('ellipse')).toBeInTheDocument();
  }
};

function draw(canvasElement: HTMLElement, args: EllipseProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = SVG().addTo(el).size(500, 500);
  const scale = createScale({ unit: UnitType.MILLIMETER, zoom: 1, precision: 2, pointPrecision: 2 });
  const ellipse = createEllipse(args.ellipse);
  const drawer = new EllipseDrawer({ svg, scale });
  drawer.draw(ellipse, { opacity: args.opacity ?? 1 });

  return el;
}

const baseEllipse: EllipseData = {
  type: EllipseShape,
  x: 10,
  y: 10,
  width: 40,
  height: 30,
}

export const SolidBorder: Story = {
  ...Template,
  args: {
    ellipse: {
      ...baseEllipse,
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
    ellipse: {
      ...baseEllipse,
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
    ellipse: {
      ...baseEllipse,
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
    ellipse: {
      ...baseEllipse,
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
    ellipse: {
      ...baseEllipse,
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
    ellipse: {
      ...baseEllipse,
      fillColor: '#ff0000'
    }
  }
};

export const BlackBorderAndRedFill: Story = {
  ...Template,
  args: {
    ellipse: {
      ...baseEllipse,
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
    ellipse: {
      ...baseEllipse,
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
