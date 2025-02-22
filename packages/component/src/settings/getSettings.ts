/**
 * GetSettings
 *
 * Created by sunvisor on 2025/02/20.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { defaultSettings, SettingData } from './';


let settings: SettingData;

export function getSettings() {
  return settings ?? defaultSettings;
}

export function setSettings(newSettings: SettingData) {
  settings = newSettings;
}
