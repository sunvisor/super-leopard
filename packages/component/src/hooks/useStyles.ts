/**
 * UseStyles
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { useAtom, useAtomValue } from 'jotai';
import { BorderAtom, FillColorAtom, FontStyleAtom, StylesAtom } from '@/atom/StylesAtom';


export default function useStyles() {
  const [border, setBorder] = useAtom(BorderAtom);
  const [fillColor, setFillColor] = useAtom(FillColorAtom)
  const [font, setFont] = useAtom(FontStyleAtom);
  const styles = useAtomValue(StylesAtom);

  return {
    border,
    setBorder,
    fillColor,
    setFillColor,
    font,
    setFont,
    styles
  }
}
