import { Page, expect } from "@playwright/test"
import { createBdd } from "playwright-bdd"
const playwright = require("playwright")
import { config } from "../support/config"
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
  defineConfig
} from "@playwright/test"

let tracesDir = "traces"
let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser
let page: Page
let context: BrowserContext
const { Given, When, Then, Before, After } = createBdd()

Before(async function() {
  defineConfig({
    expect: {
      timeout: 2000
    }
  })
  browser = await chromium.launch(config.browserOptions)
  context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: "screenshots" } : undefined,
    viewport: { width: 1200, height: 800 }
  })
  page = await context.newPage()
})

After(async function() {
  page.close()
  browser.close()
})
