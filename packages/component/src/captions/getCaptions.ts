/**
 * Captions
 *
 * Created by sunvisor on 2024/02/14.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { ja as ja, Captions } from './languages/ja';
import { en as en } from './languages/en';

export type Language = string;

let currentLanguage: Language = 'ja';
const translations: Record<string, Captions> = { ja, en };

export default function getCaptions(): Captions {
  return translations[currentLanguage];
}

export function setLanguage(lang: string) {
  if (!translations[lang]) {
    throw new Error(`Unknown language: ${lang}`);
  }
  currentLanguage = lang;
}

export function addLanguage(lang: string, captions: Captions) {
  translations[lang] = captions;
}
