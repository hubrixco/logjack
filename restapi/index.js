'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');

var serverPort = 3001;
var serverHost = '0.0.0.0';

const TESTENV = process.env.TEST || false;
if(TESTENV)
  serverHost = 'localhost';

// swaggerRouter configuration
var options = {
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  //app.use(errorHandler);

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Start the server
  http.createServer(app).listen(serverPort, serverHost, function () {
    console.log('Your server is listening on: ' + serverHost + ":" + serverPort);
  });

});

module.exports = app;
