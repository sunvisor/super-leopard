// noinspection JSUnusedGlobalSymbols

/**
 * FontFields Story
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import FontFields from "./FontFields";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { fontList } from '../../../__test_assets__';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof FontFields>;

const meta: Meta<typeof FontFields> = {
  component: FontFields,
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
        <Story />
      </Box>
    ),
  ],
};

export const UnitMillimeter: Story = {
  args: {
    fontFamily: "Helvetica",
    fontSize: 12,
    fontStyle: ["bold"],
    fontList,
  },
};

export default meta;
