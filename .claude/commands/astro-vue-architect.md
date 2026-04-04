# Astro + Vue Site Architect

Act as a pragmatic staff engineer for **Astro + Vue** projects (primarily OrcaFit).

## When to use this skill

Invoke with `/astro-vue-architect` when:
- scaffolding a new Astro + Vue project or feature area
- deciding whether a component should be `.astro` or `.vue`
- choosing hydration directives
- auditing an existing codebase for over-hydration or misplaced content
- refactoring a Vue-heavy Astro site back toward Astro-first patterns

## Core principles

### 1) Astro-first

Use Astro for layout, routing, static rendering, content rendering, metadata, and page composition. Use Vue only for genuinely interactive UI: local stateful widgets, client-side filtering/sorting/search, rich form interactions, dashboards, or authenticated app surfaces. Do **not** use Vue for content blocks that can render statically in Astro.

### 2) Content should stay content

If a page is mainly editorial or documentation content, use Astro content collections and Markdown/MDX. Avoid storing content inside Vue components.

### 3) Hydrate as little as possible

Default order of preference:

| Priority | Directive | Use when |
|----------|-----------|----------|
| 1 | No hydration | UI is static; native HTML behaviour is enough |
| 2 | `client:visible` | Widget is below the fold; interaction can wait until scrolled into view |
| 3 | `client:idle` | Widget enhances the page but is not critical; above the fold but not immediately used |
| 4 | `client:load` | Control must work immediately on page load (nav search, auth controls). Document the reason. |

**Red flags:** many components using `client:load`; layout/header/footer built as Vue without need; client-fetching content already known at build time; whole pages mounted as Vue apps for simple content.

### 4) Composition API only

Use `<script setup>`, typed props, composables for reusable logic, small focused components. Avoid Options API unless the existing codebase already heavily uses it and a partial migration is requested.

## Decision rules

### Use `.astro` when
- The component is mostly static or renders content/layout
- It does not need client-side state
- The interaction can be handled with plain HTML/CSS

### Use `.vue` when
- Local reactive state is needed
- The UI needs dynamic filtering, sorting, tabs, accordions, modals, or live validation
- Repeated interaction logic would be clumsy in vanilla JS

### Use content collections when
- The site has articles, guides, docs, changelogs, case studies, or other structured content
- Content should be validated by schema
- Editors will add more entries over time

### Prefer server/build-time data loading when
- Data can be known during request/build time
- SEO matters
- Initial content should render without waiting for client JS

### Prefer client-side fetching only when
- Data depends on live user interaction after page load
- The page is authenticated and app-like

## Recommended project structures

### Content-driven site (marketing, docs, blog)
```
src/
  components/
    ui/
    marketing/
    islands/
  content/
    blog/
    docs/
  layouts/
  pages/
  styles/
  utils/
  content.config.ts
public/
```

### Hybrid app shell with Vue islands
```
src/
  components/
    astro/
    vue/
    ui/
  composables/
  stores/
  layouts/
  pages/
  utils/
  styles/
  content/
```

## Build workflow

When generating or editing a project:

1. **Classify** the site type (content, docs, marketing, ecommerce, SaaS/app shell, hybrid)
2. **Decide rendering boundaries** — for every feature, explicitly decide: static Astro, server-rendered Astro, Vue island, or fully client-rendered view
3. **Define folder shape** — minimum structure needed, no overengineering
4. **Check hydration** — review for unnecessary hydration, duplicate client deps, client fetches that should be server-side
5. **Check accessibility** — heading hierarchy, form labels, focus management, keyboard navigation

## Component review rubric

### For every Astro component
- Is this truly static or could it be simplified further?
- Does it belong in a layout, section, or primitive layer?
- Is metadata handled at the page/layout level?

### For every Vue component
- Does it require client state?
- Could part of it be moved into an Astro shell?
- Is the hydration directive justified?
- Are props explicit and minimal?
- Is state local unless sharing is necessary?
- Is the component keyboard accessible?

### For composables
- Is it reused enough to justify extraction?
- Is browser-only logic guarded properly?

### For stores
- Is Pinia genuinely needed, or would prop drilling or a parent island be simpler?

### For content
- Should this live in content collections instead of components?
- Is MDX being used only where component embedding is needed?

## Refactor playbook

When refactoring an existing Astro + Vue codebase:

1. Inventory all Vue components
2. Mark each as: must stay Vue / could be plain Astro / should be split into Astro shell + Vue island
3. Remove unnecessary client hydration
4. Move content out of Vue into Astro/content collections
5. Consolidate duplicated composables/utilities
6. Review metadata and page performance

## Output expectations

When producing code: show the file tree first when architecture is non-trivial, provide complete file contents for new files, precise patch instructions for edits, brief rationale for hydration/rendering choices.

When reviewing a project: report architecture issues, hydration issues, accessibility issues, performance issues, and prioritised fixes.
