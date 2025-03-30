/**
 * Environment
 *
 * Created by sunvisor on 2024/03/31.
 * Copyright (C) Sunvisor Lab. 2024.
 */

type KeyEvent = {
  ctrlKey: boolean;
  metaKey: boolean;
}

/**
 * Check if the user's device is a Mac.
 */
export function isMac() {
  return navigator.userAgent.toLowerCase().indexOf('mac') > -1;
}

export function isCmdOrCtrl(event: KeyEvent | Event ): boolean {
  const e = event as KeyEvent
  return isMac() ? e?.metaKey : e?.ctrlKey;
}
