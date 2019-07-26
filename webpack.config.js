const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const magicImporter = require('node-sass-magic-importer');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./assets/js/index.js', './assets/scss/main.scss'],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              importer: magicImporter(),
              sourceMap: true
            }
          }
        ]
        // use: [
        //     process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
        //     "css-loader", // translates CSS into CommonJS
        //     "sass-loader" // compiles Sass to CSS, using Node Sass by default
        // ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name}.[id].css"
    })
  ],
  optimization: {
    minimizer: []
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080
  }
};
