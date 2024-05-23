import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import * as esbuild from "esbuild-wasm";
import { Provider } from "mobx-react";


// import CodeCell from "./components/code-cell";
// import TextEditor from "./components/text-editor";
import CellList from "./components/cell-list";
import { cellsStore } from "./stores/CellsStore";

import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"


const App = () => {
  useEffect(() => {
   esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
    }).then(() => { 
      // @ts-ignore
      window.isEsBuild = true 
    });
  }, []);

  return (
    <div>
      <Provider cellsStore={cellsStore}>
        <CellList />
        {/* <TextEditor /> */}
      </Provider>
      {/* <CodeCell /> */}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
