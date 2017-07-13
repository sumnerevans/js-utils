const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js-utils.js',
    library: 'js-utils',
    libraryTarget: 'umd',
  },
};
