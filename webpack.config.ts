import webpack from "webpack";
import path from "path";
import { IBuildPaths, TBuildMode } from "./config/webpack/types/types";
import { webpackBuild } from "./config/webpack/build";

interface EnvVariables {
  mode: TBuildMode;
  port: number;
}

export default (env: EnvVariables): webpack.Configuration => {
  const paths: IBuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: path.resolve(__dirname, 'dist'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  }

  const config: webpack.Configuration = webpackBuild({
    port: env.port || 3000,
    mode: env.mode,
    paths: paths
  });

  return config;
}
