const React = require('react');

function Codes({ codes, labelIfEmpty }) {
  const classname = 'o2h-codes';
  if (!codes) return '';
  if (!codes.length) {
    return labelIfEmpty ? <span className={classname}>{labelIfEmpty}</span> : '';
  }
  return (
    <span className={classname}>
      {
        codes.map((str, i) => <span key={`code-${i}`}>{i ? ', ' : ''}<code>{str}</code></span>)
      }
    </span>
  );
}

module.exports = Codes;
