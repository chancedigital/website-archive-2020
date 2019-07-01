const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new LoadablePlugin()],
    resolve: {
      alias: {
        '@src': path.join(__dirname, './src'),
        '@components': path.join(__dirname, './src/components'),
        '@images': path.join(__dirname, './src/images'),
        '@lib': path.join(__dirname, './src/lib'),
        '@pages': path.join(__dirname, './src/pages'),
        '@providers': path.join(__dirname, './src/providers'),
        '@templates': path.join(__dirname, './src/templates'),
      },
    },
  });
};
