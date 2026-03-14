<h1 align='center' alt='Title'>@maneko/eslint-config</h1>

[![Version](https://img.shields.io/npm/v/@maneko/eslint-config?style=flat&colorA=111111&colorB=000000)](https://npmjs.com/package/@maneko/eslint-config)
[![Downloads](https://img.shields.io/npm/dt/@maneko/eslint-config.svg?style=flat&colorA=222222&colorB=000000)](https://npmjs.com/package/@maneko/eslint-config)
[![License](https://img.shields.io/npm/l/@maneko/eslint-config?style=flat&colorA=333333&colorB=000000)](https://npmjs.com/package/@maneko/eslint-config)
[![Build with](https://img.shields.io/badge/built_with-tsdown@0.21.2-000000?style=flat)](https://tsdown.dev)

Opinionated ESLint config preset. Inspired by [@siberiacancode/eslint](https://github.com/siberiacancode/core/tree/main/tools/eslint), based on [@antfu/eslint-config](https://github.com/antfu/eslint-config).

## Usage

### Install

```sh
pnpm i -D eslint @maneko/eslint-config
```

### Create config

Create `eslint.config.mjs` in your project root:

```js
// eslint.config.mjs
import { eslint } from '@maneko/eslint-config'

export default eslint()
```

### Add scripts for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

## Customization

Normally you only need to import the `eslint` preset:

```js
// eslint.config.js
import { eslint } from '@maneko/eslint-config'

export default eslint()
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import { eslint } from '@maneko/eslint-config'

export default eslint({
  // Type of the project. 'lib' for libraries, the default is 'app'
  type: 'lib',

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  // The `ignores` option in the option (first argument) is specifically treated to always be global ignores
  // And will **extend** the config's default ignores, not override them
  // You can also pass a function to modify the default ignores
  ignores: [
    '**/fixtures',
    // ...globs
  ],

  // Parse the `.gitignore` file to get the ignores, on by default
  gitignore: true,

  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // TypeScript and Vue are autodetected, you can also explicitly enable them:
  typescript: true,
  vue: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,
})
```

The `eslint` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import { eslint } from '@maneko/eslint-config'

export default eslint(
  {
    // Configures for eslint's config
  },

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  },
)
```

### Rules Overrides

Certain rules would only be enabled in specific files, for example, `ts/*` rules would only be enabled in `.ts` files and `vue/*` rules would only be enabled in `.vue` files. If you want to override the rules, you need to specify the file extension:

```js
// eslint.config.js
import { eslint } from '@maneko/eslint-config'

export default eslint(
  {
    vue: true,
    typescript: true,
  },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      'style/semi': ['error', 'never'],
    },
  },
)
```

We also provided the `overrides` options in each integration to make it easier:

```js
// eslint.config.js
import { eslint } from '@maneko/eslint-config'

export default eslint({
  vue: {
    overrides: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'interface'],
    },
  },
  yaml: {
    overrides: {
      // ...
    },
  },
})
```

> [!TIP]
> For advanced configuration of each integration, see [@antfu/eslint-config](https://github.com/antfu/eslint-config) docs.

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
pnpm i -D lint-staged simple-git-hooks

// to active the hooks
npx simple-git-hooks
```

## View enabled rules

You can use [@eslint/config-inspector](https://github.com/eslint/config-inspector) to visually inspect which rules are enabled in your project and which files they apply to.

Go to your project root that contains `eslint.config.js` and run:

```bash
npx @eslint/config-inspector
```

## Versioning Policy

This project follows [Semantic Versioning](https://semver.org/) for releases. However, since this is just a config and involves opinions and many moving parts, we don't treat rules changes as breaking changes.

### Changes Considered as Breaking Changes

- Node.js version requirement changes
- Huge refactors that might break the config
- Plugins made major changes that might break the config
- Changes that might affect most of the codebases

### Changes Considered as Non-breaking Changes

- Enable/disable rules and plugins (that might become stricter)
- Rules options changes
- Version bumps of dependencies

### I prefer XXX...

Sure, you can configure and override rules locally in your project to fit your needs. If that still does not work for you, you can always fork this repo and maintain your own.

## License

[@maneko/eslint-config](https://github.com/maneko-group/eslint-config) is licensed under the [MIT](./LICENSE) license.
