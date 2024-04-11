import MonacoEditor from "@monaco-editor/react";
import React from "react";
import { editor } from 'monaco-editor';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const onEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue())
    });

    editor.getModel()?.updateOptions({ tabSize: 2 })
  };
  return (
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
  );
};

export default Editor;
