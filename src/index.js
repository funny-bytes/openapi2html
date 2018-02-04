const ReactDomServer = require('react-dom/server');
const Api = require('./components/Api');

const openapi2html = api => ReactDomServer.renderToStaticMarkup(Api({ api }));

module.exports = openapi2html;
