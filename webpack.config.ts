import * as autoprefixer from 'autoprefixer';
import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import * as OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
import * as path from 'path';
import { Configuration } from 'webpack';
import { Configuration as WDSConfiguration } from 'webpack-dev-server';

const devMode = process.env.NODE_ENV !== 'production';

export default <Configuration>{
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'inline-source-map' : 'source-map',
  // entry is usually within src/
  entry: './src/index.tsx',
  output: {
    // output is at dist/
    path: path.resolve(__dirname, 'dist'),
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
  },
  devServer: <WDSConfiguration>{
    // equiv to express.static()
    contentBase: [
      path.join(__dirname, 'dist'),
      path.join(__dirname, 'public'),
    ],
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [
        { from: /^.*$/, to: '/views/index.html' },
      ],
      index: '/views/index.html',
    },
    compress: true,
    port: process.env.PORT,
  },
  // extend webpack capability with plugins
  plugins: [
    // basically this bundles css for each entrypoint
    new MiniCSSExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[name].css' : '[name].[contenthash].css',
    }),
    ...(devMode ? [] : [new OptimizeCSSPlugin()]),
    ...((pages: {
      [chunk: string]: HTMLWebpackPlugin.Options & {
        preBody?: string;
        postBody?: string;
        preHead?: string;
        postHead?: string;
      };
    }) => {
      const output: Array<HTMLWebpackPlugin> = [];
      for (const [chunk, options] of Object.entries(pages))
        output.push(
          new HTMLWebpackPlugin({
            inject: false,
            chunks: [chunk],
            minify: 'auto',
            template: './src/template.ejs',
            ...options,
          })
        );

      return output;
    })({
      main: { title: 'website!!!', filename: 'views/index.html' },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
  // this part tells webpack how to transform your code
  module: {
    rules: [
      {
        test: /\.js(x?)$/i,
        enforce: 'pre',
        loader: 'source-map-loader',
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.ts(x?)/i,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: { transpileOnly: true, experimentalWatchApi: true },
          },
        ],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, plugins: [autoprefixer()] },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
