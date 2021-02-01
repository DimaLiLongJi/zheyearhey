const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => ({
  entry: {
    main: './public/main.ts',
  },

  output: {
    path: env === 'production' ? path.resolve(__dirname) : path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: env === 'production' ? '/zheyearhey/' : '/', // 上了生成需要制定这个 要不然懒加载的根路径就错了
  },

  resolve: {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx',
    ],
    alias: {
      '@indiv': path.resolve(__dirname, '../InDiv/packages'),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [{
      test: [
        /\.ts$/, /\.tsx$/,
      ],
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              'dynamic-import-webpack',
            ],
          },
        },
        'awesome-typescript-loader',
        path.resolve(__dirname, '../InDiv/packages/indiv-loader/build/index.js'),
      ],
    },
    {
      test: /\.css$/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')(),
              require('./postcss-px-to-rem-vw')(),
            ],
          },
        }
      ],
    }, {
      test: /\.less$/,
      // exclude: /node_modules/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          minimize: true,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer')(),
            require('./postcss-px-to-rem-vw')(),
          ],
        },
      }, {
        loader: 'less-loader',
        options: {
          paths: [
            path.resolve(__dirname, 'node_modules'),
            // path.resolve(__dirname, 'public/styles'),
          ],
          javascriptEnabled: true,
        },
      }],
    }],
  },
});

