/**
 * commitlint config — enforces the Conventional Commits format from .claude/rules/git.md.
 *
 * Install:
 *   pnpm add -D @commitlint/cli @commitlint/config-conventional
 *
 * Wire up with Husky (runs on every commit):
 *   pnpm add -D husky
 *   pnpm exec husky init
 *   echo "pnpm dlx commitlint --edit \$1" > .husky/commit-msg
 *
 * Usage — copy or symlink to your project root as commitlint.config.js.
 *
 * What is enforced:
 *   - Types limited to: feat fix chore docs style refactor test perf ci
 *   - Scope: lowercase only
 *   - Subject: lowercase, imperative mood (enforced structurally, not semantically)
 *   - Header max 72 characters
 *   - No trailing period on subject
 *   - Blank line required before body and footer
 *
 * What is documented but not auto-enforced:
 *   - Imperative mood wording ("add login" not "adds login") — semantic check only
 *   - Issue references in footer (Closes #42) — encouraged by convention
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Types exactly as listed in git.md
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test', 'perf', 'ci'],
    ],

    // Type and subject must be present
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],

    // Scope: lowercase only (e.g. auth, trails, open-banking)
    'scope-case': [2, 'always', 'lower-case'],

    // Subject: lowercase (e.g. "add OAuth2 login" not "Add OAuth2 login")
    'subject-case': [2, 'always', 'lower-case'],

    // Max header length: 72 chars (type + scope + ": " + description)
    'header-max-length': [2, 'always', 72],

    // No period at end of subject
    'subject-full-stop': [2, 'never', '.'],

    // Blank line required before body and footer
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
}
