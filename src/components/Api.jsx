const React = require('react');
const Codes = require('./Codes');
const Description = require('./Description');
const Summary = require('./Summary');
const SwaggerPaths = require('./SwaggerPaths');
const SwaggerDefinitions = require('./SwaggerDefinitions');
const SwaggerSecurityDefinitions = require('./SwaggerSecurityDefinitions');
const SwaggerSecurityRequirement = require('./SwaggerSecurityRequirement');
const ThemeProvider = require('./ThemeProvider');

const Api = ({ api, options = {} }) => {
  const classname = 'o2h-api';
  if (api.swagger !== '2.0') {
    throw new Error(`unsupported swagger version: ${api.swagger}`);
  }
  const {
    info, host, basePath, schemes, consumes, produces,
    paths = {}, definitions = {},
    securityDefinitions, security,
  } = api;
  const { title, description, version } = info;
  const { tagColors = {} } = options;
  return (
    <ThemeProvider tagColors={tagColors}>
      <div className={classname}>
        <h1>{title}</h1>
        <Description format="gfm">{description}</Description>
        <div className="o2h-info">
          <div className="o2h-info-version">Version <code>{version}</code></div>
          <div className="o2h-info-host">Host <code>{host}</code></div>
          <div className="o2h-info-basepath">Base path <code>{basePath}</code></div>
        </div>
        { schemes &&
          <div className="o2h-schemes">Schemes <Codes codes={schemes} /></div> }
        { consumes &&
          <div className="o2h-consumes">Consumes <Codes codes={consumes} /></div> }
        { produces &&
          <div className="o2h-produces">Produces <Codes codes={produces} /></div> }
        <Summary api={api} />
        <SwaggerSecurityDefinitions securityDefinitions={securityDefinitions} />
        <SwaggerSecurityRequirement security={security} />
        <SwaggerPaths paths={paths} />
        <SwaggerDefinitions definitions={definitions} />
      </div>
    </ThemeProvider>
  );
};

module.exports = Api;
