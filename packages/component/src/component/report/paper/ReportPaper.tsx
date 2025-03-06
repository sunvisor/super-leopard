/**
 * Paper
 *
 * Created by sunvisor on 2023/12/13.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import React from "react";
import Paper from '../../paper/Paper';
import usePage from '../../../hooks/usePage';

type Props = {
  children?: React.ReactNode;
}

export default function ReportPaper(props: Props) {
  const { page } = usePage();

  return (
    <Paper page={page}>
      {props.children}
    </Paper>
  );
}
