// noinspection JSUnusedGlobalSymbols

/**
 * TextPanel Story
 *
 * Created by sunvisor on 2024/02/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import TextPanel from "./TextPanel";
import { Meta, StoryObj } from "@storybook/react";
import { TextData, UnitType } from '@sunvisor/super-leopard-core';
import { Box } from "@mui/material";
import { testFontList } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof TextPanel>;

const meta: Meta<typeof TextPanel> = {
  component: TextPanel,
  args: {
    onChangeValue: fn(),
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          m: 2,
        }}
      >
        <Story/>
      </Box>
    ),
  ],
};

const values: TextData = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  font: {
    family: "Helvetica",
    size: 12,
    style: "bold",
  },
  color: "#000000",
  align: "left",
  valign: "middle",
  multiLine: true,
  linePitch: 7,
  fitCell: false,
};

export const UnitMillimeter: Story = {
  args: {
    unit: UnitType.MILLIMETER,
    fontList: testFontList,
    values,
  },
};

export const UnitInch: Story = {
  args: {
    unit: UnitType.INCH,
    fontList: testFontList,
    values,
  },
};

export default meta;
