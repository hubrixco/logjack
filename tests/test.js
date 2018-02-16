var assert = require('assert');

// import classes
var FileAppenderSettings = require("./appenders/fileAppenderSettings.js"); 
var AppenderSettings = require("./appenders/appenderSettings.js"); 
var HubrixLogger = require("./hubrixLogger.js"); 

//var hubrixLogger = new HubrixLogger('socket','basic','trace',null).logger;

// test console with json
describe("Logger JSON", function () {
    it("outputs log in JSON at level: trace", function () {
        var hubrixLogger = new HubrixLogger('console','json','trace',null).logger;
        hubrixLogger.info('testing');
        hubrixLogger.info('this is just a test');
        hubrixLogger.error('of a custom appender');
        hubrixLogger.warn('that outputs json');
    });
});



// test stdout with xml
describe("Logger XML", function () {
    it("outputs log in XML at level: warn", function () {
        hubrixLogger = new HubrixLogger('stdout','xml','warn',null).logger;
        hubrixLogger.info('this is just a test');
        hubrixLogger.error('of a custom appender');
        hubrixLogger.warn('that outputs xml');
    });
});

// test console with text colored
describe("Logger colored", function () {
    it("outputs log in color at level: trace", function () {
        hubrixLogger = new HubrixLogger('console','colored','trace',null).logger;
        hubrixLogger.info('this is just a test');
        hubrixLogger.error('of a basic layout');
        hubrixLogger.warn('that outputs colored');
    });
});

// test file with text
describe("Logger file", function () {
    it("outputs log to file at level: trace", function () {
        var fileAppenderSettings = new FileAppenderSettings("testfile.log",10 * 1024,5,false,true);
        hubrixLogger = new HubrixLogger('file','text','trace',fileAppenderSettings).logger;

        hubrixLogger.info('this is just a test');
        hubrixLogger.error('of a custom appender');
        hubrixLogger.warn('that outputs to file');
    });
});

// test file with compression
describe("Logger file", function () {
    it("outputs log to three compressed files at level: trace", function () {
        var fileAppenderSettings = new FileAppenderSettings("testcompressedfile.log",50,3,true,false);
        hubrixLogger = new HubrixLogger('file','text','trace',fileAppenderSettings).logger;

        hubrixLogger.info('this is just a test');
        hubrixLogger.error('of a custom appender');
        hubrixLogger.warn('that outputs to a compressed file');
        hubrixLogger.trace('which should create three compressed files.');
    });
});
