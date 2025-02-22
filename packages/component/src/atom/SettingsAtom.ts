/**
 * SettingsAtom
 *
 * Created by sunvisor on 2024/02/09.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { atom } from 'jotai';
import { BoundingBoxOptions, defaultSettings, DefaultShapeSize, RubberBandOptions, SettingData } from '../settings';
import { LineSelectOptions } from '@sunvisor/super-leopard-core';
import { WebFontMap } from '../font';

class DesignModeOptions {
}

type UpdateSettingData = {
  boundingBox?: Partial<BoundingBoxOptions>;
  rubberBand?: Partial<RubberBandOptions>;
  lineSelect?: Partial<LineSelectOptions>;
  /**
   * default shape size by point
   */
  defaultShapeSize?: Partial<DefaultShapeSize>;
  designMode?: Partial<DesignModeOptions>;
}

export const SettingsAtom = atom<SettingData>(defaultSettings);

export const UpdateSettingsAtom = atom(null, (get, set, settings: UpdateSettingData) => {
  const original = get(SettingsAtom);
  if (settings.boundingBox) {
    original.boundingBox = {
      ...original.boundingBox,
      ...settings.boundingBox
    }
  }
  if (settings.rubberBand) {
    original.rubberBand = {
      ...original.rubberBand,
      ...settings.rubberBand
    }
  }
  if (settings.lineSelect) {
    original.lineSelect = {
      ...original.lineSelect,
      ...settings.lineSelect
    }
  }
  if (settings.defaultShapeSize) {
    original.defaultShapeSize = {
      ...original.defaultShapeSize,
      ...settings.defaultShapeSize
    }
  }
  if (settings.designMode) {
    original.designMode = {
      ...original.designMode,
      ...settings.designMode
    }
  }
  set(SettingsAtom, original);
});

export const SetFontMapAtom = atom(null, (get, set, fontMap: WebFontMap) => {
  set(SettingsAtom, { ...get(SettingsAtom), fontMap });
});
