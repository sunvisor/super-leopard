/**
 * ObjectList
 *
 * Created by sunvisor on 2024/03/12.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import React from 'react';
import { Box, List } from '@mui/material';
import {Shapes, Shape} from '@sunvisor/super-leopard-core';
import ObjectListItem from './ObjectListItem';

type Props = {
  shapes: Shapes;
  onClick: (shape: Shape, event: React.MouseEvent) => void;
  onSettingClick: (shape: Shape) => void;
}

export default function ObjectList(props: Props) {
  const { shapes, onClick, onSettingClick } = props;

  return (
    <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
      <List dense disablePadding>
        {
          shapes.map((item, index) =>
            <ObjectListItem
              key={index}
              shape={item}
              indent={1}
              onClick={onClick}
              onSettingClick={onSettingClick}
            />
          )
        }
      </List>
    </Box>
  );
}
