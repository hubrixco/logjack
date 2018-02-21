'use strict';

var JackLogger = require("../../jackLogger.js"); 

/**
 * Logs the message based on current configuration object.
 *
 * message String 
 * config Config configuration object
 * no response value expected for this operation
 **/
exports.log = function(message,configuration) {

  let jackLogger = new JackLogger(configuration).logger;
  let level = configuration.categories.default.level;

  if(jackLogger.isLevelEnabled(level)){
    if(level === 'trace')
      jackLogger.trace(message);
    else if(level === 'debug')
      jackLogger.debug(message);
    else if(level === 'info')
      jackLogger.info(message);
    else if(level === 'warn')
      jackLogger.warn(message);
    else if(level === 'error')
      jackLogger.error(message);
    else if(level === 'fatal')
      jackLogger.fatal(message);
    else
      ; // should never get here due to isLevelEnabled check
  }
  else
    console.log('exception: Log level not enabled. Check your configuration.');

  return new Promise(function(resolve, reject) {
    resolve();
  });
}

