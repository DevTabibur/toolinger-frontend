Cursor Operating Mode (read first)

Read this file fully. Ask for clarification only if a required file or function is missing.

Execute tasks in order. After each numbered step, return:

command(s) run

stdout/stderr (trimmed)

changed files

Hard rules:

Do not remove comments, layout wrappers, or any existing pages.

Do not rename or move existing files.

If lint/tests/build fail → STOP and report failure with logs.

Keep all new code in new components/modules or additive utilities.

Reuse existing API helpers from pagemanagemetnApi.ts (used by current SEO/Article features). If a helper is missing, create a thin wrapper next to it without breaking existing exports.

Global Assumptions

Styling must match current dashboard (dark + light theme).

Use QuillFiled component (already in forms) for content editing.

Use Formik + Yup for form handling and validation.

DataTable must support client-side search, sort, filter, and pagination.

APIs: Always reuse existing helpers from pagemanagemetnApi.ts. Never break server contracts.

Sidebar & Route Architecture (target)
Dashboard
├─ Overview (existing)
├─ Blog Management (existing)
├─ Blog Category (existing)
├─ SEO Management (existing)
├─ Article Management (existing)
└─ Page Management (NEW)
   ├─ Static Pages
   │   ├─ Home
   │   ├─ Contact
   │   ├─ About
   │   ├─ Terms
   │   └─ Privacy (etc... auto-read from project pages)
   ├─ Text Tools
   ├─ Image Tools
   ├─ Developer Tools
   ├─ Converters
   ├─ Generators
   ├─ Calculators
   ├─ Website Management Tools
   └─ Editor (hidden route): /page-management/edit/:slug


Editor page tabs:

Content → QuillFiled

SEO → Tabs: Basic / Social Media / Technical / Schema

Edit uses same form as Create. Pre-fill existing values when available.

Shared Types

Create or extend src/types/page.ts.

Interfaces can be reused from SEO Management > Create SEO page (same structure, fields, validation).

Do not break or rename existing SEO types—just reuse.

Reusable DataTable

Create src/components/Table/DataTable.tsx with props: rows, columns, onEdit, onDelete, filters, initialPageSize=10.

Must use real API fetch data, not mock data.

Acceptance Criteria (global)

New Page Management menu and submenus appear without breaking existing menus.

Each listing supports client-side search/sort/filter/pagination.

Editor can create/update both Article content + SEO.

All forms validate with Formik+Yup. Show success/error toasts.

Edit routes prefill existing data.

Delete confirms first, then updates instantly.

TASKS (execute in order)
TASK-1: Sidebar & Routes

Add Page Management main menu with submenus.

Routes to create:

/page-management/static

/page-management/static/:page (home, contact, about, terms, privacy, etc)

/page-management/edit/:slug

AC: Menu visible, routes render placeholder components.

TASK-2: API adapters

Reuse existing helpers in pagemanagemetnApi.ts.

If needed, create src/api/pageManagementClient.ts with thin wrappers.

Never break contracts.

AC: All CRUD calls reuse existing functions.

TASK-3: DataTable component

Implement reusable table with search, sort, filter, pagination.

Must connect to real API fetch data (SEO + Article list).

Props: rows, columns, onEdit, onDelete, filters.

AC: Works with real API; no console errors.

TASK-4: Static Pages listing

/page-management/static → list static pages (home, contact, about, terms, privacy...).

Columns: Title, Slug, Canonical URL, Noindex, Updated At, Actions.

Actions: Edit → /page-management/edit/:slug.

Delete only if API supports (confirm first).

TASK-5: Manage Pages (all)

/page-management/manage → unified grid for all pages (static + tools).

Columns: Meta Title, Keywords, Canonical URL, Noindex, Changefreq, Priority, Updated At, Actions.

Actions: Edit + Delete.

TASK-6: Category pages

Route /page-management/category/:category.

Categories: Text Tools, Image Tools, Developer Tools, Converters, Generators, Calculators, Website Management Tools.

Show in DataTable with same columns & actions.

TASK-7: Combined Editor

/page-management/edit/:slug.

Tabs:

Content (QuillFiled, bound to Article).

SEO → Basic: Meta Title, Keywords, Meta Desc, Canonical, Noindex.

SEO → Social Media: OG + Twitter fields.

SEO → Technical: Changefreq + Priority.

SEO → Schema: JSON-LD editor.

AC: Prefill existing data, validate inputs, save both Article + SEO.

TASK-8: Create flows

If no Article/SEO exists → open editor in create mode.

Saving → calls create helpers → then switches to edit mode.

TASK-9: Table UX polish

Persist search/sort/filter in query params.

Add bulk actions (if supported by API).

Add empty states + skeleton loaders.

TASK-10: Validation & Error handling

Meta Title (10–60 chars).

Meta Description (30–160).

Canonical URL format.

JSON-LD must be valid (use JSON.parse, pretty-print).

Wrap API calls in try/catch with toast error.

TASK-11: Delete wiring

Enable Delete only if API supports.

Confirm modal before delete.

TASK-12: QA & Smoke Tests

Manual tests:

Static Pages → Edit home, add content + SEO, save, refresh.

Manage Pages → search/sort/filter, check results update.

Category → Text Tools → edit SEO, save, verify in Manage list.

Schema → invalid JSON shows error, valid saves.

npm run build passes with no errors.

DO NOT (global)

Do not remove comments/layouts.

Do not modify SEO/Article screens (except API reuse).

Do not change API contracts.

Rollback Plan

All work in feature branch.

If regression → revert commit/branch.