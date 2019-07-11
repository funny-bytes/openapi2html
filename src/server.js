const Hapi = require('@hapi/hapi'); // eslint-disable-line import/no-extraneous-dependencies
const SwaggerParser = require('swagger-parser'); // eslint-disable-line import/no-extraneous-dependencies
const util = require('util');
const fs = require('fs');
const path = require('path');
const openapi2html = require('..');

const readFile = util.promisify(fs.readFile);

const server = new Hapi.Server({
  port: 4000,
});

const parser = new SwaggerParser();

server.route({
  method: 'GET',
  path: '/test',
  handler: async (request, h) => {
    try {
      const uri = 'https://raw.githubusercontent.com/swagger-api/swagger-codegen/master/modules/swagger-codegen/src/test/resources/2_0/petstore.json';
      // const uri = 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/api-with-examples.json';
      // const uri = 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/petstore-with-external-docs.json';
      // const uri = 'https://api.apis.guru/v2/specs/mozilla.com/kinto/1.21/swagger.json';
      // const uri = 'http://localhost:3000/swagger.json';
      const api = await parser.parse(uri, {
        resolve: {
          file: false, // don't resolve local file references
          http: {
            timeout: 5000,
            // headers: {
            //   Authorization: 'Basic dGVzdDpzZWNyZXQ=',
            // },
          },
        },
      });
      const html = openapi2html(api, {
        tagColors: {
          pet: 'primary',
          store: 'warning',
          user: 'success',
        },
        show: {
          // host: false,
          contact: true,
          termsOfService: true,
          license: true,
        },
      });
      const frame = await readFile(path.join(__dirname, 'frame.html'), 'UTF-8');
      const page = frame
        .replace(/\{\{content\}\}/, html)
        .replace(/\{\{title\}\}/, api.info.title);
      return h.response(page).type('text/html').charset('utf-8');
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      throw error;
    }
  },
});

const provision = async () => {
  try {
    await server.start();
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }
};

provision();
