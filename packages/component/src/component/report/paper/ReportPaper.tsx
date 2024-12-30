/**
 * Paper
 *
 * Created by sunvisor on 2023/12/13.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import React from "react";
import { useAtomValue } from 'jotai';
import { ReadPageAtom } from '../../../atom/ReportAtom';
import Paper from '../../paper/Paper';

type Props = {
  children?: React.ReactNode;
}

export default function ReportPaper(props: Props) {
  const page = useAtomValue(ReadPageAtom);

  return (
    <Paper page={page}>
      {props.children}
    </Paper>
  );
}
