import * as esbuild from "esbuild-wasm";
import { unpkgPlugin } from "../plugins/unpkg-plugin";

const bundle = async function (code: string) {
  const { outputFiles } = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPlugin(code)],
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
  });

  return outputFiles[0].text
};

export default bundle;