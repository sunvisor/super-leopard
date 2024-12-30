/**
 * UploadButton
 *
 * Created by sunvisor on 2024/02/17.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ChangeEvent } from "react";
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';

export type ChangeFileHandler = (name: string, file: File) => void;

type Props = {
  name: string;
  label: string;
  onChangeFile: ChangeFileHandler;
}

const VisuallyHiddenInput = styled('input')({
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadButton(props: Props) {
  const { name, label, onChangeFile } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onChangeFile(name, event.target.files[0]);
    }
  }

  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      {label}
      <VisuallyHiddenInput
        type="file"
        name={name}
        accept="image/*"
        onChange={handleChange}
      />
    </Button>
  );
}
