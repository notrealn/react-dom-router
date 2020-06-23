const path = require("path");

module.exports = {
  entry: "/public/script.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: process.env.PORT
  }
};
