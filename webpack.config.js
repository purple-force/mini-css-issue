const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
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
    chunkFilename: '[id].js',
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
          test: (m, c, entry) => {
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
    new MiniCssExtractPlugin({ filename: '[name].css' })
  ]
};
