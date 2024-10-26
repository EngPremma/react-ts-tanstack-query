import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import reactRefresh from 'eslint-plugin-react-refresh';
// import { configs as ReactQueryConfigs, rules as ReactQueryRules } from "@tanstack/eslint-plugin-query";
// import tanstackQuery from '@tanstack/eslint-plugin-query';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/dist/', '**/build', '**/types/', '**/node_modules/', '**/out/', '**/public/'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@tanstack/eslint-plugin-query/recommended',
      'plugin:prettier/recommended',
    ),
  ),
  {
    plugins: {
      'react-refresh': reactRefresh,
      // '@tanstack/query': fixupPluginRules(tanstackQuery),
      // "@tanstack/eslint-plugin-query": { rules: ReactQueryRules, configs: ReactQueryConfigs },
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          printWidth: 110,
          semi: true,
          arrowParens: 'avoid',
        },
      ],
      // '@tanstack/eslint-plugin-query/exhaustive-deps': 'error',
      // '@tanstack/eslint-plugin-query/no-rest-destructuring': 'warn',
      // '@tanstack/eslint-plugin-query/stable-query-client': 'error',
    },
  },
];
