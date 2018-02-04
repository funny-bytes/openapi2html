const path = require('path');
const parser = require('swagger-parser');
const openapi2html = require('..');
require('./setupTests');

describe('openapi2html with petstore example', async () => {
  it('should generate html from petstore.json', async () => {
    const uri = path.join(__dirname, 'petstore.json');
    const api = await parser.parse(uri);
    const html = openapi2html(api);
    expect(html).to.contain('<h1>Swagger Petstore</h1>');
  });
});
