import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as esbuild from "esbuild-wasm";

import Editor from "./components/editor";
import Preview from "./components/preview";
import bundle from "./bundler";

import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
    });
  }, [])

  const transformToCode = async () => {
    const result = await bundle(input);
    setCode(result);
  };

  return (
    <div>
      <Editor value="const a = 1;" onChange={(v) => setInput(v)} />
      <div>
        <button onClick={transformToCode}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
