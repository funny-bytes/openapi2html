const React = require('react');
const Codes = require('./Codes');
const Description = require('./Description');
const Summary = require('./Summary');
const SwaggerPaths = require('./SwaggerPaths');
const SwaggerDefinitions = require('./SwaggerDefinitions');
const SwaggerSecurityDefinitions = require('./SwaggerSecurityDefinitions');
const SwaggerSecurityRequirement = require('./SwaggerSecurityRequirement');
const ThemeContext = require('./ThemeContext');

const Api = ({ api, options = {} }) => {
  const classname = 'o2h-api';
  if (api.swagger !== '2.0') {
    throw new Error(`unsupported swagger version: ${api.swagger}`);
  }
  const {
    info = {}, host, basePath, schemes, consumes, produces,
    paths = {}, definitions = {},
    securityDefinitions, security,
    externalDocs,
  } = api;
  const {
    title, description, version, contact, termsOfService, license,
  } = info;
  const { tagColors: tagColorsGiven = {}, show = {} } = options;
  const tagColors = Object.assign({
    deprecated: 'danger',
    fallback: 'secondary',
  }, tagColorsGiven);
  const theme = { tagColors };

  const infoblock = [{
    show: show.version !== false,
    label: 'Version',
    value: version ? <code>{version}</code> : undefined,
  }, {
    show: show.host !== false,
    label: 'Host',
    value: host ? <code>{host}</code> : undefined,
  }, {
    show: show.basePath !== false,
    label: 'Base path',
    value: basePath ? <code>{basePath}</code> : undefined,
  }, {
    show: !!show.contact,
    label: 'Contact',
    value: contact
      ? [contact.name, contact.url, contact.email].filter(item => item).join(', ')
      : undefined,
  }, {
    show: !!show.license,
    label: 'License',
    value: license
      ? [license.name, license.url].filter(item => item).join(', ')
      : undefined,
  }, {
    show: !!show.termsOfService,
    label: 'Terms of Service',
    value: termsOfService,
  }, {
    show: show.schemes !== false,
    label: 'Schemes',
    value: schemes ? <Codes codes={schemes} /> : undefined,
  }, {
    show: show.consumes !== false,
    label: 'Consumes',
    value: consumes ? <Codes codes={consumes} /> : undefined,
  }, {
    show: show.produces !== false,
    label: 'Produces',
    value: produces ? <Codes codes={produces} /> : undefined,
  }];

  const infoblockContent = infoblock
    .filter(item => item.show && item.value)
    .reduce((acc, item) => [...acc, item.label, item.value], []);

  return (
    <ThemeContext.Provider value={theme}>
      <div className={classname}>
        <h1>{title}</h1>
        <Description format="gfm" externalDocs={externalDocs}>{description}</Description>
        <dl className="o2h-info row">
          { infoblockContent.map((item, i) => (i % 2 === 0
            ? <dt className="col-sm-2" key={i}>{item}</dt>
            : <dd className="col-sm-10" key={i}>{item}</dd>
          ))}
        </dl>
        <Summary api={api} />
        <SwaggerSecurityDefinitions securityDefinitions={securityDefinitions} />
        <SwaggerSecurityRequirement security={security} />
        <SwaggerPaths paths={paths} />
        <SwaggerDefinitions definitions={definitions} />
      </div>
    </ThemeContext.Provider>
  );
};

module.exports = Api;
