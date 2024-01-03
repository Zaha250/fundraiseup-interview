import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { IBuildOptions } from "./types/types";

export function webpackLoaders(options: IBuildOptions): ModuleOptions['rules'] {
  const isProd = options.mode === 'production';

  return [
    {
      test: /\.css$/i,
      use: [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.ts$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-typescript"
          ]
        }
      },
      exclude: /node_modules/
    }
  ]
}
