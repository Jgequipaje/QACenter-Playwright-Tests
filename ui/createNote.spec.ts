import { test, expect } from "@playwright/test";
import POManager from "../pageobjects/POManager";
import { notes, notesMissingContent } from "../utils/testdata/notesTestData";

test.describe("@CreateFunctions @AddNote Create Note", () => {
  let poManager: POManager;
  let qaDrawer: ReturnType<POManager["getQADrawerPage"]>;
  let newFormPage: ReturnType<POManager["getNewFormPage"]>;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    qaDrawer = poManager.getQADrawerPage();
    newFormPage = poManager.getNewFormPage();
    await qaDrawer.goToQADrawer();
  });

  for (const note of notes) {
    test(`Should appear under Notes tab when ${note.title} is added`, async () => {
      await newFormPage.addNote(note);
      await qaDrawer.goToQADrawer();
      await qaDrawer.switchToTab("note");
      await expect(qaDrawer.getCardByTitle(note.title!)).toBeVisible();
    });
  }

  for (const missingContent of notesMissingContent) {
    test(`Should show a validation error when content is empty [${missingContent.id}]`, async () => {
      await newFormPage.addNote(missingContent);
      await expect(newFormPage.getValidationBannerByTitle("content")).toBeVisible();
    });
  }
});
