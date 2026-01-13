import { useState, useRef, useCallback } from 'react';
import Editor from './components/Editor.jsx';
import Console from './components/Console.jsx';
import { DEFAULT_CODE } from './constants.js';

function App() {
  const [consoleEntries, setConsoleEntries] = useState([]);
  const [code, setCode] = useState(DEFAULT_CODE);
  const consolePanelRef = useRef(null);

  const addConsoleEntry = useCallback((type, args) => {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    setConsoleEntries((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), type, args, timestamp },
    ]);
  }, []);

  const clearConsole = useCallback(() => {
    setConsoleEntries([]);
  }, []);

  const scrollToConsole = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && consolePanelRef.current) {
      consolePanelRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const runCode = useCallback(async () => {
    addConsoleEntry('info', ['Executing code...']);
    scrollToConsole();

    const sandboxConsole = {
      log: (...args) => addConsoleEntry('log', args),
      info: (...args) => addConsoleEntry('info', args),
      warn: (...args) => addConsoleEntry('warn', args),
      error: (...args) => addConsoleEntry('error', args),
      clear: () => clearConsole(),
    };

    try {
      const wrappedCode = `
        return (async function(console) {
          ${code}
        })(sandboxConsole);
      `;

      const fn = new Function('sandboxConsole', wrappedCode);
      const result = await fn(sandboxConsole);

      if (result !== undefined) {
        addConsoleEntry('result', ['<-', result]);
      }
    } catch (error) {
      addConsoleEntry('error', [error.stack || error.message || String(error)]);
    }
  }, [code, addConsoleEntry, clearConsole, scrollToConsole]);

  return (
    <div className="app-container">
      <Editor code={code} setCode={setCode} onRun={runCode} />
      <Console
        ref={consolePanelRef}
        entries={consoleEntries}
        onClear={clearConsole}
      />
    </div>
  );
}

export default App;
