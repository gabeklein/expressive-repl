const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const working = (relative) => path.resolve(process.cwd(), relative);

const linked = {
  "react": require.resolve("react"),
  "react-dom": require.resolve("react-dom"),
  "@expressive/mvc": require.resolve("@expressive/mvc"),
  "@expressive/css": require.resolve("@expressive/css"),
}

const babelrc = {
  presets: [
    "@babel/preset-typescript",
    "@expressive/babel-preset-react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "react-refresh/babel"
  ]
}

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    devtoolModuleFilenameTemplate: "file:///[absolute-resource-path]"
  },
  externals: {
    "@babel/standalone": "Babel"
  },
  devtool: "source-map",
  devServer: {
    hot: true
  },
  resolve: {
    alias: linked,
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelrc
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
          from: working("./static"),
          to: working("./public") },
      ]
    })
  ]
};