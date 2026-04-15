# QA Center — Playwright Test Suite

End-to-end test suite for [QA Center](https://github.com/Jgequipaje/QA-Center), a draggable floating panel for logging bugs, features, and notes directly inside your app.

Built with **Playwright** and **TypeScript** using the **Page Object Model** pattern.

---

## Structure

```
QACenterTests/
├── tests/
│   ├── pageobjects/
│   │   ├── POManager.ts           # Central facade — manages all page objects
│   │   ├── QAFloatingButtonPage.ts # Floating button visibility + API validation
│   │   ├── QADrawerPage.ts        # Drawer open/close interactions
│   │   └── NewFormPage.ts         # Issue, feature, and note form actions
│   ├── features/                  # BDD feature files (coming soon)
│   ├── utils/                     # Shared fixtures and helpers (coming soon)
│   ├── example.spec.ts
│   └── qacenter.spec.ts           # Main test spec
└── playwright.config.ts
```

---

## Test Coverage

| Tag | Test | Type |
|---|---|---|
| `@QAFloatingButton` | QA button and Neko asset are visible | UI + API |
| `@CreateFunctions @AddIssue` | Can add a new issue | UI |
| `@CreateFunctions @AddFeature` | Can add a new feature request | UI |
| `@CreateFunctions @AddNote` | Can add a new note | UI |

---

## Patterns Used

- **Page Object Model** — each UI area has its own typed class with locators and action methods
- **POManager Facade** — single entry point that instantiates and exposes all page objects
- **API Testing** — validates the Neko asset endpoint alongside UI assertions
- **Tag-based filtering** — tests are tagged (`@QAFloatingButton`, `@CreateFunctions`) for selective runs

---

## Prerequisites

- Node.js 18+
- QA Center dev server running on `http://localhost:5173`
- Neko server running on `http://localhost:3333`

---

## Run

```bash
# Install dependencies
npm install
npx playwright install

# Run all tests
npx playwright test --config QACenterTests/playwright.config.ts

# Run only floating button tests
npx playwright test --config QACenterTests/playwright.config.ts --grep @QAFloatingButton

# Run only create function tests
npx playwright test --config QACenterTests/playwright.config.ts --grep @CreateFunctions

# View HTML report
npx playwright show-report
```

---

## Tech Stack

- [Playwright](https://playwright.dev/) — E2E testing framework
- [TypeScript](https://www.typescriptlang.org/) — typed page objects and test data
- Page Object Model — maintainable test architecture
- GitHub Actions — CI pipeline runs tests on every PR

---

## Related

- [QA Center Repository](https://github.com/Jgequipaje/QA-Center)
- [Portfolio](https://www.byjeff.dev/projects/qa-center)
