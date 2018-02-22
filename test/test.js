
const assert = require('assert');

const chai = require('chai');  
const expect = require('chai').expect;
 
chai.use(require('chai-http'));
 
const app = require('../restapi/index.js'); // Our app

// import classes
const JackLogger = require("../jackLogger.js"); 

var config = {
    appenders: {
      out: { type: 'console', layout: { type: 'json'} }
    },
    categories: {
      default: { appenders: ['out'], level: 'info' }
    }
  };

  // POST - Log
describe("Logger REST API", function(){
  it('calls /log to output at level: trace', function() {
    return chai.request(app)
      .post('/0.9.0/log?message="Testing!"') //TODO: get version from YAML somehow...
      .send(config)
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});


// test console with json
describe("Logger JSON", function () {
    it("outputs log in JSON at level: trace", function () {
        var jackLogger = new JackLogger(config).logger;
        jackLogger.info('testing');
        jackLogger.info('this is just a test');
        jackLogger.error('of a custom appender');
        jackLogger.warn('that outputs json');
    });
});

// test stdout with xml
config = {
    appenders: {
      out: { type: 'console', layout: { type: 'xml'} }
    },
    categories: {
      default: { appenders: ['out'], level: 'warn' }
    }
  };

describe("Logger XML", function () {
    it("outputs log in XML at level: warn", function () {
        jackLogger = new JackLogger(config).logger;
        jackLogger.info('this is just a test');
        jackLogger.error('of a custom appender');
        jackLogger.warn('that outputs xml');
    });
});

// test console with text colored
config = {
    appenders: {
      out: { type: 'console', layout: { type: 'colored'} }
    },
    categories: {
      default: { appenders: ['out'], level: 'trace' }
    }
  };

describe("Logger colored", function () {
    it("outputs log in color at level: trace", function () {
        jackLogger = new JackLogger(config).logger;
        jackLogger.info('this is just a test');
        jackLogger.error('of a basic layout');
        jackLogger.warn('that outputs colored');
    });
});

// test file with text
config = {
    appenders: {
      out: { type: 'file', filename: 'testfile.log', maxLogSize: 10485760, backups: 1, compress: false }
    },
    categories: {
      default: { appenders: ['out'], level: 'trace' }
    }
  };

describe("Logger file", function () {
    it("outputs log to file at level: trace", function () {
        jackLogger = new JackLogger(config).logger;

        jackLogger.info('this is just a test');
        jackLogger.error('of a custom appender');
        jackLogger.warn('that outputs to file');
    });
});

// test file with compression
config = {
    appenders: {
      out: { type: 'file', filename: 'testcompressedfile.log', maxLogSize: 50, backups: 3, compress: true }
    },
    categories: {
      default: { appenders: ['out'], level: 'trace' }
    }
  };

describe("Logger file", function () {
    it("outputs log to three compressed files at level: trace", function () {
        jackLogger = new JackLogger(config).logger;

        jackLogger.info('this is just a test');
        jackLogger.error('of a custom appender');
        jackLogger.warn('that outputs to a compressed file');
        jackLogger.trace('which should create three compressed files.');
    });
});
