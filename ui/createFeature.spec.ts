import { test, expect } from "@playwright/test";
import POManager from "../pageobjects/POManager";
import { features, featuresMissingTitle } from "../utils/testdata/featuresTestData";

test.describe("@CreateFunctions @AddFeature Create Feature", () => {
  let poManager: POManager;
  let qaDrawer: ReturnType<POManager["getQADrawerPage"]>;
  let newFormPage: ReturnType<POManager["getNewFormPage"]>;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    qaDrawer = poManager.getQADrawerPage();
    newFormPage = poManager.getNewFormPage();
    await qaDrawer.goToQADrawer();
  });

  for (const feature of features) {
    test(`Should appear under Features tab when ${feature.name} is added`, async () => {
      await newFormPage.addFeature(feature);
      await qaDrawer.goToQADrawer();
      await qaDrawer.switchToTab("feature");
      await expect(qaDrawer.getCardByTitle(feature.name!)).toBeVisible();
    });
  }

  for (const missingTitle of featuresMissingTitle) {
    test(`Should show a validation error when title is empty [${missingTitle.id}]`, async () => {
      await newFormPage.addFeature(missingTitle);
      await expect(newFormPage.getValidationBannerByTitle("title")).toBeVisible();
    });
  }
});
