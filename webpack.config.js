const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const working = (relative) => path.resolve(process.cwd(), relative);

const linked = {
  "react": require.resolve("react"),
  "react-dom": require.resolve("react-dom"),
  "@expressive/mvc": require.resolve("@expressive/mvc"),
  "@expressive/css": require.resolve("@expressive/css"),
}

const babelrc = {
  presets: [
    require("@babel/preset-typescript"),
    require("@expressive/babel-preset-react")
  ],
  plugins: [
    require("@babel/plugin-proposal-class-properties"),
    // require("react-refresh/babel")
  ]
}

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: __dirname + "/public",
    publicPath: "/"
  },
  externals: {
    "@babel/standalone": "Babel"
  },
  devServer: {
    // host: "0.0.0.0",
    // port: 8080,
    // contentBase: path,
    // allowedHosts: [ '.ngrok.io' ],
    // historyApiFallback: true,
    hot: true
  },
  resolve: {
    alias: linked,
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelrc
        }
      },
      {
        test: /\.css$/,
        use: [
          require.resolve("style-loader"),
          require.resolve("css-loader")
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: working("./src/develop.html")
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: working("./static"),
          to: working("./public") },
      ]
    })
    // new ReactRefreshWebpackPlugin()
  ]
};