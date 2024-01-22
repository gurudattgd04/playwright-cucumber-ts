import {
  LaunchOptions,
  defineConfig,
  PlaywrightTestConfig,
} from "@playwright/test";

export default defineConfig({
  expect: {
    timeout: 1000,
    toMatchSnapshot: {
      maxDiffPixels: 10,
    },
  },
});

const browserOptions: LaunchOptions = {
  slowMo: 0,
  args: [
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
  ],
  firefoxUserPrefs: {
    "media.navigator.streams.fake": true,
    "media.navigator.permission.disabled": true,
  },
  headless: false,
  timeout: 2000,
};

export const config = {
  browser: process.env.BROWSER || "chromium",
  browserOptions,
  BASE_URL: "https://playwright.dev",
  IMG_THRESHOLD: { threshold: 0.4 },
  BASE_API_URL: "https://catfact.ninja/",
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 500,

    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },
  },
};
