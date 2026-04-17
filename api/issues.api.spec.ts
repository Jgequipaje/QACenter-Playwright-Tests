import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3333";

test.describe("@API Issues API", () => {
  // GET /api/qa-issues
  test("GET all issues returns 200 and an array", async ({ request }) => {});

  // POST /api/qa-issues
  test("POST creates an issue with valid data", async ({ request }) => {});

  test("POST fails with no title — 400", async ({ request }) => {});

  test("POST fails with invalid severity — 400", async ({ request }) => {});

  test("POST fails with invalid status — 400", async ({ request }) => {});

  test("POST fails with invalid origin — 400", async ({ request }) => {});

  // PATCH /api/qa-issues/:id
  test("PATCH updates issue status", async ({ request }) => {});

  test("PATCH fails with invalid status — 400", async ({ request }) => {});

  test("PATCH non-existent issue — 404", async ({ request }) => {});

  // DELETE /api/qa-issues/:id
  test("DELETE removes an issue", async ({ request }) => {});

  test("DELETE non-existent issue — 404", async ({ request }) => {});
});
