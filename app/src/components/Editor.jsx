import { useCallback } from 'react';
import MonacoEditor from '@monaco-editor/react';

function Editor({ code, setCode, onRun }) {
  const handleEditorMount = useCallback(
    (editor, monaco) => {
      // Add Ctrl+Enter keyboard shortcut
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        onRun();
      });
    },
    [onRun]
  );

  return (
    <div className="editor-panel">
      <MonacoEditor
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || '')}
        onMount={handleEditorMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          tabSize: 2,
          insertSpaces: true,
        }}
        loading={<div className="loading">Loading editor...</div>}
      />
      <button
        className="run-button"
        onClick={onRun}
        title="Run code (Ctrl+Enter)"
      >
        <svg viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        Run
      </button>
    </div>
  );
}

export default Editor;
