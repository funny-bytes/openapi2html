const React = require('react');
const Description = require('./Description');
const SwaggerSchema = require('./SwaggerSchema');
const SwaggerExample = require('./SwaggerExample');

function SwaggerResponse({ status, response }) {
  const classname = 'o2h-response';
  const { description, schema, examples } = response;
  return (
    <div className={classname}>
      <h5>{status}</h5>
      { description && <Description format="gfm">{description}</Description> }
      { schema && <SwaggerSchema schema={schema} /> }
      { examples && <SwaggerExample example={examples} /> }
    </div>
  );
}

module.exports = SwaggerResponse;
