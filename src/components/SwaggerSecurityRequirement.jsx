const React = require('react');
const Codes = require('./Codes');
const Description = require('./Description');

function SwaggerSecurityRequirement({ security, format = 'api' }) {
  const classname = 'o2h-security-requirement';
  if (!security) return '';
  return (
    <div className={classname}>
      { format === 'api' && (
        <div>
          <h2>Security</h2>
          <Description format="text">
            The security schemes applied for the API as a whole.
            If there are multiple schemes declared, they can be used alternatively
            (that is, there is a logical OR between the security requirements).
            Individual operations can override this definition.
          </Description>
        </div>
      )}
      { format === 'operation' && (
        <div>
          <h4>Security</h4>
          <Description format="text">
            The security schemes applied for this operation.
            If there are multiple schemes declared, they can be used alternatively
            (that is, there is a logical OR between the security requirements).
          </Description>
          { security.length === 0 && <div>No security required.</div> }
        </div>
      )}
      { security.map((scheme) => Object.entries(scheme).map(([name, scopes = []], i) => (
        <div key={`scheme-${i}`}>
          <code>{name}</code>
          { scopes.length > 0 && (
            <span> with scopes <Codes codes={scopes} /></span>
          )}
        </div>
      ))) }
    </div>
  );
}

module.exports = SwaggerSecurityRequirement;
