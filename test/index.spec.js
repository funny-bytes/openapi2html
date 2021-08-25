const path = require('path');
const parser = require('swagger-parser');
const request = require('request-promise');
const { encode } = require('html-entities');
const openapi2html = require('../src');
require('./setupTests');

/* eslint-disable prefer-arrow-callback, func-names */

describe('openapi2html', () => {
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
    const uri = 'https://api.apis.guru/v2/specs/yunbi.com/v2/swagger.yaml';
    const api = await parser.parse(uri);
    const html = openapi2html(api);
    expect(html).to.contain('<h1>Yunbi</h1>');
    expect(html).to.contain('<h2>Summary</h2>');
  });

  const apis = [
    'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v2.0/json/petstore-expanded.json',
    'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/uber.json',
    'https://api.apis.guru/v2/specs/yunbi.com/v2/swagger.json',
    'https://api.apis.guru/v2/specs/akeneo.com/1.0.0/swagger.json',
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

describe('Test against APIs from apis.guru', function () {
  const guruApis = [];

  function getRandom(arr, l) {
    let n = l;
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len) throw new RangeError('getRandom: more elements taken than available');
    // eslint-disable-next-line no-plusplus
    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      // eslint-disable-next-line no-plusplus
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  it('should work', async function () {
    const list = await request({
      uri: 'https://api.apis.guru/v2/list.json',
      json: true,
    });
    Object.entries(list).forEach(([name, spec]) => {
      const { preferred, versions } = spec;
      const { swaggerUrl, info } = versions[preferred];
      const { title } = info;
      if (swaggerUrl.indexOf('swagger.json') > 0) {
        guruApis.push({ name, title, swaggerUrl });
      }
    });

    const randomGuruApis = getRandom(guruApis, 20);

    await Promise.all(randomGuruApis
      .map(async ({ title, swaggerUrl }) => {
        const api = await parser.parse(swaggerUrl);
        const html = openapi2html(api);
        const titleEscaped = encode(title);
        expect(html).to.contain(`<h1>${titleEscaped}</h1>`);
        expect(html).to.contain('<h2>Summary</h2>');
        console.log('worked for', titleEscaped);
      }));
  });
});
