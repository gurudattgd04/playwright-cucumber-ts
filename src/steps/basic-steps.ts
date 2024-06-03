import { Page, expect } from "@playwright/test"
import { createBdd } from "playwright-bdd"
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
import { DataTable } from "@cucumber/cucumber"

const { Given, When, Then, Before, After } = createBdd()

Given("Go to the playwright website", async function({ page }) {
  await page.goto(config.BASE_URL)
})

When("I visit lambdatest playground", async function({ page }) {
  await page.goto("https://ecommerce-playground.lambdatest.io/")
})

When("I access HTC product", async function({ page }) {
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=product/product&path=57&product_id=28"
  )
})

When("I visit lambdatest playground login page", async function({ page }) {
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
  )
})

When("I search for product {string}", async function({ page }, searchItem) {
  await page.locator("#main-header [name='search']").fill("ipod shuffle")
  await page.locator("#main-header .search-button button").click()
})

Then("I should see {int} products in the search result page", async function({
  page
}) {
  await expect(
    page.locator(".content-products .product-layout .title")
  ).toHaveCount(4)
})

When("I login with username {string} and password {string}", async function(
  { page },
  username,
  password
) {
  await page.locator("[name='email']").fill(username)
  await page.locator("[name='password']").fill(password)
  const requestTest = page.waitForResponse(async res => {
    if (res.url().includes("/index.php")) {
      return true
    }
    return false
  })
  await page.getByRole("button", { name: "Login" }).click()
  await requestTest.then(request => {
    console.log(request)
  })
})

When("I logout", async function({ page }) {
  await page.getByRole("button", { name: " My account" }).hover()
  await page.getByRole("link", { name: "Logout", exact: true }).click()
})

Then("I should see product details", async function(
  { page },
  dataTable: DataTable
) {
  await Promise.all(
    Object.keys(dataTable.rowsHash()).map(async key => {
      const value = await page
        .locator(
          `//li/span[contains(@class, 'ls-label') and contains(text(), '${key}')]/following-sibling::*[1]`
        )
        .innerText()
      console.log("value is: ", value)
      await expect(value).toBe(await dataTable.rowsHash()[key])
    })
  )
})
