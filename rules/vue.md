# Vue Naming Standards

## Components

- Component names are **PascalCase** in both the filename and `<script>`: `UserCard.vue`, `ArticlePreview.vue`
- Component names must be **multi-word** to avoid conflicts with HTML elements — never `Header.vue`, always `AppHeader.vue`
- Component files live alongside their related files (co-location), not in a flat global directory

**Prefixes:**

| Prefix | Purpose | Example |
|--------|---------|---------|
| `Base` | Generic, reusable UI primitives | `BaseButton.vue`, `BaseInput.vue` |
| `The` | Single-instance layout components | `TheHeader.vue`, `TheSidebar.vue` |
| *(none)* | Feature-specific components | `TrailCard.vue`, `BudgetRow.vue` |

- Child components tightly coupled to a parent are named with the parent as prefix: `TrailList.vue`, `TrailListItem.vue`, `TrailListItemActions.vue`

## Composables

- `use` prefix, camelCase: `useAuth`, `useTrailSearch`, `useLocalStorage`
- Filename matches the composable name: `useAuth.ts`, `useTrailSearch.ts`
- One composable per file

## Props

- Declared in camelCase in `<script>`: `isActive`, `userProfile`, `trailId`
- Passed in kebab-case in templates: `:is-active="true"`, `:user-profile="data"`

## Events

- kebab-case: `@click-outside`, `@trail-selected`, `@form-submitted`
- Two-way binding follows `update:propName`: `@update:model-value`, `@update:selected`
- Emit names match what the parent binds — no synonyms

## Template Refs

- camelCase: `const inputRef = ref()`, `const mapContainer = ref()`

## Pinia Stores

- Store composable: `useXxxStore` — `useAuthStore`, `useTrailStore`, `useBudgetStore`
- Store file: lowercase snake matching the domain — `auth.ts`, `trail.ts`, `budget.ts` inside `stores/`
- State properties: camelCase — `isLoading`, `currentUser`, `trailList`
- Actions: camelCase verbs — `fetchTrails()`, `updateProfile()`, `clearSession()`
- Getters: camelCase noun/adjective — `filteredTrails`, `isAuthenticated`, `totalSpend`

## Router

- Route names: camelCase — `home`, `trailDetail`, `budgetOverview`
- Route paths: kebab-case — `/trail-detail/:id`, `/budget-overview`
- Route files: kebab-case — `routes/trail-detail.ts`

## Files and Directories

- Components: PascalCase filename — `UserCard.vue`
- Pages/Views: PascalCase, `View` suffix optional — `TrailDetailView.vue` or `TrailDetail.vue`
- Composables directory: camelCase files — `composables/useTrailSearch.ts`
- Utilities: camelCase — `utils/formatDate.ts`, `utils/parseOsm.ts`
- Types: PascalCase for type/interface names, camelCase for filename — `types/trailTypes.ts`

## CSS / Styles

- Scoped styles use kebab-case class names: `.trail-card`, `.user-avatar`
- BEM for any complex component styles: `.trail-card__title`, `.trail-card--featured`
- Avoid global class names that could collide — keep styles scoped to the component
