import { expect, defineConfig } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then, Before, After } = createBdd();

Then(
  "I should see the page {string}",
  async function ({ page }, expectedResponse) {
    console.log("Page object :", page);
    await expect(page).toHaveTitle(expectedResponse);
  }
);
