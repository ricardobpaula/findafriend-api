module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@core': './src/core',
          '@infra': './src/infra',
          '@domain': './src/domain',
          '@config': './src/config',
          '@test': './src/test'
        }
      }
    ],
    '@babel/plugin-proposal-class-properties'
  ]
}
