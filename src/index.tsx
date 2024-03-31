import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

import { unpkgPlugin } from "./plugins/unpkg-plugin";

const App = () => {
  const esBuildRef = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const initializeEsbuildService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
    });

    esBuildRef.current = esbuild;
  };

  useEffect(() => {
    initializeEsbuildService();
  }, []);

  const transformToCode = async () => {
    const { outputFiles } = await esBuildRef.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    setCode(outputFiles[0].text);
  };

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <div>
        <button onClick={transformToCode}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
