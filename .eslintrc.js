/**
* Node, Mongo, GraphQL - Starter Kit
* https://github.com/eduard-kirilov/Online-store-5-api-products
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['migrations/*.ts', 'seeds/*.ts', 'scripts/*.ts'],
      extends: 'eslint:recommended',
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      files: ['knexfile.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
};
