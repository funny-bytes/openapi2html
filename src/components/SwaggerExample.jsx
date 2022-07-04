const React = require('react');
const stringify = require('json-stringify-safe');

function SwaggerExample({ example }) {
  const classname = 'o2h-example';
  return (
    <div>
      {
        Object.entries(example).map(([name, code], i) => {
          const norm = typeof code === 'string' ? code : stringify(code, null, 2);
          return (
            <div className={classname} key={`example-${i}`}>
              <h6>{name}</h6>
              <pre>{norm}</pre>
            </div>
          );
        })
      }
    </div>
  );
}

module.exports = SwaggerExample;
