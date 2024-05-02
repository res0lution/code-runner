import * as esbuild from "esbuild-wasm";
import { unpkgPlugin } from "../plugins/unpkg-plugin";

const bundle = async function (code: string) {
  // @ts-ignore
  if (window.isEsBuild) {
    try {
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

      return { code: outputFiles[0].text, err: '' }
    } catch (e: any) {
      return {
        code: '', err: e.message 
      }
    }
  }

  return {
    code: '', err: '' 
  }
};

export default bundle;