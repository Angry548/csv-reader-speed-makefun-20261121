// Independent implementation of the published csv-reader contract.
export function run(input) {
  const text = String(input.text), header = input.header === true;
  const rows = [], errors = [];
  let columns = null, width = -1, i = text.charCodeAt(0) === 0xfeff ? 1 : 0, line = 1;
  const n = text.length;
  while (i < n) {
    while (i < n && (text.charCodeAt(i) === 10 || (text.charCodeAt(i) === 13 && text.charCodeAt(i + 1) === 10))) {
      if (text.charCodeAt(i) === 13) i++;
      i++; line++;
    }
    if (i >= n) break;
    const recordLine = line, row = header && columns === null ? null : rows.length;
    const fields = [];
    let more = true, lastQuoted = false;
    const error = code => errors.push({code, line: recordLine, row});
    while (more) {
      let value = '', quoted = text.charCodeAt(i) === 34;
      lastQuoted = quoted;
      let junk = false;
      if (quoted) {
        const open = i, initialLine = line;
        let start = ++i, parts = null, closed = false;
        while (i < n) {
          const c = text.charCodeAt(i);
          if (c === 34) {
            if (text.charCodeAt(i + 1) === 34) { (parts ??= []).push(text.slice(start, i), '"'); i += 2; start = i; continue; }
            value = parts === null ? text.slice(start, i) : (parts.push(text.slice(start, i)), parts.join(''));
            i++; closed = true; break;
          }
          if (c === 13) {
            (parts ??= []).push(text.slice(start, i), '\n');
            i += text.charCodeAt(i + 1) === 10 ? 2 : 1; start = i; line++; continue;
          }
          if (c === 10) line++;
          i++;
        }
        if (closed) { junk = true; }
        else { i = open + 1; line = initialLine; value = '"'; error('unterminated_quote'); }
      }
      let start = i, added = 0;
      while (i < n) {
        const c = text.charCodeAt(i);
        if (c === 44 || c === 10 || (c === 13 && text.charCodeAt(i + 1) === 10)) break;
        if (c === 13) {
          value += text.slice(start, i); added += i - start;
          error('stray_cr'); i++; start = i;
        } else i++;
      }
      value += text.slice(start, i); added += i - start;
      if (junk && added > 0) error('quote_junk');
      fields.push(value);
      if (i >= n) more = false;
      else if (text.charCodeAt(i) === 44) { i++; }
      else { if (text.charCodeAt(i) === 13) i++; i++; line++; more = false; }
    }
    if (fields.length === 1 && fields[0] === '' && !lastQuoted) continue;
    if (width < 0) width = fields.length;
    if (header && columns === null) { columns = fields; continue; }
    if (fields.length < width) {
      errors.push({code:'short_row', line:recordLine, row, fields:fields.length});
      while (fields.length < width) fields.push('');
    } else if (fields.length > width) {
      errors.push({code:'long_row', line:recordLine, row, extra:fields.splice(width)});
    }
    rows.push(fields);
  }
  return {columns: header ? (columns ?? []) : null, rows, errors};
}
