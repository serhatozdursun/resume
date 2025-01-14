import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: [
      'node_modules/',
      'build/',
      '.next/',
      'babel.config.js',
      'jest.config.js',
      'next-sitemap.config.js',
      'next.config.js',
    ],
  },
  {
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];
