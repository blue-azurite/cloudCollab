const path = require('path');
const webpack = require('webpack');

const PATHS = {
  compiled: path.join(__dirname, 'compiled'),
  src: path.join(__dirname, 'client/src/index.js')
}

module.exports = {
  entry: PATHS.src,
  output: { path: PATHS.compiled, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'], // in import statements default to these file types if none specified
    modulesDirectories: ['node_modules']
  }
};