module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'module-resolver',
      {
        alias: {
          '@apps': './src/apps',
          '@config': './src/config',
          '@helper': './src/helper',
          '@middlewares': './src/middlewares',
          '@shared': './src/shared',
          '@tools': './src/tools',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
