/**
 * Environment
 *
 * Created by sunvisor on 2024/03/31.
 * Copyright (C) Sunvisor Lab. 2024.
 */


/**
 * Check if the user's device is a Mac.
 */
export function isMac() {
  return navigator.userAgent.toLowerCase().indexOf('mac') > -1;
}
