/**
 * ESLint flat config for Vue / Quasar projects.
 *
 * Install:
 *   pnpm add -D eslint eslint-plugin-vue typescript-eslint eslint-plugin-unicorn
 *
 * Usage — in your project's eslint.config.js:
 *   import vueQuasarConfig from './.claude/linters/eslint-vue-quasar.js'
 *   export default [...vueQuasarConfig, { /* project overrides *\/ }]
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
 *   - Page suffix (XxxPage.vue) and Layout suffix (XxxLayout.vue)
 *   - Pinia store composable naming (useXxxStore) and suffix enforcement
 *   - Route name (camelCase) and path (kebab-case) conventions
 *   - CSS class kebab-case (scoped styles are not linted)
 */

import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import unicorn from 'eslint-plugin-unicorn'

export default [
  ...pluginVue.configs['flat/recommended'],
  ...tseslint.configs.recommended,

  // ── Global rules ────────────────────────────────────────────────────────────
  {
    plugins: { unicorn },
    rules: {
      // Component names must be multi-word to avoid conflicts with HTML elements
      'vue/multi-word-component-names': 'error',

      // Component references in templates: PascalCase
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

      // TypeScript naming conventions
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
  },

  // ── Per-directory file naming ────────────────────────────────────────────────

  // Components, pages, layouts: PascalCase
  // Note: Page suffix (XxxPage.vue) and Layout suffix (XxxLayout.vue) are
  // enforced by convention, not this rule.
  {
    files: ['src/components/**/*.vue', 'src/pages/**/*.vue', 'src/layouts/**/*.vue'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { pascalCase: true } }],
    },
  },

  // Boot and router files: kebab-case (supabase.ts, powersync.ts, trail.ts)
  {
    files: ['src/boot/**/*.{ts,js}', 'src/router/**/*.{ts,js}'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { kebabCase: true } }],
    },
  },

  // Stores: camelCase / lowercase (auth.ts, trail.ts, budget.ts)
  {
    files: ['src/stores/**/*.{ts,js}'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  },

  // Composables: camelCase with use prefix (useAuth.ts, useTrailSearch.ts)
  // Utils and types: camelCase (formatDate.ts, trailTypes.ts)
  {
    files: [
      'src/composables/**/*.{ts,js}',
      'src/utils/**/*.{ts,js}',
      'src/types/**/*.{ts,js}',
    ],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  },
]
