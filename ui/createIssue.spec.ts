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

  test.beforeEach(({ page }) => {
    poManager = new POManager(page);
    qaDrawer = poManager.getQADrawerPage();
    newFormPage = poManager.getNewFormPage();
  });

  for (const issue of issues) {
    test(`Can Add ${issue.id}`, async () => {
      await qaDrawer.goToQADrawer();
      await newFormPage.addIssue(issue);
    });

    test(`${issue.id} appears in list after creation`, async () => {
      await qaDrawer.goToQADrawer();
      const isInList = await qaDrawer.checkDrawerList(issue.title!, "issue");
      expect(isInList).toBeTruthy();
    });
  }

  for (const missingTitle of issuesMissingTitle) {
    test(`Validation error shown when title of ${missingTitle.id} is empty`, async () => {
      await qaDrawer.goToQADrawer();
      await newFormPage.addIssue(missingTitle);
      expect(await newFormPage.checkValidationError("title")).toBeTruthy();
    });
  }

  for (const missingDescription of issuesMissingDescription) {
    test(`Validation error shown when description of ${missingDescription.id} is empty`, async () => {
      await qaDrawer.goToQADrawer();
      await newFormPage.addIssue(missingDescription);
      expect(await newFormPage.checkValidationError("description"));
    });
  }
});
