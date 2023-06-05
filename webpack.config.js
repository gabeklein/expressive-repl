const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const DEV = !!process.env.WEBPACK_SERVE;

const BABEL = {
  presets: [
    "@babel/preset-typescript",
    "@expressive/babel-preset-react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties"
  ]
}

/** @type {import("webpack").Configuration} */
const CONFIG = module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    devtoolModuleFilenameTemplate: info => (
      `webpack://${info.resourcePath}`
    ),
  },
  externals: {
    "@babel/standalone": "Babel"
  },
  resolve: {
    extensions: [".js", ".ts"],
    modules: ['./src', './node_modules'],
    fallback: {
      "path": false
    }
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: BABEL
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
        type: "asset/resource",
        generator: {
          filename: `static/[hash:10][ext]`
        }
      }
    ]
  },
  plugins: [
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

if(DEV){
  CONFIG.mode = "development",
  CONFIG.devtool = "source-map",
  CONFIG.stats = "errors-only",
  CONFIG.devServer = {
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: true,
    hot: true
  }
  CONFIG.plugins.push(
    new ReactRefreshWebpackPlugin()
  );

  BABEL.plugins.push("react-refresh/babel");
}
else {
  CONFIG.optimization = {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /node_modules\/react/,
          name: 'react',
          chunks: 'all',
        },
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
        }
      }
    }
  }
}