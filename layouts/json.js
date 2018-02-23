const log4js = require('log4js');

function addLayout(){
    log4js.addLayout('json', config => function (logEvent) {
        return JSON.stringify(logEvent) + ',';
    });
}

module.exports = {
    addLayout
}



