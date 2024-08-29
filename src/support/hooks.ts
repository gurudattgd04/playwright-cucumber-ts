import { Page } from "@playwright/test"
import { createBdd } from "playwright-bdd"
import { DataTable } from "@cucumber/cucumber"
import {
  chromium,
  ChromiumBrowser,
  FirefoxBrowser,
  WebKitBrowser,
  BrowserContext
} from "@playwright/test"

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser
let page: Page
let context: BrowserContext
const { Before, After } = createBdd()

Before(async function() {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build GD',
      'name': 'Playwright Sample Test GD',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true
    }
  }

   const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })
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
