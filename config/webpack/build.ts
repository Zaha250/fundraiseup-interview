import { Configuration } from "webpack";
import { webpackLoaders } from "./loaders";
import { webpackPlugins } from "./plugins";
import { webpackDevServer } from "./devServer";
import { IBuildOptions } from "./types/types";

export function webpackBuild(options: IBuildOptions): Configuration {
  const {mode, paths} = options;

  const isDev = mode === 'development';

  return {
    mode: mode || "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash:8].js",
      clean: true
    },
    module: {
      rules: webpackLoaders(options)
    },
    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        '@src': paths.src
      }
    },
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
    devServer: webpackDevServer(options),
    plugins: webpackPlugins(options)
  }
}
