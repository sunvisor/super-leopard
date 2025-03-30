/**
 * UseZoom
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { useSetAtom } from 'jotai/index';
import { SetZoomAtom } from '@/atom/ReportAtom';


export default function useZoom() {
  const setZoom = useSetAtom(SetZoomAtom);

  return { setZoom };
}
