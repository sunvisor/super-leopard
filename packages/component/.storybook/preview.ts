import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from 'msw-storybook-addon';


initialize({
  onUnhandledRequest(req, p) {
    const hiddenWarningPattern = new RegExp('iframe.bundle.js', 'g');
    if (hiddenWarningPattern.test(req.url)) {
      return;
    }
    p.warning();
  },
});

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

// noinspection JSUnusedGlobalSymbols
export default preview;
