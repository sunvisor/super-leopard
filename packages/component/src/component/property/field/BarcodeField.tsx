/**
 * Barcode
 *
 * Created by sunvisor on 2025/02/14.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { BarcodeRotateType } from '@sunvisor/super-leopard-core';
import SvImage from './SvImage';
import { createBarcodeSvg } from '@sunvisor/super-leopard-barcode';

type Props = {
  format: string;
  value: string;
  rotate: BarcodeRotateType;
  includeText: boolean;
  errorImageUrl: string;
}

export default function BarcodeField(props: Props) {
  let dataUrl: string;
  try {
    const svg = createBarcodeSvg(props);
    dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  } catch (e) {
    dataUrl = props.errorImageUrl;
  }
  return (
    <SvImage
      src={dataUrl}
      alt={props.value}
    />
  );
}
