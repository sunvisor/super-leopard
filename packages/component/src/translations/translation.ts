/**
 * Translation
 *
 * Created by sunvisor on 2025/03/08.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { ja, Translation } from './languages/ja';
import { en } from './languages/en';

export type Language = string;

let currentLanguage: Language = 'ja';
const translations = new Map<string, Translation>([
  ["ja", ja],
  ["en", en],
]);

export default function translation(): Translation {
  return translations.get(currentLanguage) || ja;
}

export function setLanguage(lang: string) {
  if (!translations.has(lang)) {
    throw new Error(`Unknown language: ${lang}`);
  }
  currentLanguage = lang;
}

export function addLanguage(lang: string, translation: Translation) {
  if (translations.has(lang)) {
    throw new Error(`Language already exists: ${lang}`);
  }
  translations.set(lang, translation);
}

type DeepPartial<T> = {
  [P in keyof T]?: Partial<T[P]>;
};

export function mergeLanguage(
  lang: string,
  newValues: DeepPartial<Translation>
): Translation {
  const target = translations.get(lang);
  if (!target) {
    throw new Error(`Unknown language: ${lang}`);
  }

  return Object.keys(newValues).reduce((acc, key) => {
    const typedKey = key as keyof Translation;
    return mergeSection(acc, typedKey, newValues[typedKey]!);
  }, target);
}

function mergeSection(target: Translation, key: keyof Translation, newValues: Partial<Translation[keyof Translation]>): Translation {
  return {
    ...target,
    [key]: {
      ...target[key],
      ...newValues,
    },
  };
}
