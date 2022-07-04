const React = require('react');
const SwaggerResponse = require('./SwaggerResponse');

function SwaggerResponses({ responses }) {
  const classname = 'o2h-responses';
  if (!responses) return '';
  const statusCodes = Object.keys(responses);
  if (!statusCodes.length) return '';
  return (
    <div className={classname}>
      <h4>Responses</h4>
      {
        statusCodes
          .map((status, i) => <SwaggerResponse key={`response-${i}`} status={status} response={responses[status]} />)
      }
    </div>
  );
}

module.exports = SwaggerResponses;
