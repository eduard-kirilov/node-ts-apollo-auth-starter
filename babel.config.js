/**
* Node, Mongo, GraphQL - Starter Kit
* https://github.com/eduard-kirilov/Online-store-5-api-products
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '18.12.1',
        },
        useBuiltIns: 'usage',
        corejs: 3,
        ignoreBrowserslistConfig: true,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-idx',
  ],
  sourceMaps: 'inline',
};
