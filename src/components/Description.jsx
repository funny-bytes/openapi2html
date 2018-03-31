const React = require('react');
const renderHtml = require('react-render-html');
const md2html = require('markdown-it')({
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />)
  breaks: true, // Convert '\n' in paragraphs into <br>
});

const Description = ({ format = 'gfm', children = '', externalDocs = {} }) => {
  const classname = 'o2h-description';
  const { url, description: text = url } = externalDocs;
  if (!children && !externalDocs) return '';
  const append = (a, b) => (a && b ? `${a} &mdash; ${b}` : (a || b));
  if (format === 'gfm') {
    const gfm = url ? append(children, `[${text}](${url})`) : children;
    return (
      <div className={classname}>
        { renderHtml(md2html.render(gfm)) }
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
