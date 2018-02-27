
const assert = require('assert');
const fs = require('fs');

const chai = require('chai');  
const expect = require('chai').expect;
chai.use(require('chai-http'));

process.env.TEST = true;

const app = require('../restapi/index.js'); // Our app

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
      .post('/v1.0.0/log?message="Testing!"') //TODO: get version from YAML somehow...
      .send(config)
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});

// POST - Log Exception Path with invalid JSON
describe("Logger REST API Invalid Input: JSON", function(){
  it('calls /log with no appender', function() {
    let config = {
      appenders: {
        out: { type: 'console', layout: { type: 'json'} }
      }
    };

    return chai.request(app)
      .post('/v1.0.0/log?message="Testing!"') //TODO: get version from YAML somehow...
      .send(config)
      .then(function(res) {
        expect(res).to.have.status(500);
      })
      .catch(function (err) {
        expect(err).to.have.status(500);
      })
  });
});

// POST - Log Exception Path with no message param
describe("Logger REST API Invalid Inpput: no message", function(){
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
      .post('/v1.0.0/log') 
      .send(config)
      .then(function(res) {
        expect(res).to.have.status(200);
      })
  });
});

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
      jackLogger.warn('that outputs colored text');
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
    after(function() {
      removeFile('testfile.log');
    });
  
});

describe("Logger file compressed", function () {
    it("outputs log a compressed file at level: trace", function () {
      let config = {
        appenders: {
          out: { type: 'file', filename: 'testcompressedfile.log', maxLogSize: 50, backups: 2, compress: true }
        },
        categories: {
          default: { appenders: ['out'], level: 'trace' }
        }
      };

      jackLogger = new JackLogger(config).logger;

      jackLogger.info('this is just a test');
      jackLogger.error('of a custom appender');
      jackLogger.warn('that outputs to a compressed file');
      jackLogger.trace('which should only create one compressed file.');
      jackLogger.info('this is just a test');
      jackLogger.error('of a custom appender');
      jackLogger.warn('that outputs to a compressed file');
      jackLogger.trace('which should only create one compressed file.');
      jackLogger.info('this is just a test');
      jackLogger.error('of a custom appender');
      jackLogger.warn('that outputs to a compressed file');
      jackLogger.trace('which should only create one compressed file.');

    });
    after(function() {
      removeFile('testcompressedfile.log');
    });
});

// cleanup
function removeFile(filename){
  fs.unlink(filename, function (err) {
    if (err) throw err;
    //console.log('File deleted!');
  });
}