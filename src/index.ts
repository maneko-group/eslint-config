import type {
  Awaitable,
  ConfigNames,
  OptionsConfig,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

import antfu from '@antfu/eslint-config'

import {
  GLOB_ASTRO,
  GLOB_ASTRO_TS,
  GLOB_JS,
  GLOB_JSX,
  GLOB_SRC,
  GLOB_SVELTE,
  GLOB_TS,
  GLOB_TSX,
} from './globs'

type EslintOptions = OptionsConfig & TypedFlatConfigItem

export type Eslint = (
  options?: EslintOptions,
  ...userConfigs: Awaitable<
    FlatConfigComposer<any, any> | Linter.Config[] | TypedFlatConfigItem | TypedFlatConfigItem[]
  >[]
) => FlatConfigComposer<TypedFlatConfigItem, ConfigNames>

export const eslint: Eslint = (inputOptions = {} as EslintOptions, ...configs) => {
  const stylistic = inputOptions?.stylistic ?? false

  if (stylistic) {
    configs.unshift({
      name: 'maneko-group/stylistic',
      rules: {
        'style/arrow-parens': ['error', 'always'],
        'style/brace-style': 'off',
        'style/comma-dangle': ['error', 'never'],
        'style/indent': ['error', 2, { SwitchCase: 1 }],
        'style/jsx-curly-newline': 'off',
        'style/jsx-one-expression-per-line': 'off',
        'style/jsx-quotes': ['error', 'prefer-single'],
        'style/linebreak-style': ['error', 'unix'],
        'style/max-len': [
          'error',
          100,
          2,
          {
            ignoreComments: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
          },
        ],
        'style/member-delimiter-style': 'off',
        'style/multiline-ternary': 'off',
        'style/no-tabs': 'error',
        'style/operator-linebreak': 'off',
        'style/quote-props': 'off',
        'style/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'always' }],
        'style/semi': ['error', 'always'],
      },
    })
  }

  if (inputOptions.react) {
    configs.unshift({
      name: 'maneko-group/react',
      rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    })
  }

  return antfu(
    { ...inputOptions },
    {
      name: 'maneko-group/rewrite',
      rules: {
        'no-console': 'warn',
        'react-hooks/exhaustive-deps': 'off',
        'test/prefer-lowercase-title': 'off',
      },
    },
    {
      name: 'maneko-group/perfectionist',
      files: [
        GLOB_SRC,
        GLOB_JS,
        GLOB_JSX,
        GLOB_TS,
        GLOB_TSX,
        GLOB_SVELTE,
        GLOB_ASTRO,
        GLOB_ASTRO_TS,
      ],
      rules: {
        'perfectionist/sort-imports': [
          'error',
          {
            groups: [
              'type-import',
              ['value-builtin', 'value-external'],
              'type-internal',
              'value-internal',
              ['type-parent', 'type-sibling', 'type-index'],
              ['value-parent', 'value-sibling', 'value-index'],
              'side-effect',
              'side-effect-style',
              'unknown',
            ],
            internalPattern: ['^~/.*', '^@/.*'],
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-jsx-props': [
          'error',
          {
            customGroups: [
              {
                groupName: 'reserved',
                elementNamePattern: '^(key|ref)$',
              },
              {
                groupName: 'callback',
                elementNamePattern: '^on[A-Z].*',
              },
            ],
            groups: ['shorthand-prop', 'reserved', 'multiline-prop', 'unknown', 'callback'],
            order: 'asc',
            type: 'alphabetical',
          },
        ],
        'perfectionist/sort-union-types': [
          'error',
          {
            groups: [
              'conditional',
              'function',
              'import',
              'intersection',
              'keyword',
              'literal',
              'named',
              'object',
              'operator',
              'tuple',
              'union',
              'nullish',
            ],
            order: 'asc',
            specialCharacters: 'keep',
            type: 'alphabetical',
          },
        ],
      },
    },
    ...configs,
  )
}
