// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Format value for display in console
export function formatValue(value, depth = 0) {
  if (depth > 3) {
    return '...';
  }

  if (value === null) {
    return '<span class="null-value">null</span>';
  }
  if (value === undefined) {
    return '<span class="undefined-value">undefined</span>';
  }
  if (typeof value === 'string') {
    return `<span class="string-value">"${escapeHtml(value)}"</span>`;
  }
  if (typeof value === 'number') {
    return `<span class="number-value">${value}</span>`;
  }
  if (typeof value === 'boolean') {
    return `<span class="boolean-value">${value}</span>`;
  }
  if (typeof value === 'function') {
    return `<span class="object-preview">[Function: ${value.name || 'anonymous'}]</span>`;
  }
  if (value instanceof Error) {
    return `<span class="error">${escapeHtml(value.stack || value.message)}</span>`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '<span class="object-preview">[]</span>';
    }
    if (depth >= 2) {
      return `<span class="object-preview">Array(${value.length})</span>`;
    }
    const items = value
      .slice(0, 10)
      .map((v) => formatValue(v, depth + 1))
      .join(', ');
    const more = value.length > 10 ? `, ... ${value.length - 10} more` : '';
    return `<span class="object-preview">[${items}${more}]</span>`;
  }
  if (typeof value === 'object') {
    try {
      const keys = Object.keys(value);
      if (keys.length === 0) {
        return '<span class="object-preview">{}</span>';
      }
      if (depth >= 2) {
        return '<span class="object-preview">{...}</span>';
      }
      const pairs = keys
        .slice(0, 5)
        .map((k) => `${k}: ${formatValue(value[k], depth + 1)}`)
        .join(', ');
      const more = keys.length > 5 ? ', ...' : '';
      return `<span class="object-preview">{${pairs}${more}}</span>`;
    } catch {
      return '<span class="object-preview">[Object]</span>';
    }
  }
  return escapeHtml(String(value));
}
