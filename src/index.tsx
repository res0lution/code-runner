import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import * as esbuild from "esbuild-wasm";
import { Provider } from "mobx-react";

import CellList from "./components/cell-list";
import { cellsStore } from "./stores/CellsStore";
import { bundlesStore } from "./stores/BundlesStore";

import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"


const App = () => {
  useEffect(() => {
   esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.21.4/esbuild.wasm",
    }).then(() => { 
      // @ts-ignore
      window.isEsBuild = true 
    });
  }, []);

  return (
    <div>
      <Provider cellsStore={cellsStore} bundlesStore={bundlesStore}>
        <CellList />
      </Provider>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(<App />);
