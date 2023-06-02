const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const plugins = () => {
  return [
    new HtmlWebpackPlugin(
        Object.assign(
            {},
            {
              template: "./index.html",
              filename: "index.html",
              inject: true,
            },
            isProd
                ? {
                  minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                  },
                }
                : undefined
        )
    ),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash:8].css",
      chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
    }),
    new CleanWebpackPlugin()
  ]
}

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isDev && require.resolve('style-loader'),
    isProd && {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
    });
  }
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: isDev ? "development" : "production",
  entry: ["@babel/polyfill", "./main.ts"],
  output: {
    filename: isProd ? 'js/[name].[chunkhash:8].js' : 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isDev ? '' : './', 
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@src': path.resolve(__dirname, 'src')
    }
  },
  devtool: isDev ? 'inline-source-map' : false,
  target: isDev ? "web" : "browserslist",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    hot: isDev,
    historyApiFallback: true,
    open: true,
    port: process.env.PORT || 3000,
    compress: true,
    overlay: {
      errors: true,
      warnings: false
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProd ? "production" : "development"
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              enforce: 'pre',
              cache: true,
              formatter: eslintFormatter,
            },
          },
        ]
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: getStyleLoaders({
          importLoaders: 1
        }),
        sideEffects: true
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /\.module\.(scss|sass)$/,
        use: getStyleLoaders(
          {
            importLoaders: 2
          }, 
          'sass-loader'
        ),
        sideEffects: true
      },
    ]
  },
  plugins: plugins()

}