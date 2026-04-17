import { test, expect } from "@playwright/test";
import POManager from "../pageobjects/POManager";

const BASE_URL = "http://localhost:3333";

test.describe("@APIxUI Issue Visibility", () => {
  // API creates → UI shows
  test("Issue created via API appears in the drawer", async ({ page, request }) => {});

  // API deletes → UI reflects
  test("Issue deleted via API disappears from the drawer", async ({ page, request }) => {});

  // API patches → UI reflects
  test("Status changed via API reflects in the drawer", async ({ page, request }) => {});

  // UI creates → API confirms
  test("Issue created via UI persists in GET /api/qa-issues", async ({ page, request }) => {});
});
