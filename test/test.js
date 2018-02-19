var assert = require('assert');

// import classes
var JackLogger = require("../jackLogger.js"); 

var config = {
    appenders: {
      out: { type: 'console', layout: { type: 'json'} }
    },
    categories: {
      default: { appenders: ['out'], level: 'info' }
    }
  };

//var jackLogger = new jackLogger('socket','basic','trace',null).logger;

// test console with json
describe("Logger JSON", function () {
    it("outputs log in JSON at level: trace", function () {
        //var jackLogger = new JackLogger('console','json','trace',null).logger;
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
      out: { type: 'file', filename: 'testfile.log', maxLogSize: 10485760, backups: 5, compress: false }
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
