import POManager from "../pageobjects/POManager";
import { QAItemsClient } from "../framework/api/clients/qaItemsClient";
import { apiUiTest, expect } from "../utils/fixtures/apiUi.fixture";
import { issueSingleData } from "../utils/testdata/issuesTestData";

apiUiTest.describe("@APIxUI Issue Visibility", () => {
  let qaItemsClient: QAItemsClient;
  let poManager: POManager;
  let qaDrawer: ReturnType<POManager["getQADrawerPage"]>;
  let newFormPage: ReturnType<POManager["getNewFormPage"]>;
  const createdTestItems: string[] = [];

  apiUiTest.beforeEach(async ({ page, request }) => {
    qaItemsClient = new QAItemsClient(request);
    poManager = new POManager(page);
    qaDrawer = poManager.getQADrawerPage();
    newFormPage = poManager.getNewFormPage();
  });

  apiUiTest.afterEach(async () => {
    for (const id of createdTestItems) {
      await qaItemsClient.deleteItemById(id);
    }
  });

  apiUiTest(
    "Should Create an Issue via API and appears in the drawer when valid inputs",
    async () => {
      const response = await qaItemsClient.createItem({
        origin: "issue",
        status: "open",
        title: `API X UI Issue ${Date.now()}`,
        description: "API X UI Issue",
        severity: "critical",
        area: "dark mode",
        reproSteps: "test",
        expected: "test",
        actual: "test",
      });
      expect(response.status()).toBe(201);
      await qaDrawer.goToQADrawer();
      const data = await response.json();
      createdTestItems.push(data.id);

      await qaDrawer.switchToTab(data.origin);
      await expect(qaDrawer.getCardByTitle(data.title)).toBeVisible();
    }
  );

  apiUiTest("Should Delete an Issue via API and disappears from the drawer", async () => {
    const response = await qaItemsClient.createItem({
      origin: "issue",
      status: "open",
      title: `API X UI Delete An Issue ${Date.now()}`,
      description: "API X UI Issue",
      severity: "critical",
      area: "dark mode",
      reproSteps: "test",
      expected: "test",
      actual: "test",
    });
    expect(response.status()).toBe(201);
    await qaDrawer.goToQADrawer();
    const data = await response.json();

    await qaDrawer.switchToTab(data.origin);
    await expect(qaDrawer.getCardByTitle(data.title)).toBeVisible();

    const responseDelete = await qaItemsClient.deleteItemById(data.id);
    expect(responseDelete.status()).toBe(200);
    await qaDrawer.switchToTab(data.origin);
    await expect(qaDrawer.getCardByTitle(data.title)).toBeHidden();
  });

  apiUiTest("Should Edit Status via API and reflects in the drawer", async () => {
    const response = await qaItemsClient.createItem({
      origin: "feature",
      title: `API X UI Test For PATCH ${Date.now()}`,
      status: "open",
      description: "User can switch between dark and light mode",
      severity: "high",
      area: "settings",
      notes: "- Given user is on settings\n- When they toggle theme\n- Then UI updates",
    });
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect((await qaItemsClient.getQAItem(data.id)).status()).toBe(200);

    const editResponse = await qaItemsClient.editItemById(data.id, {
      status: "ready_for_qa",
    });
    expect(editResponse.status()).toBe(200);
    const editResponseJSON = await editResponse.json();
    createdTestItems.push(data.id);

    await qaDrawer.goToQADrawer();
    await expect(
      qaDrawer.getItemStatus(
        editResponseJSON.title,
        editResponseJSON.origin,
        editResponseJSON.status
      )
    ).toBeVisible();
  });

  apiUiTest("Should Create an Issue via UI persists in GET /api/qa-items", async () => {
    const inputData = issueSingleData[0];
    await qaDrawer.goToQADrawer();
    await newFormPage.addIssue(inputData);
    const response = await qaItemsClient.getQAItems();
    expect(response.status()).toBe(200);

    const data = await response.json();
    const found = data.find(
      (item: { title: string | undefined }) => item.title === inputData.title
    );
    expect(found).toBeDefined();
    createdTestItems.push(found.id);
  });
});
