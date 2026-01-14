import { formatValue } from '../utils/formatValue.js';

const icons = {
  info: (
    <svg className="console-icon" viewBox="0 0 24 24" fill="currentColor">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  warn: (
    <svg className="console-icon" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  error: (
    <svg className="console-icon" viewBox="0 0 24 24" fill="currentColor">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

function ConsoleEntry({ entry }) {
  const { type, args, timestamp } = entry;
  const icon = icons[type] || <span className="console-icon"></span>;

  const message = args.map((arg, i) => (
    <span key={i} dangerouslySetInnerHTML={{ __html: formatValue(arg, 0) }} />
  ));

  return (
    <div className={`console-entry ${type}`}>
      {icon}
      <span className="console-message">{message}</span>
      <span className="console-timestamp">{timestamp}</span>
    </div>
  );
}

export default ConsoleEntry;
