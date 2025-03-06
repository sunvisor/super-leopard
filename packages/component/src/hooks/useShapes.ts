/**
 * UseShapes
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { useAtomValue, useSetAtom } from 'jotai';
import { ReadShapesAtom, SetShapesAtom } from '../atom/ReportAtom';


export default function useShapes() {
  const shapes = useAtomValue(ReadShapesAtom);
  const setShapes = useSetAtom(SetShapesAtom);

  return { shapes, setShapes };
}
