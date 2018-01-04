require('./appenders/appenderSettings');

const jsonLayout = require('./layouts/json');
const xmlLayout = require('./layouts/xml');

var AppenderSettings = require('./appenders/appenderSettings');
var log4js = require('../log4js-node');

class HubrixLogger{
    constructor(appenderType,layoutType,level,appenderSettings){
        let layout;
        let appenders;
        let defaultAppenderSettings = new AppenderSettings(false);

        this.appenderSettings = appenderSettings || defaultAppenderSettings;

        // add any Hubrix specific layouts
        if(layoutType === 'json'){
            jsonLayout.addLayout();
            layout = new Object();
            layout = { type:'json', separator: ','}; // put in json.js
        }
        else if(layoutType === 'xml'){
            xmlLayout.addLayout();
            layout = new Object();        
            layout = { type:'xml' };
        }
        else{ // standard layouts from log4js
            layout = new Object();
            layout.type = layoutType;
        }
         
        // build the configuration object for log4js
        appenders = new Object();
    
        // Hubrix appender wrappers
        if(appenderType === 'file')
            appenders.out = appenderSettings.getApprenderJSON();
        else // standard appender JSON from log4js
            appenders.out = { type: appenderType, layout };
    
        //console.log(JSON.stringify(appenders));
    
        log4js.configure({
            appenders,
            categories: {
                default: { appenders: ['out'], level: level }
            }
        });

        if(this.appenderSettings.encrypt)
            this.baseLogger = log4js.getEncryptedLogger();
        else
            this.baseLogger = log4js.getLogger();
    }

    get logger(){
        return this.baseLogger;
    }

    // TODO: get and set layout, appenders, etc.
    
    shutdown(){
        log4js.shutdown(this.postShutdown());
    }
    postShutdown(){
        ;
    }
}

module.exports = HubrixLogger;