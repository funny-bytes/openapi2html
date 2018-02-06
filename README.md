# openapi2html

Yet another static html generator for Open API 2.0 / Swagger 2.0. It generates Bootstrap 4 compatible static html from your Swagger API spec. Not all the Swagger features are supported -- if you miss anything, let me know.

[![build status](https://img.shields.io/travis/frankthelen/openapi2html.svg)](http://travis-ci.org/frankthelen/openapi2html)
[![Coverage Status](https://coveralls.io/repos/github/frankthelen/openapi2html/badge.svg?branch=master)](https://coveralls.io/github/frankthelen/openapi2html?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/frankthelen/openapi2html.svg)](https://gemnasium.com/github.com/frankthelen/openapi2html)
[![Greenkeeper badge](https://badges.greenkeeper.io/frankthelen/openapi2html.svg)](https://greenkeeper.io/)
[![Maintainability](https://api.codeclimate.com/v1/badges/f71c0020a54eefa732ef/maintainability)](https://codeclimate.com/github/frankthelen/openapi2html/maintainability)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ffrankthelen%2Fopenapi2html.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ffrankthelen%2Fopenapi2html?ref=badge_shield)
[![node](https://img.shields.io/node/v/openapi2html.svg)]()
[![code style](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)
[![License Status](http://img.shields.io/npm/l/openapi2html.svg)]()

## Install

```bash
npm install --save openapi2html
```

## Usage

```js
const parser = require('swagger-parser');
const openapi2html = require('openapi2html');

...
const api = await parser.parse('my-api.yaml');
const html = openapi2html(api);
```

## Styling

The generated html doesn't provide any styling. It is plain Bootstrap 4 compatible html, i.e.,
it uses `<h1>` through `<h6>`, `<code>`, `<a>`, as well as Bootstrap's Card and Badge components.
In addition, there are classes `o2h-*` attached such as
`o2h-data-type` to allow some customized styling.

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
    }
    .card .card-body .o2h-description p {
      margin-bottom: 0;
    }
    .card .card-body .o2h-example pre {
      background-color: #eee;
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
