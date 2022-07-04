const React = require('react');
const SwaggerSchema = require('./SwaggerSchema');

function SwaggerDefinition({ name, schema }) {
  const classname = 'o2h-definition';
  const anchor = `/definitions/${name}`;
  return (
    <div className={classname}>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <a name={anchor}>{name}</a>
          </h3>
        </div>
        <div className="card-body">
          <SwaggerSchema schema={schema} />
        </div>
      </div>
    </div>
  );
}

module.exports = SwaggerDefinition;
