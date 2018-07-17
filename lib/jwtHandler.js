const redis = require('../common/redis');
const jwt = require('../common/jwt');
const utils = require('../common/utils');

module.exports = {
    checkJWT: ctx => {
        return new Promise(async (resolve, reject) => {
            try {
                let jwtStr = ctx.headers['x-json-web-token'] || '';
                if(jwtStr === '') 
                    return resolve(false);
                
                let payload = jwt.decode(jwtStr);
                if(!payload || !payload.user_id || !payload.token)
                    return resolve(false);
                
                let result = await redis.get('token_'+payload.user_id);
                if(result !== payload.token) 
                    return resolve(false);

                ctx.user_info = payload.user_id;
                resolve(true);
            } catch (e) {
                resolve(false);
            }
        })
    },

    getToken: user_id => {
        return new Promise(async (resovle, reject) => {
            try {
                let token = await redis.get('token'+user_id);
                if(token) 
                    return resovle(token);

                let hash = utils.md5(user_id+utils.getNonceStr());
                await redis.set('token_'+user_id, hash, 30*24*60*60);
                resovle(hash);
            } catch (e) {
                reject(e)
            }
        })
    }, 

    getJwt: async function(user_id) {
        try {
            let token = await this.getToken(user_id);   
            let payload = {
                user_id,
                token
            }
            return jwt.sign(payload);
        } catch (e) {
            throw new Error('获取jwt失败');
        }
    },

    removeToken: user_id => {
        redis.del('token_'+user_id);
    }
}