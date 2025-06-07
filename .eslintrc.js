module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // no es necesario en Next.js
    '@typescript-eslint/no-unused-vars': ['warn'],
    "react/no-unescaped-entities": "off",
    'no-console': 'warn',
    'semi': "off",
    'quotes': "off",
     "@next/next/no-img-element": "off"
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
