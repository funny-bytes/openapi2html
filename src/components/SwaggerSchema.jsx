const React = require('react');
const Description = require('./Description');
const SwaggerDataType = require('./SwaggerDataType');
const SwaggerParameter = require('./SwaggerParameter');

function SwaggerSchema({ schema }) {
  const classname = 'o2h-schema';
  const {
    description, properties, additionalProperties, allOf, items, required, externalDocs,
  } = schema;
  // array
  if (items) { // && type === 'array'
    schema.type = 'array'; // eslint-disable-line no-param-reassign
    return (
      <div className={classname}>
        <Description format="gfm" externalDocs={externalDocs}>{description}</Description>
        <SwaggerDataType header="Type" {...schema} />
        <SwaggerDataType header="Item type" {...items} />
      </div>
    );
  }
  // object
  if (properties) { // && type === 'object'
    schema.type = 'object'; // eslint-disable-line no-param-reassign
    const props = Object.keys(properties);
    return (
      <div className={classname}>
        <Description format="gfm" externalDocs={externalDocs}>{description}</Description>
        <SwaggerDataType header="Type" {...schema} />
        <h4>Properties</h4>
        <div>{
          props.map((prop, i) => {
            const property = properties[prop];
            property.name = prop;
            property.required = (required || []).includes(prop);
            return <SwaggerParameter key={`prop-${i}`} parameter={property} />;
          })
        }
        </div>
      </div>
    );
  }
  // additionalProperties
  if (additionalProperties) { // && type === 'object'
    schema.type = 'object'; // eslint-disable-line no-param-reassign
    return ''; // TODO: support `additionalProperties` in schema
  }
  // allOf
  if (allOf) {
    return ''; // TODO: support `allOf` in schema
  }
  // else -- including `$ref`
  return (
    <div className={classname}>
      <Description format="gfm" externalDocs={externalDocs}>{description}</Description>
      <SwaggerDataType header="Type" {...schema} />
    </div>
  );
}

module.exports = SwaggerSchema;
