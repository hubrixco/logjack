var assert = require('assert');

// import classes
var FileAppenderSettings = require("../appenders/fileAppenderSettings.js"); 
var AppenderSettings = require("../appenders/appenderSettings.js"); 
var JackLogger = require("../jackLogger.js"); 

//var jackLogger = new jackLogger('socket','basic','trace',null).logger;

// test console with json
describe("Logger JSON", function () {
    it("outputs log in JSON at level: trace", function () {
        var jackLogger = new JackLogger('console','json','trace',null).logger;
        jackLogger.info('testing');
        jackLogger.info('this is just a test');
        jackLogger.error('of a custom appender');
        jackLogger.warn('that outputs json');
    });
});



// test stdout with xml
describe("Logger XML", function () {
    it("outputs log in XML at level: warn", function () {
        jackLogger = new JackLogger('stdout','xml','warn',null).logger;
        jackLogger.info('this is just a test');
        jackLogger.error('of a custom appender');
        jackLogger.warn('that outputs xml');
    });
});

// test console with text colored
describe("Logger colored", function () {
    it("outputs log in color at level: trace", function () {
        jackLogger = new JackLogger('console','colored','trace',null).logger;
        jackLogger.info('this is just a test');
        jackLogger.error('of a basic layout');
        jackLogger.warn('that outputs colored');
    });
});

// test file with text
describe("Logger file", function () {
    it("outputs log to file at level: trace", function () {
        var fileAppenderSettings = new FileAppenderSettings("testfile.log",10 * 1024,5,false,true);
        jackLogger = new JackLogger('file','text','trace',fileAppenderSettings).logger;

        jackLogger.info('this is just a test');
        jackLogger.error('of a custom appender');
        jackLogger.warn('that outputs to file');
    });
});

// test file with compression
describe("Logger file", function () {
    it("outputs log to three compressed files at level: trace", function () {
        var fileAppenderSettings = new FileAppenderSettings("testcompressedfile.log",50,3,true,false);
        jackLogger = new JackLogger('file','text','trace',fileAppenderSettings).logger;

        jackLogger.info('this is just a test');
        jackLogger.error('of a custom appender');
        jackLogger.warn('that outputs to a compressed file');
        jackLogger.trace('which should create three compressed files.');
    });
});
