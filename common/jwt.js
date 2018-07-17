const JWT = require('jsonwebtoken');
const cfg = require('../config/index').def

exports = module.exports = {
  /**
   * 签名
   * 
   * @param {any} payload 
   * @returns token
   */
  sign(payload) {
    var token = JWT.sign({
      exp: Math.floor(Date.now()/1000 + parseInt(cfg.expire_time)),
      data: payload
    }, cfg.secret_key);
    return token;
  },

  /**
   * 验证
   * 
   * @param {any} token 
   * @returns data
   */
  verify(token){
    try {
      var payload = JWT.verify(token,cfg.secret_key);
      return {data: payload.data};
    } catch (error) {
      return {err: error.message}
    }
  },
  /**
   * 解密
   * 
   * @param {any} token 
   * @returns payload
   */
  decode(token){
    var payload = JWT.decode(token,cfg.secret_key,{complete:true});
    return payload;
  }
}