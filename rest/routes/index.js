var log4js = require('../../../log4js-node');
var restify = require('restify');

// POST
server.post('/config_globals', function(req, res, next) {
    // use the log4js config JSON in req to set global config defaults
    log4js.configure(req);
});

// POST
server.post('/config', function(req, res, next) {
    log4js.configure(req);
});

// POST
server.post('/log,', function(req, res, next) {
    // get the level, etc from the req containing the config JSON
    log4js.getLogger()._log(req);
});

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
    log4js.shutdown( function(){
        console.log('shutdown callback');
    })
};

