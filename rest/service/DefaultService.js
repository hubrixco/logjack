'use strict';


/**
 * Accepts the configuration object to initialize the logger with desired options (categories, appenders, etc.)
 *
 * configuration Config configuration object (optional)
 * no response value expected for this operation
 **/
exports.configure = function(configuration) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns the current log level for an appender.
 *
 * appenderName String 
 * no response value expected for this operation
 **/
exports.getCurrentLevel = function(appenderName) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logs the message based on current configuration object.
 *
 * message String 
 * config Config configuration object
 * no response value expected for this operation
 **/
exports.log = function(message,config) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Sets the current log level for an appender.
 *
 * level String 
 * appenderName String 
 * config Config configuration object
 * no response value expected for this operation
 **/
exports.setCurrentLevel = function(level,appenderName,config) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

