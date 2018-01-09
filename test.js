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
describe("Logger colored text", function () {
    it("outputs log in XML at level: warn", function () {
        hubrixLogger = new HubrixLogger('console','colored','trace',null).logger;
        hubrixLogger.info('this is just a test');
        hubrixLogger.error('of a basic layout');
        hubrixLogger.warn('that outputs colored');
    });
});

// test file with text
describe("Logger output to file", function () {
    it("outputs log in XML at level: warn", function () {
        var fileAppenderSettings = new FileAppenderSettings("test.log",10 * 1024,5,false,true);
        //fileAppenderSettings.fileName = "new.log";

        //hubrixLogger = logger.getLogger('file','text','trace',fileAppenderSettings);
        hubrixLogger = new HubrixLogger('file','text','trace',fileAppenderSettings).logger;

        hubrixLogger.info('this is just a test');
        hubrixLogger.error('of a custom appender');
        hubrixLogger.warn('that outputs to file');
    });
});
