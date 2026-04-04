# Astro + Vue Integration Naming Standards

These conventions govern how Astro and Vue components coexist in the same project (primarily OrcaFit). For Astro-only naming see `astro.md`; for Vue-only naming see `vue.md`.

## Component File Placement

- Astro components: `src/components/` or feature-scoped subdirectories — `src/components/marketing/`, `src/components/ui/`
- Vue island components: `src/components/vue/` or `src/components/islands/` — keep them visually separate from static Astro components
- Shared UI primitives: `src/components/ui/` — may contain both `.astro` and `.vue` files

## Naming at the Boundary

- Astro wrapper components that exist solely to host a Vue island: name after the feature, not the wrapper role — `PricingSection.astro` (not `PricingWrapper.astro`)
- Vue islands imported into Astro pages: PascalCase matching their `.vue` filename — `<PricingCalculator client:visible />`
- Props passed from Astro to Vue: camelCase in the Vue `defineProps`, passed as camelCase attributes in the `.astro` template (Astro passes them through unchanged)

## Hydration Directive Conventions

Always include a comment when using `client:load` explaining why immediate hydration is required:

```astro
<!-- client:load: auth controls must be interactive on first paint -->
<AuthMenu client:load user={user} />
```

No comment needed for `client:visible` or `client:idle` — these are the expected defaults.

## Content Collections vs Vue Components

- Editorial/structured content: always in Astro content collections (`src/content/`), never inside Vue components
- Frontmatter fields follow `astro.md` conventions: `publishedAt`, `updatedAt`, `isDraft`, `featuredImage`
- MDX is only used when a file needs embedded Vue/JSX components; otherwise use plain `.md`

## Composables and Utilities

- Composables used only within Vue islands: `src/composables/useXxx.ts` (follows `vue.md`)
- Utilities shared between Astro and Vue (e.g. date formatting): `src/utils/` with camelCase filenames (follows both `astro.md` and `vue.md`)
- Do not create a `src/lib/` directory — use `src/utils/` for consistency

## Pinia Stores in Astro

- Only introduce Pinia when state is shared across multiple Vue islands on the same page or across routes
- Store naming follows `vue.md`: `useXxxStore` in `stores/xxx.ts`
- Single-island local state should use `ref`/`reactive` inside the component, not a store
