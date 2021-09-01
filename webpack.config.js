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
  resolve: {
    alias: {
      "react": require.resolve("react"),
      "react-dom": require.resolve("react-dom"),
      "@expressive/mvc": require.resolve("@expressive/mvc"),
      "@expressive/css": require.resolve("@expressive/css"),
    }
  },
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