import { forwardRef, useEffect, useRef } from 'react';
import ConsoleEntry from './ConsoleEntry.jsx';

const Console = forwardRef(function Console({ entries, onClear }, ref) {
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className="console-panel" ref={ref}>
      <div className="console-header">
        <span className="console-title">Console</span>
        <div className="console-actions">
          <button
            className="console-btn"
            onClick={onClear}
            title="Clear console"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="console-output" ref={outputRef}>
        {entries.map((entry) => (
          <ConsoleEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
});

export default Console;
