import { useEffect, useState } from "react";

import Editor from "./editor";
import Preview from "./preview";
import Resizable from "./resizable";
import bundle from "../bundler";
import { Cell, cellsStore } from "../stores/CellsStore";

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await bundle(cell.content);
      setCode(result.code);
      setErr(result.err);
    }, 750)

    return () => {
      clearTimeout(timer);
    }
  }, [cell.content])

  return (
    <Resizable direction="vertical">
      <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row"}}>
        <Resizable direction="horizontal">
          <Editor value={cell.content} onChange={(v) => cellsStore.updateCell(cell.id, v)} />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
