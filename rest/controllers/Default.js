'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.configure = function configure (req, res, next) {
  var configuration = req.swagger.params['configuration'].value;
  Default.configure(configuration)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCurrentLevel = function getCurrentLevel (req, res, next) {
  var appenderName = req.swagger.params['appenderName'].value;
  Default.getCurrentLevel(appenderName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.log = function log (req, res, next) {
  var message = req.swagger.params['message'].value;
  var config = req.swagger.params['config'].value;
  Default.log(message,config)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.setCurrentLevel = function setCurrentLevel (req, res, next) {
  var level = req.swagger.params['level'].value;
  var appenderName = req.swagger.params['appenderName'].value;
  var config = req.swagger.params['config'].value;
  Default.setCurrentLevel(level,appenderName,config)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
