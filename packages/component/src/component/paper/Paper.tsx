/**
 * Paper
 *
 * Created by sunvisor on 2024/03/13.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { createPage, PageData } from '@sunvisor/super-leopard-core';
import { useAtomValue } from 'jotai/index';
import { ReadScaleAtom } from '../../atom/ReportAtom';
import { Page } from '@sunvisor/super-leopard-core';
import styled from '@emotion/styled';
import React from 'react';

type Props = {
  page: PageData | Page;
  children?: React.ReactNode;
}

const Outer = styled('div')({
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  maxHeight: '100%',
  backgroundColor: 'gray',
  overflow: 'auto',
  padding: '16px',
  boxSizing: 'border-box',
});

const Inner = styled('div')({
  backgroundColor: 'white',
  border: '1px solid black',
  position: 'relative',
  boxShadow: 'black 10px 10px 10px',
});


export default function Paper(props: Props) {
  const page = props.page instanceof Page ? props.page : createPage(props.page);
  const scale = useAtomValue(ReadScaleAtom);
  const width = scale.toPixel(page.width);
  const height = scale.toPixel(page.height);

  return (
    <Outer>
      <Inner style={{ width, height }}>
        {props.children}
      </Inner>
    </Outer>
  );
}
