const React = require('react');

function Link({ href, label }) {
  const classname = 'o2h-link';
  if (!href) return '';
  let text;
  if (label) {
    text = label;
  } else {
    const match = href.match(/([^#/]+)$/);
    text = match ? match[1] : href;
  }
  return (
    <a color="link" href={href} className={classname}>{text}</a>
  );
}

module.exports = Link;
