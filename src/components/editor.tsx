import MonacoEditor, { OnMount } from "@monaco-editor/react";
import React, { useRef } from "react";
import prettier from "prettier";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import Highlighter, { makeBabelParse } from "monaco-jsx-highlighter";
import traverse from "@babel/traverse";
import { parse } from "@babel/parser";

import "./editor.css";
import "./syntax.css";

declare module "monaco-jsx-highlighter";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;

    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });

    const parseJSX = makeBabelParse(parse, true);

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      parseJSX,
      traverse,
      editor
    );

    highlighter.highlightOnDidChangeModelContent(100);
    highlighter.addJSXCommentCommand();
  };

  const onFormatClick = async () => {
    const unformatted = editorRef.current.getValue();

    const formatted = await prettier.format(unformatted, {
      parser: "babel",
      plugins: [parserBabel, prettierPluginEstree],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });

    editorRef.current.setValue(formatted.replace(/\n$/, ""));
  };

  return (
    <div className="wrapper">
      <MonacoEditor
        onMount={onEditorDidMount}
        value={value}
        theme="vs-dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />

      <button
        className="button format-btn is-secondary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
    </div>
  );
};

export default Editor;
