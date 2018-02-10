const React = require('react');
const {
  Card, CardHeader, CardBody, CardTitle, CardSubtitle,
} = require('reactstrap');
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
    parameters, responses, security, tags, deprecated,
  } = details;
  return (
    <div className={classname}>
      <Card>
        <CardHeader>
          <CardTitle tag="h3">
            <a name={anchor}>
              {method}{' '}{path}{' '}
            </a>
          </CardTitle>
          <CardSubtitle>{summary} <Badges tags={tags} deprecated={deprecated} /></CardSubtitle>
        </CardHeader>
        <CardBody>
          { description && <Description format="gfm">{description}</Description> }
          { schemes &&
            <div className="o2h-schemes">Schemes <Codes codes={schemes} /></div> }
          { consumes &&
            <div className="o2h-consumes">Consumes <Codes codes={consumes} valueIfEmpty="none" /></div> }
          { produces &&
            <div className="o2h-produces">Produces <Codes codes={produces} valueIfEmpty="none" /></div> }
          <SwaggerParameters parameters={parameters} />
          <SwaggerResponses responses={responses} />
          <SwaggerSecurityRequirement security={security} format="operation" />
        </CardBody>
      </Card>
    </div>
  );
};

module.exports = SwaggerOperation;
