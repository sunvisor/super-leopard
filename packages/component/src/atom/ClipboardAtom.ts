/**
 * ClipboardAtom
 *
 * Created by sunvisor on 2024/02/25.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { atom } from 'jotai';
import { Shapes } from '@sunvisor/super-leopard-core';

export const ClipboardAtom = atom<Shapes>(new Shapes([]));
