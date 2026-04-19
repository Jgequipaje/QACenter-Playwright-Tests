import { test, expect } from "@playwright/test";
import POManager from "../pageobjects/POManager";
import {
  issues,
  issuesMissingTitle,
  issuesMissingDescription,
} from "../utils/testdata/issuesTestData";

test.describe("@CreateFunctions @AddIssue Create Issue", () => {
  let poManager: POManager;
  let qaDrawer: ReturnType<POManager["getQADrawerPage"]>;
  let newFormPage: ReturnType<POManager["getNewFormPage"]>;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    qaDrawer = poManager.getQADrawerPage();
    newFormPage = poManager.getNewFormPage();
    await qaDrawer.goToQADrawer();
  });

  for (const issue of issues) {
    test(`Should appear under Issues tab when ${issue.title} is added`, async () => {
      await newFormPage.addIssue(issue);
      await qaDrawer.goToQADrawer();
      await qaDrawer.switchToTab("issue");
      await expect(qaDrawer.getCardByTitle(issue.title!)).toBeVisible();
    });
  }

  for (const missingTitle of issuesMissingTitle) {
    test(`Should show a validation error when title is empty [${missingTitle.id}]`, async () => {
      await newFormPage.addIssue(missingTitle);
      await expect(newFormPage.getValidationBannerByTitle("title")).toBeVisible();
    });
  }

  for (const missingDescription of issuesMissingDescription) {
    test(`Should show a validation error when description is empty [${missingDescription.id}]`, async () => {
      await newFormPage.addIssue(missingDescription);
      await expect(newFormPage.getValidationBannerByTitle("description")).toBeVisible();
    });
  }
});
