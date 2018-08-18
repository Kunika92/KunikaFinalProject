const dust = require('dustjs-linkedin');
const hapi = require('hapi');
const inert = require('inert');
const lout = require('lout');
const vision = require('vision');

const courseOptions = require('./course.json');
const libApi = require('./src/api-teacher');
const libSlides = require('./src/slides');
const utils = require('./src/js/utils');

const port = courseOptions.port || 8080;

let libStudentApi;
try {
  libStudentApi = require('./src/api-student'); // eslint-disable-line global-require, import/no-unresolved
} catch (e) {
  if (e instanceof Error && e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
}

dust.config.whitespace = true;

const plugins = [
  inert,
  vision,
  { plugin: libApi },
  { plugin: libSlides, routes: { prefix: '/slides' } },
  lout,
];

if (libStudentApi) {
  plugins.push({ plugin: libStudentApi });
}

async function startServer() {
  const server = hapi.Server({ port });

  await server.register(plugins);

  server.views({
    engines: {
      dust: {
        compileMode: 'async',
        module: {
          compile: (template, compileOptions, callback) => {
            const compiled = dust.compileFn(template, compileOptions && compileOptions.name);

            callback(null, (context, options, cb) => {
              compiled(context, cb);
            });
          },
          registerPartial: (name, data) => {
            dust.compileFn(data, name);
          },
          registerHelper: (name, helper) => {
            if (helper.length > 1) {
              dust.helpers[name] = helper;
            } else {
              dust.filters[name] = helper;
            }
          },
        },
      },
    },
    relativeTo: __dirname,
    path: 'src/views',
    partialsPath: 'src/views',
    layoutPath: 'src/views',
  });

  // Register route for static assets
  server.route({
    method: 'GET',
    path: '/{path*}',
    options: {
      description: 'Serve static content',
      tags: ['starter'],
    },
    handler: {
      directory: {
        path: 'public',
        listing: true,
        index: false,
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('home'),
    options: { tags: ['starter'] },
  });

  try {
    await server.start();
    utils.print('Server running at:', server.info.uri);
  } catch (error) {
    utils.print(error);
  }
}

startServer();
