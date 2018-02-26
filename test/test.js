
const assert = require('assert');

const chai = require('chai');  
const expect = require('chai').expect;
 
chai.use(require('chai-http'));
 
const app = require('../restapi/index.js'); // Our app

// import classes
const JackLogger = require("../jackLogger.js"); 


// POST - Log happy path
describe("Logger REST API", function(){
  it('calls /log to output at level: trace', function() {
    let config = {
      appenders: {
        out: { type: 'console', layout: { type: 'json'} }
      },
      categories: {
        default: { appenders: ['out'], level: 'info' }
      }
    };

    return chai.request(app)
      .post('/0.9.0/log?message="Testing!"') //TODO: get version from YAML somehow...
      .send(config)
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});


// POST - Log Exception Path with invalid JSON
describe("Logger REST API Invalid Input", function(){
  it('calls /log with no appender', function() {
    let config = {
      appenders: {
        out: { type: 'console', layout: { type: 'json'} }
      }
    };

    return chai.request(app)
      .post('/0.9.0/log?message="Testing!"') //TODO: get version from YAML somehow...
      .send(config)
      .then(function(res) {
        expect(res).to.have.status(400);
      })
      .catch(function (err) {
        expect(err).to.have.status(400);
     })
  });
});


// POST - Log Exception Path with no message param
describe("Logger REST API Invalid Input", function(){
  it('calls /log with no message', function() {
    let config = {
      appenders: {
        out: { type: 'console', layout: { type: 'json'} }
      },
      categories: {
        default: { appenders: ['out'], level: 'info' }
      }
    };

    return chai.request(app)
      .post('/0.9.0/log') 
      .send(config)
      .then(function(res) {
        expect(res).to.have.status(400);
      })
      .catch(function (err) {
        expect(err).to.have.status(400);
     })
  });
});

// test console with json
describe("Logger JSON", function () {
    it("outputs log in JSON at level: trace", function () {
      let config = {
        appenders: {
          out: { type: 'console', layout: { type: 'json'} }
        },
        categories: {
          default: { appenders: ['out'], level: 'info' }
        }
      };

      var jackLogger = new JackLogger(config).logger;
      jackLogger.info('testing');
      jackLogger.info('this is just a test');
      jackLogger.error('of a custom appender');
      jackLogger.warn('that outputs json');
    });
});

describe("Logger XML", function () {
    it("outputs log in XML at level: warn", function () {
      let config = {
        appenders: {
          out: { type: 'console', layout: { type: 'xml'} }
        },
        categories: {
          default: { appenders: ['out'], level: 'warn' }
        }
      };

      jackLogger = new JackLogger(config).logger;
      jackLogger.info('this is just a test');
      jackLogger.error('of a custom appender');
      jackLogger.warn('that outputs xml');
    });
});

describe("Logger colored", function () {
    it("outputs log in color at level: trace", function () {
      let config = {
        appenders: {
          out: { type: 'console', layout: { type: 'colored'} }
        },
        categories: {
          default: { appenders: ['out'], level: 'trace' }
        }
      };

      jackLogger = new JackLogger(config).logger;
      jackLogger.info('this is just a test');
      jackLogger.error('of a basic layout');
      jackLogger.warn('that outputs colored');
    });
});

describe("Logger file", function () {
    it("outputs log to file at level: error", function () {
      config = {
        appenders: {
          out: { type: 'file', filename: 'testfile.log', maxLogSize: 10485760, backups: 1, compress: false }
        },
        categories: {
          default: { appenders: ['out'], level: 'error' }
        }
      };

      jackLogger = new JackLogger(config).logger;

      jackLogger.info('this is just a test.');
      jackLogger.error('this is the only line that should show.');
      jackLogger.warn('that outputs to file.');
    });
});

describe("Logger file", function () {
    it("outputs log to three compressed files at level: trace", function () {
      let config = {
        appenders: {
          out: { type: 'file', filename: 'testcompressedfile.log', maxLogSize: 50, backups: 3, compress: true }
        },
        categories: {
          default: { appenders: ['out'], level: 'trace' }
        }
      };

      jackLogger = new JackLogger(config).logger;

      jackLogger.info('this is just a test');
      jackLogger.error('of a custom appender');
      jackLogger.warn('that outputs to a compressed file');
      jackLogger.trace('which should create three compressed files.');
    });
});
