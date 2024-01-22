import { Page, expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { config } from "../support/config";
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  ConsoleMessage,
  request,
  BrowserContext,
  defineConfig,
} from "@playwright/test";

const { Given, When, Then, Before, After } = createBdd();

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDir = "traces";
let page: Page;
let context: BrowserContext;

Before(async function () {
  defineConfig({
    expect: {
      timeout: 2000,
    },
  });
  browser = await chromium.launch(config.browserOptions);
  context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: "screenshots" } : undefined,
    viewport: { width: 1200, height: 800 },
  });
  page = await context.newPage();
});

Given("Go to the playwright website", async function ({ page }) {
  await page.goto(config.BASE_URL);
});

After(async function () {
  page.close();
  browser.close();
});
