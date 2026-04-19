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
  card: Locator;

  constructor(page: Page) {
    this.page = page;
    this.qaCenter = page.locator('button[title="QA Center"]');
    this.issuesTab = page.getByTestId("qa-tab-issue");
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
    this.card = page.locator('button[data-testid^="issue-card"]');
  }

  async goToQADrawer(): Promise<void> {
    await this.page.goto("/");
    await this.qaCenter.click();
  }

  async switchToTab(category: "issue" | "feature" | "note"): Promise<void> {
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
  }

  getCardByTitle(title: string): Locator {
    return this.card.filter({
      has: this.page.locator('div[data-testid^="issue-card-title"]', { hasText: title }),
    });
  }

  getItemStatus(
    title: string,
    category: "issue" | "note" | "feature",
    status: "open" | "in_progress" | "ready_for_qa" | "verified" | "closed"
  ): Locator {
    const normalizedStatus = status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    return this.card
      .filter({
        has: this.page.locator('div[data-testid^="issue-card-title"]', { hasText: title }),
      })
      .filter({
        has: this.page.locator("span[data-testid^='issue-card-origin']", {
          hasText: category,
        }),
      })
      .filter({
        has: this.page.locator("span[data-testid^='issue-card-status']", {
          hasText: normalizedStatus,
        }),
      });
  }
}
