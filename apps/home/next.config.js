const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const withTM = require('next-transpile-modules')(['services']);

const isAssetPrefix = process.env.BASE_PATH || '';

module.exports = withBundleAnalyzer(
  withTM({
    distDir: 'build',
    assetPrefix: isAssetPrefix,
    basePath: isAssetPrefix,
    env: {
      BASE_PATH: isAssetPrefix
    },
    webpack: (config, options) => {
      const { ModuleFederationPlugin } = options.webpack.container;

      config.plugins.push(
        new ModuleFederationPlugin({
          remotes: {
            header: 'header_remote@http://localhost:4000/remoteEntry.js'
          },
          shared: []
        })
      );

      return config;
    }
  })
);
