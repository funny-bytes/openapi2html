const { renderToStaticMarkup } = require('react-dom/server');
// eslint-disable-next-line import/no-unresolved,import/extensions
const Api = require('./components/Api');

const openapi2html = (api, options) => renderToStaticMarkup(Api({ api, options }));

module.exports = openapi2html;
