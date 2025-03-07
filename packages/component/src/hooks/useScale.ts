/**
 * UseScale
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { useAtomValue, useSetAtom } from 'jotai';
import { ReadScaleAtom, SetZoomAtom } from '../atom/ReportAtom';


export default function useScale() {
  const scale = useAtomValue(ReadScaleAtom);
  const setZoom = useSetAtom(SetZoomAtom);

  return { scale, setZoom };
}
