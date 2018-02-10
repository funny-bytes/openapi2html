const React = require('react');
const Badges = require('./Badges');

const Summary = ({ api }) => {
  const classname = 'o2h-summary';
  const endpoints = [];
  Object.entries(api.paths).forEach(([path, operations]) => {
    Object.entries(operations).forEach(([operation, { summary, tags, deprecated }]) => {
      endpoints.push({
        path,
        method: operation.toUpperCase(),
        summary,
        href: `#/operations/${operation}${path}`,
        tags,
        deprecated,
      });
    });
  });
  return (
    <div className={classname}>
      <h2>Summary</h2>
      { endpoints
          .map(({
            path, method, href, summary, tags, deprecated,
          }, i) => (
            <dl key={`summary-${i}`}>
              <dt><a href={href}>{method}{' '}{path}</a></dt>
              { <dd>{summary} <Badges tags={tags} deprecated={deprecated} /></dd> }
            </dl>
          ))
      }
    </div>
  );
};

module.exports = Summary;
