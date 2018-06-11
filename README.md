# openapi2html

Yet another static html generator for Open API 2.0 / Swagger 2.0. It generates Bootstrap 4 compatible static html from your Swagger API spec. Not all the Swagger features are supported -- if you miss anything, let me know.

[![build status](https://img.shields.io/travis/frankthelen/openapi2html.svg)](http://travis-ci.org/frankthelen/openapi2html)
[![Coverage Status](https://coveralls.io/repos/github/frankthelen/openapi2html/badge.svg?branch=master)](https://coveralls.io/github/frankthelen/openapi2html?branch=master)
[![dependencies Status](https://david-dm.org/frankthelen/openapi2html/status.svg)](https://david-dm.org/frankthelen/openapi2html)
[![Greenkeeper badge](https://badges.greenkeeper.io/frankthelen/openapi2html.svg)](https://greenkeeper.io/)
[![Maintainability](https://api.codeclimate.com/v1/badges/cd10c9d71a7f675c43dc/maintainability)](https://codeclimate.com/github/frankthelen/openapi2html/maintainability)
[![node](https://img.shields.io/node/v/openapi2html.svg)]()
[![code style](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)
[![License Status](http://img.shields.io/npm/l/openapi2html.svg)]()

## Install

```bash
npm install openapi2html
```

## Usage

First, use `swagger-parser` to parse your api from `json` or `yaml`. Then, use `openapi2html` to generate html, e.g.:
```js
const parser = require('swagger-parser');
const openapi2html = require('openapi2html');

...
const api = await parser.parse('my-api.yaml');
const html = openapi2html(api);
```

## Options

`openapi2html` may take a second parameter for options, e.g.:
```js
...
const options = {
  tagColors: {
    pet: 'primary',
    store: 'warning',
    user: 'success'
  },
  show: {
    host: false
  }
};
const html = openapi2html(api, options);
```
There are the following options:
* `tagColors` maps your operations' tags to Bootstrap theme colors `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`. Please do not use `danger` because this is already used for `deprecated`. The default theme color is `secondary`. If you use custom colors, you need to provide the according CSS classes, e.g., `badge-mycolor`. Hex color values are not supported.
* `show` is used for switching on or off certain information. The following is supported: `version` (default `true`), `host` (default `true`), `basePath` (default `true`), `contact` (default `false`), `license` (default `false`), `termsOfService` (default `false`), `schemes` (default `true`), `consumes` (default `true`), `produces` (default `true`)

## Styling

The generated html doesn't provide any styling. It is plain Bootstrap 4 compatible html, i.e.,
it uses `<h1>` through `<h6>`, `<code>`, `<a>`, as well as Bootstrap's Card and Badge components.
In addition, there are classes `o2h-*` attached such as
`o2h-operation-get` to allow some customized styling.

This is what worked for me:
```html
<html>
<head>
  ...
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .card {
      margin-bottom: 1rem;
    }
    .h2, h2 {
      margin-top: 1rem;
    }
    .h4, h4 {
      margin-top: .5rem;
    }
    .card .card-body .h4, .card .card-body h4 {
      border-top: 1px solid #eee;
      margin-top: 1rem;
      padding-top: 1rem;
    }
    .card .card-body .h5, .card .card-body h5 {
      margin-top: 1rem;
    }
    .o2h-description p {
      color: grey;
      margin-bottom: .5rem;
    }
    .card .card-body .o2h-description p {
      margin-bottom: 0;
    }
    .card .card-body .o2h-example pre {
      background-color: #eee;
    }
    .o2h-parameter h5 .badge {
      font-size: small;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- include api html here -->
  </div>
</body>
</html>
```
