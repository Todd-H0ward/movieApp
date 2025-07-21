import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import { globalIgnores } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  globalIgnores(['dist']),
  ...tseslint.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: eslintPluginImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'only-export-components': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'type', 'sibling', 'object', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '{@/types/**,**/types/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{@/components/**,**/components/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{@/providers/**,**/providers/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{@/store/**,**/store/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{@/hooks/**,**/hooks/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{@/utils/**,**/utils/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{@/stubs/**,**/stubs/**,@/constants/**,**/constants/**}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '**/*.scss',
              group: 'sibling',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },
];
