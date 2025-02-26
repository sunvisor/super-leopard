import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  staticDirs: [
    "../storybook-static",
  ],

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};

// noinspection JSUnusedGlobalSymbols
export default config;

