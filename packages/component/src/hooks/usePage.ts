/**
 * UsePage
 *
 * Created by sunvisor on 2025/03/07.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { useAtomValue } from 'jotai';
import { ReadPageAtom } from '@/atom/ReportAtom';


export default function usePage() {
  const page = useAtomValue(ReadPageAtom);

  return { page };
}
