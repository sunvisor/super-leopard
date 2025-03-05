// noinspection JSUnusedGlobalSymbols

/**
 * EditToolbar Story
 *
 * Created by sunvisor on 2024/02/02.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import EditToolbar from "./EditToolbar";
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import NoteAddIcon from '@mui/icons-material/NoteAdd';


type Story = StoryObj<typeof EditToolbar>

const meta: Meta<typeof EditToolbar> = {
  component: EditToolbar,
  args: {
    onSave: fn(),
    onPropertyOpen: fn(),
    onChangeTitle: fn(),
  }
};

export const Normal: Story = {
  args: {
    title: 'Title',
  }
};

export const Before: Story = {
  args: {
    title: 'Title',
    additionalTools: {
      before: <><NoteAddIcon /><FileOpenIcon /></>,
    },
  }
}

export const BeforeAfter: Story = {
  args: {
    title: 'Title',
    additionalTools: {
      before: <NoteAddIcon />,
      after: <FileOpenIcon />,
    },
  }
};

export const After: Story = {
  args: {
    title: 'Title',
    additionalTools: {
      after: <><NoteAddIcon /><FileOpenIcon /></>,
    },
  }
}

export const HideSaveButton: Story = {
  args: {
    title: 'Title',
    showSaveButton: false,
  }
}

export default meta;
export const HideSaveButtonAndAfter: Story = {
  args: {
    title: 'Title',
    showSaveButton: false,
    additionalTools: {
      after: <><NoteAddIcon /><FileOpenIcon /></>,
    },
  }
}

