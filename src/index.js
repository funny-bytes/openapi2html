const ReactDomServer = require('react-dom/server');
const Api = require('./components/Api');

const openapi2html = (api, options) => ReactDomServer.renderToStaticMarkup(Api({ api, options }));

module.exports = openapi2html;
