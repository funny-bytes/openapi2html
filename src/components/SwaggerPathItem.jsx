const React = require('react');
const SwaggerOperation = require('./SwaggerOperation');

function SwaggerPathItem({ path, item }) {
  const classname = 'o2h-path-item';
  const operations = Object.keys(item);
  return (
    <div className={classname}>
      {
        operations
          .filter((op) => op.match(/^(get)|(put)|(post)|(delete)|(options)|(head)|(patch)|$/))
          .map((op, i) => <SwaggerOperation key={`operation-${i}`} path={path} operation={op} details={item[op]} />)
      }
    </div>
  );
}

module.exports = SwaggerPathItem;
