
const {WhiteList} = require('../models/index');
const CError = require('../lib/cusError');
const jwt = require('../common/jwt');
const redis = require('../common/redis');
const BaseController = require('../lib/baseController');
const controller = new BaseController();

controller.checkJWT = async (ctx, next)=>{
    try{
        let path = ctx.path;
        let count = await WhiteList.count({path, enabled: true});
        if(count){
            return next();
        }

        let jwtToken = ctx.headers['x-json-web-token'] || '';
        if(jwtToken == ''){
            throw new CError('','');
        }

        let cacheToken = await redis.get(jwtToken);
        
    }catch(e){
        controller.respError(res, e);
    }
}