/**
 * ESLint flat config for Astro projects.
 *
 * Install:
 *   pnpm add -D eslint eslint-plugin-astro eslint-plugin-vue typescript-eslint eslint-plugin-unicorn
 *   pnpm add -D @typescript-eslint/parser astro-eslint-parser
 *
 * Usage — in your project's eslint.config.js:
 *   import astroConfig from './.claude/linters/eslint-astro.js'
 *   export default [...astroConfig, { /* project overrides *\/ }]
 *
 * What is enforced:
 *   - Astro component files (src/components/): PascalCase
 *   - Astro layout files (src/layouts/): PascalCase
 *   - Astro page files (src/pages/): kebab-case; index.astro and [slug].astro ignored
 *   - Content collection markdown files (src/content/): kebab-case
 *   - Utility/helper files (src/utils/, src/lib/): camelCase
 *   - Vue components within Astro: multi-word PascalCase, camelCase props, kebab-case events
 *   - TypeScript: PascalCase types/interfaces (no I-prefix), camelCase functions/variables
 *
 * What is documented but not auto-enforced:
 *   - Layout suffix (XxxLayout.astro) — PascalCase is enforced, suffix by convention only
 *   - Frontmatter field casing (camelCase) — defined in Zod schemas, not lintable here
 *   - Collection directory naming (kebab-case, plural) — filesystem convention
 *   - .md vs .mdx choice (use .mdx only when JSX/components are imported)
 *   - Static asset naming in public/ and src/assets/ (kebab-case)
 *   - Environment variable casing (SCREAMING_SNAKE_CASE with PUBLIC_ prefix)
 */

import pluginAstro from 'eslint-plugin-astro'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import unicorn from 'eslint-plugin-unicorn'

export default [
  ...pluginAstro.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...tseslint.configs.recommended,

  // ── Global rules ────────────────────────────────────────────────────────────
  {
    plugins: { unicorn },
    rules: {
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
        // Helpers like getPublishedPosts(), sortByDate() are camelCase
        { selector: 'function', format: ['camelCase', 'PascalCase'] },

        // Parameters: camelCase
        { selector: 'parameter', format: ['camelCase'] },

        // Enum members: PascalCase or UPPER_CASE
        { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
      ],
    },
  },

  // ── Vue components within Astro ─────────────────────────────────────────────
  {
    files: ['src/**/*.vue'],
    rules: {
      // Vue components must be multi-word PascalCase
      'vue/multi-word-component-names': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
      }],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],

      // Props: camelCase in script, kebab-case in templates
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/attribute-hyphenation': ['error', 'always'],

      // Events: kebab-case
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/v-on-event-hyphenation': ['error', 'always'],
    },
  },

  // ── Per-directory file naming ────────────────────────────────────────────────

  // Astro components: PascalCase (Hero.astro, ArticleCard.astro)
  {
    files: ['src/components/**/*.astro'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { pascalCase: true } }],
    },
  },

  // Astro layouts: PascalCase (BaseLayout.astro, BlogLayout.astro)
  // Layout suffix is enforced by convention, not this rule
  {
    files: ['src/layouts/**/*.astro'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { pascalCase: true } }],
    },
  },

  // Astro pages: kebab-case (about.astro, getting-started.astro)
  // index.astro and dynamic route segments ([slug].astro, [...path].astro) are ignored
  {
    files: ['src/pages/**/*.astro'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', {
        cases: { kebabCase: true },
        ignore: ['^index\\.astro$', '^\\[.*\\]\\.astro$'],
      }],
    },
  },

  // Content collection markdown files: kebab-case (getting-started.md, api-reference.mdx)
  {
    files: ['src/content/**/*.{md,mdx}'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { kebabCase: true } }],
    },
  },

  // Utilities and helpers: camelCase (formatDate.ts, readingTime.ts)
  {
    files: ['src/utils/**/*.{ts,js}', 'src/lib/**/*.{ts,js}'],
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  },
]
