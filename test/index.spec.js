const path = require('path');
const parser = require('swagger-parser');
const openapi2html = require('..');
require('./setupTests');

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

  it('should generate html from petstore expanded', async () => {
    const uri = 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/petstore-expanded.json';
    const api = await parser.parse(uri);
    const html = openapi2html(api);
    expect(html).to.contain('<h1>Swagger Petstore</h1>');
    expect(html).to.contain('Phasellus vel urna viverra');
  });

  it('should generate html from Uber API', async () => {
    const uri = 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/uber.json';
    const api = await parser.parse(uri);
    const html = openapi2html(api);
    expect(html).to.contain('<h1>Uber API</h1>');
    expect(html).to.contain('Longitude component of start location.');
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
});
