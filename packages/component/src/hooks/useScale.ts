/**
 * UseScale
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { useAtomValue } from 'jotai';
import { ReadScaleAtom } from '../atom/ReportAtom';


export default function useScale() {
  const scale = useAtomValue(ReadScaleAtom);

  return { scale };
}
