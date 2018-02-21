'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

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

