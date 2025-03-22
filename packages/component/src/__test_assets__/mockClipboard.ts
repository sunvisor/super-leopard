/**
 * MockClipboard
 *
 * Created by sunvisor on 2025/03/22.
 * Copyright (C) Sunvisor Lab. 2025.
 */
export default function mockClipboard() {

  let clipboardValue: string | undefined = undefined;
  // noinspection JSUnusedGlobalSymbols
  const mock = {
    writeText: async (value: string) => clipboardValue = value,
    readText: async () => clipboardValue,
  };

  Object.defineProperty(global.navigator, 'clipboard', {
    value: mock,
    writable: true,
  });

  return clipboardValue;
}
