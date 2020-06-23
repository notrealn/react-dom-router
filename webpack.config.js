const autoprefixer = require("autoprefixer");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  // entry is usually within src/
  entry: "src/script.js",
  output: {
    // output is at dist/
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devServer: {
    // equiv to express.static()
    contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "public")],
    compress: true,
    port: process.env.PORT
  },
  // extend webpack capability with plugins
  plugins: [
    new MiniCSSExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: devMode ? "[name].css" : "[name].[contenthash].css"
    })
  ],
  // this part tells webpack how to transform your code
  module: {
    rules: [
      {
        // bruh wtf did u paste this
        // yee
        // just boilerplate code
        test: /\.(jp(e?)g|png|gif|mp3|ttf|eot|woff)$/i,
        loader: "file-loader",
        options: {
          name: () => (devMode ? "[path][name].[ext]" : "[contenthash].[ext]")
        }
      },
      {
        test: /\.jsx?$/i,
        use: "babel-loader"
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
            options: { sourceMap: true, plugins: [autoprefixer()] }
          },
          { loader: "sass-loader" }
        ]
      }
    ]
  }
};
