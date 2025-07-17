import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
  {
    ignores: [
      'node_modules/',
      'build/',
      '.next/',
      'babel.config.js',
      'jest.config.js',
      'next-sitemap.config.js',
      'next.config.js',
      'scripts/',
      '.lintstagedrc.js',
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
