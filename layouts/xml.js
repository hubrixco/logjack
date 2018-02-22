const log4js = require('../../log4js-node');
const XMLWriter = require('xml-writer');

function addLayout(){
    log4js.addLayout('xml', config => function (logEvent) {
        // format in xml
        var xw = new XMLWriter;
        xw.startDocument();
        xw.startElement('log');
        xw.writeElement('startTime',logEvent.startTime.toString());
        xw.writeElement('categoryName', logEvent.categoryName);
        xw.writeElement('data', logEvent.data.toString());
        xw.writeElement('level', logEvent.level.toString());
        xw.writeElement('context', JSON.stringify(logEvent.context));
        xw.writeElement('pid', logEvent.pid.toString());
        
        //xw.text(logEvent.toString());
        xw.endDocument();
     
        //console.log(xw.toString());
        return xw.toString() + config.separator;
    });
}

module.exports = {
    addLayout
}