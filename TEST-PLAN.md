# QA Center — Test Plan

Track features, their test coverage, and automation status.

**Status legend:**

- ✅ Automated
- 🔄 In Progress
- ⬜ Not yet automated
- ❌ Skip (manual only)

---

## 🐛 Floating Button

| Test Case                                | Type       | Status | Spec / Notes                                                   |
| ---------------------------------------- | ---------- | ------ | -------------------------------------------------------------- |
| QA button is visible on page load        | Happy Path | ✅     | `@QAFloatingButton` — `QAFloatingButtonPage.goToDevServer()`   |
| Oneko GIF endpoint returns 200           | Happy Path | ✅     | `@QAFloatingButton` — `QAFloatingButtonPage.getResponseNeko()` |
| Badge count shows active issues          | Happy Path | ⬜     |                                                                |
| Button opens the drawer on click         | Happy Path | ⬜     |                                                                |
| Button closes the drawer on second click | Happy Path | ⬜     |                                                                |

---

## 📋 Drawer

| Test Case                                   | Type       | Status | Spec / Notes                                                    |
| ------------------------------------------- | ---------- | ------ | --------------------------------------------------------------- |
| Drawer opens and displays issue list        | Happy Path | ⬜     | `QADrawerPage.goToQADrawer()` exists, assertion not yet written |
| Search filters issues by title              | Happy Path | ⬜     |                                                                 |
| Search shows "no results" for unknown query | Edge Case  | ⬜     |                                                                 |
| Tab switching (Issues / Features / Notes)   | Happy Path | ⬜     |                                                                 |
| Status filter pills filter correctly        | Happy Path | ⬜     |                                                                 |
| Empty state shown when no issues exist      | Edge Case  | ⬜     |                                                                 |
| Pagination works with 10+ issues            | Edge Case  | ⬜     |                                                                 |

---

## ➕ Create Issue (Bug)

| Test Case                                        | Type       | Status | Spec / Notes                                             |
| ------------------------------------------------ | ---------- | ------ | -------------------------------------------------------- |
| Can create a new bug issue with all fields       | Happy Path | ✅     | `@CreateFunctions @AddIssue` — `NewFormPage.addIssue()`  |
| Can link a Playwright test to an issue           | Happy Path | ✅     | `@CreateFunctions @AddIssue` — uses `test-select` testid |
| Issue appears in list after creation             | Happy Path | ⬜     | Assertion not yet written                                |
| Validation error shown when title is empty       | Edge Case  | ⬜     |                                                          |
| Validation error shown when description is empty | Edge Case  | ⬜     |                                                          |

---

## ✨ Create Feature

| Test Case                                  | Type       | Status | Spec / Notes                                                |
| ------------------------------------------ | ---------- | ------ | ----------------------------------------------------------- |
| Can create a new feature with all fields   | Happy Path | ✅     | `@CreateFunctions @AddFeature` — `NewFormPage.addFeature()` |
| Feature appears under Features tab         | Happy Path | ⬜     | Assertion not yet written                                   |
| Validation error shown when title is empty | Edge Case  | ⬜     |                                                             |

---

## 📝 Create Note

| Test Case                                    | Type       | Status | Spec / Notes                                          |
| -------------------------------------------- | ---------- | ------ | ----------------------------------------------------- |
| Can create a new note with all fields        | Happy Path | ✅     | `@CreateFunctions @AddNote` — `NewFormPage.addNote()` |
| Note appears under Notes tab                 | Happy Path | ⬜     | Assertion not yet written                             |
| Validation error shown when content is empty | Edge Case  | ⬜     |                                                       |

---

## 🔍 Issue Detail

| Test Case                                        | Type       | Status | Spec / Notes |
| ------------------------------------------------ | ---------- | ------ | ------------ |
| Clicking an issue opens detail panel             | Happy Path | ⬜     |              |
| Can edit issue title and save                    | Happy Path | ⬜     |              |
| Can change issue status                          | Happy Path | ⬜     |              |
| Can delete an issue                              | Happy Path | ⬜     |              |
| Cannot mark verified without linked test passing | Edge Case  | ⬜     |              |
| Run Test button triggers test run                | Happy Path | ⬜     |              |

---

## 📥 Import Issues

| Test Case                                     | Type       | Status | Spec / Notes |
| --------------------------------------------- | ---------- | ------ | ------------ |
| Can import issues from markdown file          | Happy Path | ⬜     |              |
| Empty markdown file shows no issues to import | Edge Case  | ⬜     |              |

---

## 🔄 Polling / Real-time Sync

| Test Case                                          | Type       | Status | Spec / Notes |
| -------------------------------------------------- | ---------- | ------ | ------------ |
| Issues created in another context appear within 5s | Happy Path | ⬜     |              |

---

## 🗂️ Page Objects Built

| File                      | Covers                                                 |
| ------------------------- | ------------------------------------------------------ |
| `POManager.ts`            | Central manager — instantiates all page objects        |
| `QAFloatingButtonPage.ts` | Navigate to app, get neko response, get button locator |
| `QADrawerPage.ts`         | Navigate to app and open the drawer                    |
| `NewFormPage.ts`          | Add issue, feature, and note with all form fields      |
