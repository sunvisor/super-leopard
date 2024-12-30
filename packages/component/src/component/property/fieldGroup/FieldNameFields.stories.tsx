// noinspection JSUnusedGlobalSymbols

/**
 * FieldNameFields Story
 *
 * Created by sunvisor on 2024/02/18.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import FieldNameFields from "./FieldNameFields";
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { fn } from '@storybook/test';


type Story = StoryObj<typeof FieldNameFields>

const meta: Meta<typeof FieldNameFields> = {
  component: FieldNameFields,
  decorators: [
    (Story) => (
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 2, m: 2 }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    onChangeName: fn(),
    onChangeType: fn(),
  }
};

export const Normal: Story = {
  args: {
    fieldName: '氏名',
    shapeType: 'text',
  }
};

export default meta;
