import { test, expect } from "@playwright/test";
import POManager from "../pageobjects/POManager";
import { notes, notesMissingContent } from "../utils/testdata/notesTestData";

test.describe("@CreateFunctions @AddNote Create Note", () => {
  let poManager: POManager;
  let qaDrawer: ReturnType<POManager["getQADrawerPage"]>;
  let newFormPage: ReturnType<POManager["getNewFormPage"]>;

  test.beforeEach(({ page }) => {
    poManager = new POManager(page);
    qaDrawer = poManager.getQADrawerPage();
    newFormPage = poManager.getNewFormPage();
  });

  for (const note of notes) {
    test(`Can Add ${note.id}`, async () => {
      await qaDrawer.goToQADrawer();
      await newFormPage.addNote(note);
    });

    test(`${note.id} appears under Notes tab`, async () => {
      await qaDrawer.goToQADrawer();
      const isInList = await qaDrawer.checkDrawerList(note.title, "note");
      expect(isInList).toBeTruthy();
    });
  }

  for (const missingContent of notesMissingContent) {
    test(`Validation error shown when content of ${missingContent.id} is empty`, async () => {
      await qaDrawer.goToQADrawer();
      await newFormPage.addNote(missingContent);
      expect(await newFormPage.checkValidationError("content")).toBeTruthy();
    });
  }
});
