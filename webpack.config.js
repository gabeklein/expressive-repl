const ReactWebAppPlugin = require("react-app-webpack-plugin");
const DeveloperPlugin = require("developer-webpack-plugin");

module.exports = {
  entry: {
    index: "src/index.js"
  },
  output: {
    path: __dirname + "/public",
    publicPath: "/"
  },
  devServer: {},
  plugins: [
    new DeveloperPlugin({
      assets: "./static"
    }),
    new ReactWebAppPlugin({
      babel: {
        presets: [
          "@expressive/react"
        ]
      }
    }),
  ]
};