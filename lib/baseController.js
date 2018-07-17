
const utils = require('../common/utils');
const redis = require('../common/redis');

class BaseController {
    constructor(){
        this.utils = utils;
        this.redis = redis;
        this.respSuccess = respSuccess;
        this.respError = respError;
        this.checkParams = checkParams;
    }
}

function respSuccess(res,data,msg = ''){
    let rest = {
        success: true,
        data: data,
        msg: msg
    }
    res.json(rest);
}

function respError(res,e){
    let err_code = '-1',
        message = '请求失败';
    
    if(e.ecode){
        err_code = e.ecode;
        message = e.message;
    }

    let rest = {
        success: false,
        err_code,
        message
    }
    res.json(rest);
}

/**
 * 检查参数是否有效
 * @param {Object} data 
 * @param {Array} keys 
 */
function checkParams(data={},keys=[]){

    keys.forEach(key=>{
        let value = data[key];
        if(value === undefined || value === 'undefined' || value === ''){
            throw new CError(`the value of param ${key} (${value}) is invalid `);
        }
    })
}

exports = module.exports = BaseController;