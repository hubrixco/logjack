class AppenderSettings{
    constructor(encrypt){
        console.log("AppenderSettings constructor.");
        this._encrypt = encrypt || false;
    }

    getApprenderJSON(){
        console.log("AppenderSettings:getApprenderSettings");
        return {};
    }
    get encrypt(){
        console.log("AppenderSettings:encrypt");
        return this._encrypt;
    }
}

module.exports = AppenderSettings;
