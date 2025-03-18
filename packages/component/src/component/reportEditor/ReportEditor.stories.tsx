// noinspection JSUnusedGlobalSymbols

/**
 * Editor Story
 *
 * Created by sunvisor on 2024/02/08.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import ReportEditor from "./ReportEditor";
import { Meta, StoryObj } from '@storybook/react';
import { createStore, Provider } from 'jotai';
import { expect, fn, waitFor, within } from '@storybook/test';
import { emptyReport } from '../emptyReport';
import { SetReportAtom } from '../../atom/ReportAtom';
import imageHandlers from '../../__test_assets__/msw/imageHandlers';
import { testImageListData } from '../../__test_assets__';
import { testSettings } from '../../__test_assets__/settings';
import { billTestData, en } from '@sunvisor/super-leopard-test-assets';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import useReportStates from './hooks/useReportStates';
import { useEffect } from 'react';


type Story = StoryObj<typeof ReportEditor>

const store = createStore();

// test for useReportStates
function Flame({ children } : { children: any}) {
  const {report, dirty} = useReportStates();
  useEffect(() => {
    console.log('report', report);
    console.log('dirty', dirty);
  }, [report ,dirty]);

  return (
    <>
      {children}
    </>
  );
}

const meta: Meta<typeof ReportEditor> = {
  component: ReportEditor,
  title: 'component/reportEditor/ReportEditor',
  decorators: [
    (Story) => {
      store.set(SetReportAtom, emptyReport);

      return (
        <Provider store={store}>
          <div data-testid="test" style={{ width: '100vw', height: '100vh' }}>
            <Flame>
              <Story/>
            </Flame>
          </div>
        </Provider>
      );
    }
  ],
  parameters: {
    msw: {
      handlers: imageHandlers(testImageListData),
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByTestId("test");
    await waitFor(async () => {
      await expect(el.querySelectorAll(".layer")).toHaveLength(2);
    });
  },
  args: {
    settings: testSettings,
    onSave: fn(),
    onChangeTitle: fn(),
  }
};

export const Bill: Story = {
  args: {
    title: 'Bill',
    report: billTestData,
    language: 'ja',
  }
}

export const InEnglish: Story = {
  args: {
    title: 'Bill',
    report: en.billTestData,
    language: 'en',
  }
}

export const Empty: Story = {
  args: {
    title: 'Empty',
    language: 'ja',
  }
}

export const AdditionalTools: Story = {
  args: {
    title: 'Empty',
    language: 'ja',
    additionalTools: {
      before: <NoteAddIcon />,
      after: <FileOpenIcon />,
    }
  }
}

export const HideSaveButton: Story = {
  args: {
    title: 'Empty',
    language: 'ja',
    showSaveButton: false,
  }
}

export const AnotherSettings: Story = {
  args: {
    title: 'Bill',
    report: billTestData,
    language: 'ja',
    settings: {
      ...testSettings,
      boundingBox: {
        handleSize: 8,
        stroke: {
          color: '#ff8888',
          width: 2,
          cap: 'round',
          join: 'round',
          style: 'solid'
        }
      },
      designMode: {
        ...testSettings.designMode,
        fieldBorder: '#88ff88',
        textBorder: '#8080ff',
      }
    },
  }
}

export default meta;
