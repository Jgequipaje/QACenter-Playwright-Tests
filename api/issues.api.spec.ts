import { QAItemsClient } from "../framework/api/clients/qaItemsClient";
import { apiTest, expect } from "../framework/api/fixtures/api.fixture";

apiTest.describe("@API Issues API", () => {
  let qaItemsClient: QAItemsClient;

  apiTest.beforeEach(async ({ request }) => {
    qaItemsClient = new QAItemsClient(request);
  });

  // GET /api/qa-items
  apiTest("Should return 200 and an array when GET /api/qa-items is called", async () => {
    const response = await qaItemsClient.getQAItems({ origin: "note" });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toMatchObject({ origin: "note" });
  });

  // POST /api/qa-items
  apiTest("Should return 201 and an array when POST /api/qa-items is called", async () => {
    const response = await qaItemsClient.createItem({
      origin: "feature",
      title: "API Test 2",
      status: "open",
      description: "User can switch between dark and light mode",
      severity: "high",
      area: "settings",
      notes: "- Given user is on settings\n- When they toggle theme\n- Then UI updates",
    });
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data).toMatchObject({ origin: "feature" });
  });

  apiTest("Should return 400 when POST /api/qa-items with missing title", async () => {
    const response = await qaItemsClient.createItem({
      origin: "issue",
      status: "open",
      description: "sample description",
      severity: "critical",
      area: "dark mode",
      reproSteps: "test",
      expected: "test",
      actual: "test",
    });
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toEqual("Title is required.");
  });

  apiTest("Should return 400 when POST /api/qa-items with invalid severity", async () => {
    const response = await qaItemsClient.createItemRaw({
      title: "Dark Mode",
      origin: "issue",
      status: "open",
      description: "sample description",
      severity: "go lang",
      area: "dark mode",
      reproSteps: "test",
      expected: "test",
      actual: "test",
    });
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toEqual("Invalid severity value.");
  });

  apiTest("Should return 400 when POST /api/qa-items with invalid status", async () => {
    const response = await qaItemsClient.createItemRaw({
      title: "Dark Mode",
      origin: "issue",
      status: "opened",
      description: "sample description",
      severity: "critical",
      area: "dark mode",
      reproSteps: "test",
      expected: "test",
      actual: "test",
    });
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toEqual("Invalid status value.");
  });

  apiTest("Should return 400 when POST /api/qa-items with invalid origin", async () => {
    const response = await qaItemsClient.createItemRaw({
      title: "Dark Mode",
      origin: "chismis",
      status: "open",
      description: "sample description",
      severity: "critical",
      area: "dark mode",
      reproSteps: "test",
      expected: "test",
      actual: "test",
    });
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toEqual("Invalid origin value.");
  });

  // PATCH /api/qa-items/:id
  apiTest("Should return 200 when PATCH /api/qa-items/:id is called", async () => {
    const createIssueResponse = await qaItemsClient.createItem({
      origin: "issue",
      status: "open",
      title: "Sample Test",
      description: "sample description",
      severity: "critical",
      area: "dark mode",
      reproSteps: "test",
      expected: "test",
      actual: "test",
    });
    const createdIssueJSON = await createIssueResponse.json();
    const createdIssueId = createdIssueJSON.id;
    const response = await qaItemsClient.editItemById(createdIssueId, {
      title: "Sample Test - Edited Today",
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toMatchObject({ origin: "issue", title: "Sample Test - Edited Today" });
  });

  apiTest(
    "Should return 404 when PATCH /api/qa-items/:id is called and cannot find that id",
    async () => {
      const response = await qaItemsClient.editItemById("issue-nonexistent-000", {
        title: "dsad - edited",
        status: "closed",
        description: "sadas - edited",
        area: "sadas - edited",
      });
      expect(response.status()).toBe(404);
      const data = await response.json();
      expect(data.error).toEqual("Not found.");
    }
  );

  // DELETE /api/qa-items/:id
  apiTest("Should return 200 when DELETE /api/qa-items/:id is called", async () => {
    const response = await qaItemsClient.createItem({
      origin: "feature",
      title: "API Test For Deletion",
      status: "open",
      description: "User can switch between dark and light mode",
      severity: "high",
      area: "settings",
      notes: "- Given user is on settings\n- When they toggle theme\n- Then UI updates",
    });
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect((await qaItemsClient.getQAItem(data.id)).status()).toBe(200);
    const deleteItemResponse = await qaItemsClient.deleteItemById(data.id);
    expect(deleteItemResponse.status()).toBe(200);
    expect((await qaItemsClient.getQAItem(data.id)).status()).toBe(404);
  });

  apiTest(
    "Should return 404 when DELETE /api/qa-items/:id is called and cannot find that id",
    async () => {
      const response = await qaItemsClient.deleteItemById("issue-1776500282552-d3522e5d");
      expect(response.status()).toBe(404);
    }
  );
});
