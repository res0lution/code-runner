import { useEffect, useState } from "react";

import Editor from "./editor";
import Preview from "./preview";
import Resizable from "./resizable";
import bundle from "../bundler";

const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await bundle(input);
      setCode(result);
    }, 750)

    return () => {
      clearTimeout(timer);
    }
  }, [input])

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row"}}>
        <Resizable direction="horizontal">
          <Editor value="const a = 1;" onChange={(v) => setInput(v)} />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
