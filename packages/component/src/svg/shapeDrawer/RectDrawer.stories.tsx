// noinspection JSUnusedGlobalSymbols

/**
 * DrawRect Story
 *
 * Created by sunvisor on 2023/11/26.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from "@storybook/test";
import { RectDrawer } from './RectDrawer';
import { createRect, createScale, RectData, RectShape, UnitType } from '@sunvisor/super-leopard-core';
import { createTestSvgDrawer } from '@/__test_assets__';

type RectProps = {
  rect: RectData;
  opacity?: number;
}

type Story = StoryObj<RectProps>

const meta: Meta<RectProps> = {
  title: 'svg/RectDrawer',
};

const Template: Story = {
  render: () => (
    <div data-testid="test">
    </div>
  ),

  play: async ({ canvasElement, args } ) => {
    const el = draw(canvasElement, args);
    // Assert
    await expect(el.querySelector('rect')).toBeInTheDocument();
  }
}

function draw(canvasElement: HTMLElement, args: RectProps) {
  const canvas = within(canvasElement);
  const el = canvas.getByTestId('test');
  const svg = createTestSvgDrawer(el);
  const scale = createScale({ unit: UnitType.MILLIMETER, zoom: 1, precision: 2, pointPrecision: 2 });
  const rect = createRect(args.rect);
  const drawer = new RectDrawer({ svg, scale });
  drawer.draw(rect, { opacity: args.opacity ?? 1});
  return el;
}

export const SolidBorder: Story = {
  ...Template,
  args: {
    rect: {
      type: RectShape,
      x: 10,
      y: 5,
      width: 50,
      height: 10,
      border: {
        width: 0.25,
        color: '#000000',
        style: 'solid',
        join: 'miter',
      }
    }
  }
};

export const BoldBorder: Story = {
  ...Template,
  args: {
    rect: {
      type: RectShape,
      x: 10,
      y: 5,
      width: 50,
      height: 10,
      border: {
        width: 2,
        color: '#000000',
        style: 'solid',
        join: 'miter',
      }
    }
  }
};

export const DashedBorder: Story = {
  ...Template,
  args: {
    rect: {
      type: RectShape,
      x: 10,
      y: 5,
      width: 50,
      height: 10,
      border: {
        width: 0.25,
        color: '#000000',
        style: 'dashed',
        join: 'miter',
      }
    }
  }
};

export const DottedBorder: Story = {
  ...Template,
  args: {
    rect: {
      type: RectShape,
      x: 10,
      y: 5,
      width: 50,
      height: 10,
      border: {
        width: 0.25,
        color: '#000000',
        style: 'dotted',
        join: 'miter',
      }
    }
  }
};

export const RedBorder: Story = {
  ...Template,
  args: {
    rect: {
      type: RectShape,
      x: 10,
      y: 5,
      width: 50,
      height: 10,
      border: {
        width: 0.25,
        color: '#ff0000',
        style: 'solid',
        join: 'miter',
      }
    }
  }
};

export const RedFill: Story = {
  ...Template,
  args: {
    rect: {
      type: RectShape,
      x: 10,
      y: 5,
      width: 50,
      height: 10,
      fillColor: '#ff0000',
    }
  }
};

export const BlackBorderAndRedFill: Story = {
  ...Template,
  args: {
    rect: {
      type: RectShape,
      x: 10,
      y: 5,
      width: 50,
      height: 10,
      border: {
        width: 2,
        color: '#000000',
        style: 'solid',
        join: 'miter',
      },
      fillColor: '#ff0000',
    }
  }
};

export const Opacity: Story = {
  ...Template,
  args: {
    rect: {
      type: RectShape,
      x: 10,
      y: 5,
      width: 50,
      height: 10,
      border: {
        width: 2,
        color: '#000000',
        style: 'solid',
        join: 'miter',
      },
      fillColor: '#ff0000',
    },
    opacity: 0.5,
  }
};

export const JoinMiter: Story = {
  ...Template,
  args: {
    rect: {
      type: RectShape,
      x: 10,
      y: 5,
      width: 50,
      height: 10,
      border: {
        width: 7,
        color: '#000000',
        style: 'solid',
        join: 'miter',
      },
      fillColor: '#ff0000',
    },
  }
}
export const JoinBevel: Story = {
  ...Template,
  args: {
    rect: {
      type: RectShape,
      x: 10,
      y: 5,
      width: 50,
      height: 10,
      border: {
        width: 7,
        color: '#000000',
        style: 'solid',
        join: 'bevel',
      },
      fillColor: '#ff0000',
    },
  }
}

export const JoinRound: Story = {
  ...Template,
  args: {
    rect: {
      type: RectShape,
      x: 10,
      y: 5,
      width: 50,
      height: 10,
      border: {
        width: 7,
        color: '#000000',
        style: 'solid',
        join: 'round',
      },
      fillColor: '#ff0000',
    },
  }
}
export default meta;
