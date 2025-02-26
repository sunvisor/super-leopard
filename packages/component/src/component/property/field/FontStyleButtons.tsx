/**
 * FontStyleButtons
 *
 * Created by sunvisor on 2024/02/16.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React, { useCallback, useMemo } from "react";
import { FontStyleType, FontStyleValue, StyleValue } from '@sunvisor/super-leopard-core';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import getCaptions from '../../../captions/getCaptions';
import ToggleTools, { ToggleToolButton } from '../ToggleTools';
import { ChangeValueHandler } from '../usePropertyStates';


type Props = {
  name: string;
  value: FontStyleValue[] | undefined;
  multiLine?: boolean;
  onChangeValue: ChangeValueHandler<FontStyleValue[]>;
  enabledStyles: StyleValue[];
}

export default function FontStyleButtons(props: Props) {
  const { name, multiLine, enabledStyles, onChangeValue } = props;
  const value = props.value || [];
  const captions = getCaptions().fontProperty;

  const handleChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newStyle: FontStyleValue[]) => {
      onChangeValue(name, newStyle, true);
    }, [onChangeValue, name]
  );

  const buttons: ToggleToolButton[] = useMemo(() => [
      {
        icon: <FormatBoldIcon/>,
        value: FontStyleType.BOLD,
        title: captions.bold,
        disabled: !enabledStyles.includes('bold'),
      },
      {
        icon: <FormatItalicIcon/>,
        value: FontStyleType.ITALIC,
        title: captions.italic,
        disabled: !enabledStyles.includes('italic'),
      },
      {
        icon: <FormatUnderlinedIcon/>,
        value: FontStyleType.UNDERLINE,
        title: captions.underline,
        disabled: !enabledStyles.includes('underline') || multiLine,
      },
      {
        icon: <FormatStrikethroughIcon/>,
        value: FontStyleType.STRIKE,
        title: captions.strikethrough,
        disabled: !enabledStyles.includes('strike') || multiLine,
      }
    ],
    [captions.bold, captions.italic, captions.underline, enabledStyles, captions.strikethrough, multiLine]
  );

  return (
    <ToggleTools
      value={value}
      onChange={handleChange}
      buttons={buttons}
    />
  );
}
