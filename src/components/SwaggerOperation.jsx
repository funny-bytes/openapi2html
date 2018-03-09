const React = require('react');
const SwaggerParameters = require('./SwaggerParameters');
const SwaggerResponses = require('./SwaggerResponses');
const SwaggerSecurityRequirement = require('./SwaggerSecurityRequirement');
const Description = require('./Description');
const Codes = require('./Codes');
const Badges = require('./Badges');

const SwaggerOperation = ({ operation, path, details }) => {
  const classname = `o2h-operation o2h-operation-${operation}`;
  const anchor = `/operations/${operation}${path}`;
  const method = operation.toUpperCase();
  const {
    summary, description, schemes, consumes, produces,
    parameters, responses, security, tags, deprecated, externalDocs,
  } = details;
  return (
    <div className={classname}>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <a name={anchor}>
              {method}{' '}{path}{' '}
            </a>
          </h3>
          <h6 className="card-subtitle">
            {summary} <Badges tags={tags} deprecated={deprecated} />
          </h6>
        </div>
        <div className="card-body">
          <Description format="gfm" externalDocs={externalDocs}>{description}</Description>
          { schemes &&
            <div className="o2h-schemes">Schemes <Codes codes={schemes} /></div> }
          { consumes &&
            <div className="o2h-consumes">Consumes <Codes codes={consumes} valueIfEmpty="none" /></div> }
          { produces &&
            <div className="o2h-produces">Produces <Codes codes={produces} valueIfEmpty="none" /></div> }
          <SwaggerParameters parameters={parameters} />
          <SwaggerResponses responses={responses} />
          <SwaggerSecurityRequirement security={security} format="operation" />
        </div>
      </div>
    </div>
  );
};

module.exports = SwaggerOperation;
