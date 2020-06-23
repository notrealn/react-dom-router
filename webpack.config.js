const path = require("path");

// module.exports = {
//   entry: "/public/script.js",
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name].js"
//   },
//   devServer: {
//     contentBase: path.join(__dirname, "dist"),
//     compress: true,
//     port: process.env.PORT
//   }
// };

module.exports = {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 8080,
    host: `localhost`
  },
  entry: {
    app: ["./src_client/index.js"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/js/",
    filename: `[name].js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: "false",
                    useBuiltIns: "usage",
                    targets: "> 0.25%, not dead",
                    corejs: 3
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  }
};
