const path = require('path');
const parser = require('swagger-parser');
const request = require('request-promise');
const { Test } = require('mocha');
const { XmlEntities } = require('html-entities');
const openapi2html = require('..');
require('./setupTests');

/* eslint-disable prefer-arrow-callback, func-names */

describe('openapi2html', async () => {
  it('should generate html from petstore', async () => {
    const uri = path.join(__dirname, 'petstore.json');
    const api = await parser.parse(uri);
    const html = openapi2html(api);
    expect(html).to.contain('<h1>Swagger Petstore</h1>');
    expect(html).to.contain('<h4>api_key (header)</h4>');
    expect(html).to.contain('<h4>petstore_auth</h4>');
    expect(html).to.contain('<h2>Paths</h2>');
    expect(html).to.contain('<h3 class="card-title"><a name="/operations/post/pet">POST /pet </a></h3>');
    expect(html).to.contain('<h2>Schema definitions</h2>');
    expect(html).to.contain('<h3 class="card-title"><a name="/definitions/User">User</a></h3>');
  });

  it('should generate html with examples', async () => {
    const uri = 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/api-with-examples.json';
    const api = await parser.parse(uri);
    const html = openapi2html(api);
    expect(html).to.contain('<h1>Simple API overview</h1>');
    expect(html).to.contain('<h6>application/json</h6>');
    expect(html).to.contain('<pre>{');
    expect(html).to.contain('}</pre>');
    expect(html).to.contain('&quot;status&quot;: &quot;EXPERIMENTAL&quot;,');
  });

  it('should generate html with external docs', async () => {
    const uri = 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/petstore-with-external-docs.json';
    const api = await parser.parse(uri);
    const html = openapi2html(api);
    expect(html).to.contain('<h1>Swagger Petstore</h1>');
    expect(html).to.contain('<a href="https://swagger.io/about">find more info here</a>');
  });

  it('should throw error if unsupported Swagger version', async () => {
    const uri = path.join(__dirname, 'petstore.json');
    const api = await parser.parse(uri);
    api.swagger = '2.1';
    expect(() => openapi2html(api)).to.throw('unsupported swagger version: 2.1');
  });

  it('should accept yaml format via `swagger-parser`', async () => {
    const uri = 'https://api.apis.guru/v2/specs/adobe.com/aem/1.3.0/swagger.yaml';
    const api = await parser.parse(uri);
    const html = openapi2html(api);
    expect(html).to.contain('<h1>Adobe Experience Manager (AEM)</h1>');
    expect(html).to.contain('<h2>Summary</h2>');
  });

  const apis = [
    'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/petstore-expanded.json',
    'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/uber.json',
    'https://api.apis.guru/v2/specs/adobe.com/aem/1.3.0/swagger.json',
    'https://api.apis.guru/v2/specs/amazonaws.com/ecs/2014-11-13/swagger.json',
  ];

  apis.forEach((uri) => {
    it(`should render: ${uri}`, async () => {
      const api = await parser.parse(uri);
      const { title } = api.info;
      const html = openapi2html(api);
      expect(html).to.contain(`<h1>${title}</h1>`);
    });
  });
});

describe('Test against APIs from apis.guru', async function () {
  const names = [
    'amazonaws.com:ec2',
    'amazonaws.com:s3',
    'amazonaws.com:email',
    'amazonaws.com:lambda',
    'azure.com:apimanagement',
    'azure.com:cognitiveservices-ContentModerator',
    'azure.com:compute',
    'azure.com:domainservices',
    'azure.com:monitor-activityLogs_API',
    'azure.com:monitor-tenantActivityLogs_API',
    'azure.com:mysql',
    'azure.com:redis',
    'azure.com:web-service',
    'bbc.com',
    'beezup.com',
    'betfair.com',
    'bitbucket.org',
    'box.com:content',
    'callfire.com',
    'circleci.com',
    'cisco.com',
    'clarify.io',
    'clever.com',
    'deutschebahn.com:fahrplan',
    'data.gov',
    'docker.com:engine',
    'dropx.io',
    'flickr.com',
    'gettyimages.com',
    'github.com',
    'gitlab.com',
    'googleapis.com:admin',
    'googleapis.com:analytics',
    'googleapis.com:androidmanagement',
    'googleapis.com:compute',
    'googleapis.com:firebaseremoteconfig',
    'googleapis.com:genomics',
    'magento.com',
    'nytimes.com:archive',
    'kubernetes.io',
    'mozilla.com:kinto',
    'slack.com',
    'stackexchange.com',
    'trello.com',
    'twitter.com',
    'uebermaps.com',
    'wikimedia.org',
    'weatherbit.io',
    'zalando.com',
    'zoom.us',
    'zuora.com',
  ];

  const guruApis = [];

  const suite = this;

  before(async function () {
    this.timeout(10000);
    const list = await request({
      uri: 'https://api.apis.guru/v2/list.json',
      json: true,
    });
    Object.entries(list).forEach(([name, spec]) => {
      const { preferred, versions } = spec;
      const { swaggerUrl, info } = versions[preferred];
      const { title } = info;
      guruApis.push({ name, title, swaggerUrl });
    });
    guruApis
      .filter(({ name }) => names.includes(name))
      .forEach(({ name, title, swaggerUrl }) => {
        suite.addTest(new Test(`should render: ${name}`, async function () {
          this.timeout(10000);
          const api = await parser.parse(swaggerUrl);
          const html = openapi2html(api);
          const titleEscaped = XmlEntities.encode(title);
          expect(html).to.contain(`<h1>${titleEscaped}</h1>`);
          expect(html).to.contain('<h2>Summary</h2>');
        }));
      });
  });

  it('let before run to create tests dynamically');
});
