/**
 * ESLint flat config for Vitesse (non-Quasar Vue) projects.
 *
 * Extends @antfu/eslint-config — the config shipped with Vitesse itself —
 * and layers naming-convention rules from .claude/rules/vue.md on top.
 *
 * Install:
 *   pnpm add -D eslint @antfu/eslint-config eslint-plugin-unicorn
 *
 * Usage — in your project's eslint.config.js:
 *   import vitesseConfig from './.linters/eslint-vitesse.js'
 *   export default vitesseConfig
 *   // or to add project-level overrides:
 *   export default vitesseConfig.append({ /* overrides *\/ })
 *
 * Key differences from eslint-vue-quasar.js:
 *   - Base is @antfu/eslint-config (single quotes, no semicolons, sorted imports)
 *     rather than bare eslint-plugin-vue
 *   - Pages (src/pages/) use kebab-case because filenames map 1:1 to routes
 *     via unplugin-vue-router — not PascalCase+Page suffix as in Quasar
 *   - No boot files or Quasar-specific directory conventions
 *   - Dynamic route segments ([id].vue, [[id]].vue, [...path].vue) are ignored
 *     by the filename rule
 *   - Route group folders ((group)/) are ignored
 *   - src/modules/ uses camelCase (Vitesse feature-module convention)
 *
 * What is enforced:
 *   - Component names: multi-word PascalCase
 *   - Props: camelCase in <script>, kebab-case in templates
 *   - Events: kebab-case
 *   - TypeScript: PascalCase types/interfaces (no I-prefix), camelCase functions/variables
 *   - File naming per directory (see per-directory overrides below)
 *
 * What is documented but not auto-enforced:
 *   - Base/The component prefixes (by convention only)
 *   - Layout suffix (XxxLayout.vue) — PascalCase is enforced, suffix by convention
 *   - Pinia store composable suffix (useXxxStore)
 *   - CSS class kebab-case (UnoCSS utility classes are not linted here)
 */

import antfu from '@antfu/eslint-config'
import unicorn from 'eslint-plugin-unicorn'

export default antfu({
  vue: true,
  typescript: true,
  unocss: true,      // enable UnoCSS order/shorthand rules
  formatters: true,  // format CSS/HTML/Markdown via eslint-plugin-format
})

  // ── Vue naming ──────────────────────────────────────────────────────────────
  .append({
    files: ['src/**/*.vue'],
    rules: {
      // Components must be multi-word to avoid conflicts with HTML elements
      'vue/multi-word-component-names': 'error',

      // Component references in templates: PascalCase
      // registeredComponentsOnly: false is important because Vitesse auto-imports
      // components and they may not appear in a local import list
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
      }],

      // Component name in defineComponent / export default: PascalCase
      'vue/component-definition-name-casing': ['error', 'PascalCase'],

      // Props declared camelCase in <script>
      'vue/prop-name-casing': ['error', 'camelCase'],

      // Props passed kebab-case in templates (:user-profile not :userProfile)
      'vue/attribute-hyphenation': ['error', 'always'],

      // Emitted event names: kebab-case (@trail-selected not @trailSelected)
      'vue/custom-event-name-casing': ['error', 'kebab-case'],

      // v-on listeners: kebab-case (@click-outside not @clickOutside)
      'vue/v-on-event-hyphenation': ['error', 'always'],
    },
  })

  // ── TypeScript naming ────────────────────────────────────────────────────────
  .append({
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',

        // Interfaces: PascalCase, no I-prefix
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: { regex: '^I[A-Z]', match: false },
        },

        // Type aliases and classes: PascalCase
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'class', format: ['PascalCase'] },

        // Variables: camelCase (allow PascalCase for component refs, UPPER_CASE for env consts)
        { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },

        // Functions: camelCase (allow PascalCase for component definitions)
        { selector: 'function', format: ['camelCase', 'PascalCase'] },

        // Parameters: camelCase
        { selector: 'parameter', format: ['camelCase'] },

        // Enum members: PascalCase or UPPER_CASE
        { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
      ],
    },
  })

  // ── Per-directory file naming ────────────────────────────────────────────────

  // Components: PascalCase (Hero.vue, ArticleCard.vue, BaseButton.vue, TheHeader.vue)
  .append({
    files: ['src/components/**/*.vue'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { pascalCase: true } }],
    },
  })

  // Layouts: PascalCase (BaseLayout.vue, BlogLayout.vue)
  // Layout suffix is enforced by convention, not this rule
  .append({
    files: ['src/layouts/**/*.vue'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { pascalCase: true } }],
    },
  })

  // Pages: kebab-case because filenames are the route path (about.vue → /about)
  // Ignored patterns:
  //   index.vue          — root/index route
  //   [id].vue           — required dynamic segment
  //   [[id]].vue         — optional dynamic segment
  //   [...path].vue      — catch-all segment
  //   (group)/           — route grouping folder (no URL impact)
  .append({
    files: ['src/pages/**/*.vue'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', {
        cases: { kebabCase: true },
        ignore: [
          '^index\\.vue$',
          '^\\[{1,2}.*\\]{1,2}\\.vue$',
          '^\\(.*\\)$',
        ],
      }],
    },
  })

  // Stores: camelCase / lowercase single-word (auth.ts, trail.ts, budget.ts)
  .append({
    files: ['src/stores/**/*.{ts,js}'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  })

  // Composables: camelCase with use prefix (useAuth.ts, useTrailSearch.ts)
  .append({
    files: ['src/composables/**/*.{ts,js}'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  })

  // Utils and types: camelCase (formatDate.ts, trailTypes.ts)
  .append({
    files: ['src/utils/**/*.{ts,js}', 'src/types/**/*.{ts,js}'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  })

  // Modules: camelCase (Vitesse feature-module convention)
  .append({
    files: ['src/modules/**/*.{ts,js}'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  })
