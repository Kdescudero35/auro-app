module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@app': './src/app',
            '@features': './src/features',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@store': './src/store',
            '@theme': './src/theme',
            '@constants': './src/constants',
            '@types': './src/types',
            '@utils': './src/utils',
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
