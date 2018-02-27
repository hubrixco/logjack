const jsonLayout = require('./layouts/json');
const xmlLayout = require('./layouts/xml');

var log4js = require('log4js');

class JackLogger{
    constructor(configuration){
        let layoutType;

        if(configuration.appenders.out.hasOwnProperty('layout')){
            
            layoutType = configuration.appenders.out.layout.type;

            if(layoutType === 'json'){
                jsonLayout.addLayout();
            }
            else if(layoutType === 'xml'){
                xmlLayout.addLayout();
            }
            else
                ;// built-in layout
        }
        try{
            log4js.configure(configuration);
        }
        catch(err){
            console.log('Error: ' + err.message);
        }
        this.baseLogger = log4js.getLogger();
    }

    get logger(){
        return this.baseLogger;
    }
    
    shutdown(){
        log4js.shutdown(this.postShutdown());
    }
    postShutdown(){
        ;
    }
}

module.exports = JackLogger;