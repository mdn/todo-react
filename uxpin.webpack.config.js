const path = require("path");
const webpack = require("webpack");

module.exports = {
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
      publicPath: "/"
    },
    resolve: {
      modules: [__dirname, "node_modules"],
      extensions: ["*", ".js", ".jsx"]
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(s*)css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
          ]
        },
        {
          loader: "babel-loader",
          test: /\.js?$/,
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        },
      ]
    }
}
