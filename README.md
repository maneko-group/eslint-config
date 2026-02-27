# @maneko/eslint-config

[![Stars](https://img.shields.io/github/stars/maneko-org/eslint-config?style=flat-square&logoColor=white)](https://github.com/maneko-org/eslint-config/stargazers)
[![Forks](https://img.shields.io/github/forks/maneko-org/eslint-config?style=flat-square&logoColor=white)](https://github.com/maneko-org/eslint-config/network/members)
[![Pull Requests](https://img.shields.io/github/issues-pr/maneko-org/eslint-config?style=flat-square&logoColor=white)](https://github.com/maneko-org/eslint-config/pulls)
[![Issues](https://img.shields.io/github/issues/maneko-org/eslint-config?style=flat-square&logoColor=white)](https://github.com/maneko-org/eslint-config/issues)
[![Contributors](https://img.shields.io/github/contributors/maneko-org/eslint-config?style=flat-square&logoColor=white)](https://github.com/maneko-org/eslint-config/graphs/contributors)
[![License](https://img.shields.io/github/license/maneko-org/eslint-config?style=flat-square&logoColor=white)](https://github.com/maneko-org/eslint-config/blob/main/LICENSE)

A shared, ESLint config four our projects - simple, consistent and modern. Inspired by `@antfu/eslint-config`, tailored for real-world apps and libraries.

## Why use this

- **One-line setup** for a sensible, opinionated ESLint Flat config.
- Works with JavaScript and TypeScript (TS support is opt-in).
- Opt-in integrations: React, NextJS, Vue, Svelte, Astro, Solid.
- Fixable stylistic rules that play nicely with `eslint --fix`, CI and `lint-staged`.
- ESM-first and composable - easy to extend or override.

> **Note:** This preset is opinionated. It aims to reduce bikeshedding and keep diffs small. If you need different choices - override rules locally or fork.

## Quick start

Install preset + eslint in your project:

```bash
# pnpm (recommended)
pnpm add -D eslint @maneko/eslint-config

# yarn
yarn add -D eslint @maneko/eslint-config

# npm
npm install -D eslint @maneko/eslint-config
```

> **Why install `eslint` in the project?**
> The VS Code ESLint extension resolves `eslint` from the project root `node_modules`. Install it in the host project so the editor finds the binary and plugins.

Create `eslint.config.mjs` in your project root:

```js
import { eslint } from '@maneko/eslint-config'

export default eslint({
  // A simple example
  jsx: { a11y: true },
  react: true,
})
```

Minimal preset:

```js
import { eslint } from '@maneko/eslint-config'

export default eslint()
```

## Usage & recipes

### JavaScript

```js
import { eslint } from '@maneko/eslint-config'

export default eslint()
```

### TypeScript + React

```js
import { eslint } from '@maneko/eslint-config'

export default eslint({
  typescript: true,
  react: { a11y: true },
})
```

### Combine with legacy `.eslintrc` (FlatCompat)

If you need to migrate legacy configs, use `@eslint/eslintrc` + `FlatCompat`:

```js
import { FlatCompat } from '@eslint/eslintrc'
import { eslint } from '@maneko/eslint-config'

const compat = new FlatCompat()
export default eslint({}, ...compat.config({ extends: ['eslint:recommended'] }))
```

## Scripts (recommended)

Add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

Example `lint-staged` + `husky`:

```json
{
  "lint-staged": {
    "**/*.{js,ts,jsx,tsx,mjs}": ["pnpm lint:fix"]
  }
}
```

## IDEs and code editors

### VS Code (recommended)

Install the ESLint extension and use:

```jsonc
// .vscode/settings.json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  }
}
```

> Ensure `eslint` exists in the project root `node_modules` - the extension does not resolve nested copies reliably.

### Neovim

Use `nvim-lspconfig` or your favorite tooling. To run auto-fix on save:

```lua
-- call EslintFixAll on BufWritePre
vim.api.nvim_create_autocmd("BufWritePre", {
  pattern = {"*.js","*.ts","*.jsx","*.tsx"},
  callback = function() vim.cmd("EslintFixAll") end
})
```

Or use `null-ls` / `conform.nvim` as an alternative.

## Features

- JavaScript & TypeScript support (TS opt-in via factory option).
- React/Next/Vue/Svelte/Astro/Solid integrations (opt-in).
- Accessibility rules (a11y) for React/Vue when enabled.
- Opinionated stylistic rules (using `style/*`) that are auto-fixable.
- Composer API: `.prepend()`, `.override()`, `.renamePlugins()` for advanced composition.

## Customization

Pass options or extra flat-configs to the factory:

```js
import { eslint } from '@maneko/eslint-config'

export default eslint(
  { typescript: true, react: true },
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'warn',
    },
  },
)
```

Advanced composer example:

```js
export default eslint()
  .prepend(/* config */)
  .override('maneko/stylistic/rules', {
    rules: { 'style/semi': ['error', 'never'] },
  })
  .renamePlugins({ ts: '@typescript-eslint' })
```

## Common problems & fixes (quick)

- **VS Code not linting** - make sure `eslint` is installed in the project root (not only globally).
- **Missing parser/plugin errors** - install peer deps in the host project (e.g. `eslint-plugin-react`).
- **Rules auto-fixed unexpectedly in the editor** - check `.vscode/settings.json` - some stylistic rules may be turned off in the editor and still be fixable on CLI runs.
- **Legacy `.eslintrc`** - convert using `FlatCompat` or maintain a small adapter file.

## Contributing

PRs welcome. Keep changes small and document any new opinionated rules.

## Acknowledgements

Inspired by `@antfu/eslint-config` - thanks for the design & DX philosophy.

## License

`@maneko/eslint-config` is licensed under the MIT License. See the `LICENSE` file in the repository.
