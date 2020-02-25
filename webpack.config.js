const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else {
    for (const chunk of m._chunks) {
      return chunk.name;
    }
    return false;
  }
}

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.jsx',
  },
  output: {
    filename: '[name].js',
    // chunkFilename: '[id]-chunk.js',
    path: path.join(__dirname, './build'),
    publicPath: '/build/',
  },
  devServer: {
    publicPath: '/build/',
    port: 9090,
    historyApiFallback: true,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        index: {
          name: 'index',
          test: (m, c, entry = 'index') => {
            return m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry;
          },
          chunks: 'all',
          enforce: true,
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // chunkFilename: '[name]-chunk.css',
    }),
  ]
};
