import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import * as esbuild from "esbuild-wasm";

import CodeCell from "./components/code-cell";

import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
  useEffect(() => {
    esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
    });
  }, []);

  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
