require('../jackLogger');

// POST
exports.configuration_globals = function(req, res) {
    HubrixLogger.configure_global({}, function(err, config) {
        // use the log4js config JSON to set global defaults
    });
};

// POST
exports.configurations = function(req, res) {
    let config = {
        appenders: {
          file: { type: 'file', filename: 'cheese.log' },
          console: { type: 'console' }
        },
        categories: {
          file: { appenders: ['file'], level: 'error' },
          default: { appenders: ['console', 'file'], level: 'trace' }
        }
    };

    //const reqConfig = req.getBlah();
    HubrixLogger.configure({}, function(err, config) {
        // use the log4js config JSON to create logger instance
    });
};

// POST
exports.log = function(req, res) {
    HubrixLogger.log({}, function(err, config) {
        // do it
    });
};

// POST
exports.current_level = function(req, res) {

};

// GET
exports.current_level = function(req, res) {

};

// POST
exports.levels = function(req, res) {

};

// GET
exports.levels = function(req, res) {

};

// PUT (Update the color/granularity of level)
exports.levels = function(req, res) {

};

// DELETE
exports.levels = function(req, res) {

};

// MERGE?

// POST (calls the shutdown function of log4js-node)
exports.deactivated = function(req, res) {

};

