import { test as base, request } from "@playwright/test";
import { QAItemsClient } from "../clients/qaItemsClient";

type ApiFixtures = {
  qaItemsClient: QAItemsClient;
};

export const apiTest = base.extend<ApiFixtures>({
  qaItemsClient: async ({}, use) => {
    const apiContext = await request.newContext({
      baseURL: "http://localhost:3333",
    });

    await use(new QAItemsClient(apiContext));
    await apiContext.dispose();
  },
});

export { expect } from "@playwright/test";
