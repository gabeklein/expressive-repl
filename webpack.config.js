const ReactWebAppPlugin = require("react-app-webpack-plugin");
const DeveloperPlugin = require("developer-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "src/index.js"
  },
  output: {
    path: __dirname + "/public",
    publicPath: "/"
  },
  devServer: {},
  module: {
    rules: [
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new DeveloperPlugin({
      assets: "./static"
    }),
    new ReactWebAppPlugin({
      babel: {
        presets: [
          ["@expressive/react", {
            hot: true
          }]
        ]
      }
    })
  ]
};