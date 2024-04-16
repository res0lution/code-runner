import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

import { unpkgPlugin } from "./plugins/unpkg-plugin";
import Editor from "./components/editor";

import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
  const esBuildRef = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState("");

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
    iframe.current.srcdoc = html;

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

    iframe.current.contentWindow.postMessage(outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (e) => {
            try {
              eval(e.data);
            } catch (e) {
              const root = document.querySelector('#root')
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + e + '</div>'
              console.error(e)
            }
          }, false)
        </script>
      </body>
      <script></script>
    </html>
  `;

  return (
    <div>
      <Editor value="const a = 1;" onChange={(v) => setInput(v)} />
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <div>
        <button onClick={transformToCode}>Submit</button>
      </div>
      <iframe
        ref={iframe}
        title="code preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
