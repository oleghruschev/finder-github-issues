const path = require('path');
const withImages = require('next-images');

module.exports = withImages({
  webpack(config) {
    config.resolve.alias['assets'] = path.join(__dirname, 'assets');
    config.resolve.alias['config'] = path.join(__dirname, 'config');
    config.resolve.alias['helpers'] = path.join(__dirname, 'helpers');
    config.resolve.alias['components'] = path.join(__dirname, 'components');

    return config;
  },
});
