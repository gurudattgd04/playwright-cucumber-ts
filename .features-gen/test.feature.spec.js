/** Generated from: features/test.feature */
import { test } from "playwright-bdd";

test.describe("Playwright docs", () => {

  test("Change theme", async ({ Given, page, Then }) => {
    await Given("Go to the playwright website", null, { page });
    await Then("I should see the page \"Fast and reliable end-to-end testing for modern web apps | Playwright\"", null, { page });
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $bddWorldFixtures: ({ page, context, browser, browserName, request }, use) => use({ page, context, browser, browserName, request }),
});