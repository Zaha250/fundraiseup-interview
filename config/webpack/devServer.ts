import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { IBuildOptions } from "./types/types";

export function webpackDevServer(options: IBuildOptions): DevServerConfiguration {
  return {
    port: options.port || 3000,
    open: true,
    hot: true,
    client: {
      overlay: true,
    }
  }
}
