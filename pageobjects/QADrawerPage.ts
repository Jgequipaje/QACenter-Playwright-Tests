import { type Locator, type Page } from "@playwright/test";

export class QADrawerPage {
  page: Page;
  qaCenter: Locator;
  issuesTab: Locator;
  featureTab: Locator;
  notesTab: Locator;
  cardTitle: Locator;
  category: Locator;
  closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.qaCenter = page.locator('button[title="QA Center"]');
    this.issuesTab = page.getByTestId("qa-tab-manual");
    this.featureTab = page.getByTestId("qa-tab-feature");
    this.notesTab = page.getByTestId("qa-tab-note");
    this.cardTitle = page
      .locator(".issueCard")
      .locator("[data-testid^='issue-card-title']")
      .first();
    this.category = page
      .locator(".issueCard")
      .locator("[data-testid^='issue-card-origin']")
      .first();
    this.closeButton = page.getByTestId("qa-drawer-close");
  }

  async goToQADrawer(): Promise<void> {
    await this.page.goto("http://localhost:5173/");
    await this.qaCenter.click();
  }

  async checkDrawerList(title: string, category: string): Promise<boolean> {
    const normalizedTitle = title.toLowerCase().trim();
    const normalizedCategory = category.toLowerCase().trim();

    switch (normalizedCategory) {
      case "issue":
        await this.issuesTab.click();
        break;
      case "feature":
        await this.featureTab.click();
        break;
      case "note":
        await this.notesTab.click();
        break;
      default:
        throw new Error("Invalid category");
    }

    const actualTitle = (await this.cardTitle.textContent())?.trim().toLowerCase() ?? "";
    const actualCategory = (await this.category.textContent())?.trim().toLowerCase() ?? "";

    const actualTitleFormatted = actualTitle ?? "";
    const actualCategoryFormatted = actualCategory.split(" ")[1] ?? "";

    console.log(actualTitleFormatted);
    console.log(normalizedTitle);
    console.log(actualCategoryFormatted);
    console.log(normalizedCategory);

    return (
      normalizedTitle === actualTitleFormatted && normalizedCategory === actualCategoryFormatted
    );
  }
}
