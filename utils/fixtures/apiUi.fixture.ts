import { test as base, request as playwrightRequest } from "@playwright/test";
import { QAItemsClient } from "../../framework/api/clients/qaItemsClient";

export const apiUiTest = base.extend<{ qaItemsClient: QAItemsClient }>({
  qaItemsClient: async ({}, use) => {
    const apiContext = await playwrightRequest.newContext({
      baseURL: "http://localhost:3333",
    });
    await use(new QAItemsClient(apiContext));
    await apiContext.dispose();
  },
});

export { expect } from "@playwright/test";
