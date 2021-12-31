const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const DEV = !!process.env.WEBPACK_SERVE;

const LINKED = {
  "react": require.resolve("react"),
  "react-dom": require.resolve("react-dom"),
  "@expressive/mvc": require.resolve("@expressive/mvc"),
  "@expressive/css": require.resolve("@expressive/css"),
}

const BABEL_CONFIG = {
  presets: [
    "@babel/preset-typescript",
    "@expressive/babel-preset-react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties"
  ]
}

if(DEV)
  BABEL_CONFIG.plugins.push("react-refresh/babel");

module.exports = {
  mode: DEV ? "development" : "production",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    devtoolModuleFilenameTemplate: "file:///[absolute-resource-path]"
  },
  externals: {
    "@babel/standalone": "Babel"
  },
  devtool: DEV ? "source-map" : undefined,
  devServer: {
    hot: true
  },
  stats: {
    modules: false,
    assets: false,
    chunks: false
  },
  resolve: {
    alias: LINKED,
    extensions: [".js", ".ts"],
    fallback: {
      "path": false
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: BABEL_CONFIG
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(svg|png|jpg|otf)$/i,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/develop.html"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: __dirname + "/static",
          to: __dirname + "/public"
        },
      ]
    })
  ]
};