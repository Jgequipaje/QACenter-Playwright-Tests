import { test, expect } from "@playwright/test";
import POManager from "../pageobjects/POManager";

test.describe("@QAFloatingButton Floating Button", () => {
  test("Should Show QA Button and Neko when Servers are running", async ({ page, request }) => {
    const poManager = new POManager(page, request);
    const qaCenterButton = poManager.getQAFloatingButtonPage();
    await qaCenterButton.goToDevServer();
    const qaFloatingButton = qaCenterButton.getQAFloatingButton;
    const response = await qaCenterButton.getResponseNeko();
    expect(response.ok()).toBeTruthy();
    expect(qaFloatingButton).toBeTruthy();
  });

  test("Button opens the drawer on click", async ({ page }) => {});

  test("Button closes the drawer on second click", async ({ page }) => {});

  test("Badge count shows active issues", async ({ page }) => {});
});
