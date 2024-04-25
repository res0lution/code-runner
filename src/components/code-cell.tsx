import { useState } from "react";

import Editor from "./editor";
import Preview from "./preview";
import Resizable from "./resizable";
import bundle from "../bundler";

const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  const transformToCode = async () => {
    const result = await bundle(input);
    setCode(result);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row"}}>
        <Editor value="const a = 1;" onChange={(v) => setInput(v)} />
        {/* <div>
          <button onClick={transformToCode}>Submit</button>
        </div> */}
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
