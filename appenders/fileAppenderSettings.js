var AppenderSettings = require('./appenderSettings');

class FileAppenderSettings extends AppenderSettings{

    constructor(fileName,maxLogSize,numBackups,compress,encrypt){
        super(encrypt);
        this.fileName = fileName;
        this.maxLogSize = maxLogSize;
        this.numBackups = numBackups;
        this.compress = compress;
    }

    set fileName(fileName){
        this._fileName = fileName;
    }

    get fileName(){
        return this._fileName;
    }

    set maxLogSize(maxLogSize){
        this._maxLogSize = maxLogSize;
    }

    get maxLogSize(){
        return this._maxLogSize;
    }

    set numBackups(numBackups){
        this._numBackups = numBackups;
    }

    get numBackups(){
        return this._numBackups;
    }
    
    set compress(compress){
        this._compress = compress;
    }

    get compress(){
        return this._compress;
    }

    // overload base class
    getApprenderJSON(){
        let file;
        file = new Object();

        file.type = "file";
        file.filename = this._fileName;
        file.maxLogSize = this._maxLogSize;
        file.numBackups = this._numBackups;
        file.compress = this._compress;

        return file;
    }
}

module.exports = FileAppenderSettings;
