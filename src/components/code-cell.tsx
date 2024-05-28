import { useEffect, useContext } from "react";

import Editor from "./editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell, cellsStore } from "../stores/CellsStore";
import { bundlesStore, BundlesStoreContext } from "../stores/BundlesStore";
import { observer } from "mobx-react"

import './code-cell.css'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = observer(({ cell }) => {
  const { bundles } = useContext(BundlesStoreContext)
  const bundle = bundles[cell.id]
  const cumulativeCode = cellsStore.getCumulativeCode(cell.id)
  const code = cumulativeCode.join('\n')

  useEffect(() => {
    const timer = setTimeout(async () => {
      await bundlesStore.createBundle(cell.id, code)
    }, 750)

    return () => {
      clearTimeout(timer);
    }
  }, [cell.content, cell.id, code])

  return (
    <Resizable direction="vertical">
      <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row"}}>
        <Resizable direction="horizontal">
          <Editor value={cell.content} onChange={(v) => cellsStore.updateCell(cell.id, v)} />
        </Resizable>
        <div className="progress-wrapper">
        {
          !bundle || bundle.loading
            ? 
              <div className="progress-cover">
                <progress className="progress is-small is-secondary" max="100">
                  Loading
                </progress>
              </div>
            : <Preview code={bundle.code} err={bundle.err} />
        }
        </div>
      </div>
    </Resizable>
  );
});

export default CodeCell;
