/**
 * Captions
 *
 * Created by sunvisor on 2024/02/14.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { captions as ja } from './ja/captions';
import { captions as en } from './en/captions';

export type Language = 'ja' | 'en';

class Captions {
  #language: Language = 'ja';

  public setLanguage(lang: Language) {
    this.#language = lang;
  }

  public getCaptions() {
    if (this.#language === 'ja') {
      return ja;
    } else {
      return en;
    }
  }
}

const captions = new Captions();

export default function getCaptions()  {
  return captions.getCaptions()
}

export function setLanguage(lang: string) {
  captions.setLanguage(lang === 'en' ? 'en' : 'ja');
}
