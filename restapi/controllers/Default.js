'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.log = function log (req, res, next) {
  var config = req.swagger.params['config'].value;
  Default.log(config)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

