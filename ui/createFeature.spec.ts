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
  });

  for (const feature of features) {
    test(`Can Add ${feature.name}`, async () => {
      await qaDrawer.goToQADrawer();
      await newFormPage.addFeature(feature);
    });

    test(`Feature: ${feature.name} appears under Features tab`, async () => {
      await qaDrawer.goToQADrawer();
      const isInList = await qaDrawer.checkDrawerList(feature.name!, "feature");
      expect(isInList).toBeTruthy();
    });
  }

  for (const missingTitle of featuresMissingTitle) {
    test(`${missingTitle.id} - Validation error shown when title is empty`, async () => {
      await qaDrawer.goToQADrawer();
      await newFormPage.addFeature(missingTitle);
      expect(await newFormPage.checkValidationError("title")).toBeTruthy();
    });
  }
});
