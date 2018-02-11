const React = require('react');
const md2html = require('github-flavored-markdown');
const renderHtml = require('react-render-html');

const Description = ({ format = 'gfm', children = '', externalDocs = {} }) => {
  const classname = 'o2h-description';
  const { url, description: text = url } = externalDocs;
  if (!children && !externalDocs) return '';
  const append = (a, b) => (a && b ? `${a} &mdash; ${b}` : (a || b));
  if (format === 'gfm') {
    const gfm = url ? append(children, `[${text}](${url})`) : children;
    return (
      <div className={classname}>
        { renderHtml(md2html.parse(gfm)) }
      </div>
    );
  }
  if (format === 'html') {
    const html = url ? append(children, `<a href="${url}">${text}</a>`) : children;
    return (
      <div className={classname}>
        { renderHtml(<p>{html}</p>) }
      </div>
    );
  }
  if (format === 'text') {
    // externalDocs not supported here
    return (
      <div className={classname}>
        <p>{children}</p>
      </div>
    );
  }
  return '';
};

module.exports = Description;
