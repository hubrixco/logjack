require('../hubrixLogger');

exports.configure_global = function(req, res) {
    HubrixLogger.configure_global({}, function(err, config) {
        // use the log4js config JSON to set global defaults
    });
};

exports.configure = function(req, res) {
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

exports.log = function(req, res) {
    HubrixLogger.log({}, function(err, config) {
        // do it
    });
};
