module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'jsx-a11y',
        'import',
        'next'
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:next/recommended'
    ],
    settings: {
        react: {
            version: 'detect'
        },
        next: {
            // Enable eslint-plugin-next to automatically detect Next.js version
            // You can also manually set the version:
            // version: '10.0.0', // Replace with your Next.js version
        }
    },
    parserOptions: {
        ecmaVersion: 2023, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    rules: {
        // Best Practices
        'react/prop-types': 'off', // Not necessary when using TypeScript for type checking
        'react/react-in-jsx-scope': 'off', // Next.js automatically imports React
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        // TypeScript
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Next.js API routes don't require explicit return types
        '@typescript-eslint/no-explicit-any': 'off', // Sometimes unavoidable, but use sparingly
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Allow unused variables prefixed with underscore
        '@typescript-eslint/no-empty-function': 'off', // Allow empty functions
        '@typescript-eslint/explicit-function-return-type': 'off', // Allow TypeScript to infer function return types

        // React
        'react/jsx-props-no-spreading': 'off', // Allow spreading props

        // Import
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'import/prefer-default-export': 'off', // Allow named exports

        // Next.js
        'next/no-html-link-for-pages': 'error', // Ensures all links use `Link` from Next.js
        'next/link-passhref': 'error', // Ensures all links use `passHref` prop
        'next/no-img-element': 'off', // Allow using <img> element directly

        // JSX Accessibility
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton']
            }
        ],
        '@typescript-eslint/no-unused-vars': 'off' // Disable the duplicated rule
    }
};
