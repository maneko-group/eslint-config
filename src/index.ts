import type {
  Awaitable,
  ConfigNames,
  OptionsConfig,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

import antfu from '@antfu/eslint-config'

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
        'style/comma-dangle': ['error', 'always-multiline'],
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
        'style/semi': ['error', 'never'],
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
        'antfu/if-newline': 'off',
        'no-console': 'warn',
        'react/prefer-namespace-import': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'test/prefer-lowercase-title': 'off',
      },
    },
    {
      name: 'maneko-group/perfectionist',
      rules: {
        'perfectionist/sort-imports': [
          'error',
          {
            type: 'natural',
            order: 'asc',
            internalPattern: ['^~/.+', '^@/.+'],
            newlinesBetween: 'ignore',
            newlinesInside: 'ignore',
            groups: [
              'type-import',
              ['value-builtin', 'value-external'],
              'type-internal',
              'value-internal',
              ['type-parent', 'type-sibling', 'type-index'],
              ['value-parent', 'value-sibling', 'value-index'],
              'side-effect',
              'side-effect-style',
              'ts-equals-import',
              'unknown',
            ],
          },
        ],
        'perfectionist/sort-jsx-props': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
            groups: ['shorthand-prop', 'reserved', 'multiline-prop', 'unknown', 'callback'],
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
          },
        ],
      },
    },
    {
      name: 'maneko-group/disable/markdown',
      files: ['**/*.md'],
      rules: {
        'perfectionist/sort-imports': 'off',
      },
    },
    ...configs,
  )
}
