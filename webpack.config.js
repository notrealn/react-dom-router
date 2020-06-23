const path = require("path");

module.exports = {
  // entry is usually within src/
  entry: "src/script.js",
  output: {
    // output is at dist/
    path: path.resolve(__dirname, "dist"),
    // name is main
    filename: "[name].js"
  },
  devServer: {
    // equiv to express.static()
    contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "public")],
    // use gzip
    compress: true,
    
    port: process.env.PORT
  },
  // this part tells webpack how to transform your code
  module: {
    rules: [
      {
        // use regex on file name
        test: /\.jsx?$/i,
        // babel is what you will usually use for js
        use: 'babel-loader',
      },
      {// eveyrone love sregex
        test: /\.s?css%/i,
        
      },
    ],
  }
 
};

// use ts-loader + babel-laoder
