/**
 * SvImage
 *
 * Created by sunvisor on 2024/02/26.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import styled from '@emotion/styled';
import { Box } from '@mui/material';

type Props = {
  src: string;
  alt: string;
};

const ContainerDiv = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export default function SvImage({ src, alt }: Props) {
  return (
    <ContainerDiv>
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          objectFit: 'contain',
          width: '100%',
          height: '100%',
          objectPosition: 'left top',
        }}
      />
    </ContainerDiv>
  );
}
