const jwt = require('../common/jwt');
const api = require('../lib/api');
const rpc = require('../lib/rpc');

let verifyToken = (ctx,next)=>{
  var token = ctx.headers.token;
  if(!token){
    return ctx.body = {err:'invalid token'}
  }
  var result = jwt.verify(token);
  if(result.err){
    return ctx.body = {err:result.err}
  }
  token = jwt.sign(data); //重新生成新的token
  ctx.set = {token: token};
  next();
}

/**
 * 执行api
 * 
 * @param {any} ctx 
 * @returns 
 */
let executeApi = async (ctx) => {
  try {
    var params = ctx.params;
    var data = Object.keys(ctx.request.query).length > 0 ?  ctx.request.query : ctx.request.body;
    params = Object.assign(params,data);
    var serviceName = params.service;
    if(!serviceName){
      return ctx.body={err:'invalid service'}
    }
    //获取所有健康的服务
    // var services = await api.getHealthyService(serviceName);
    //
    // if(!services || services.length == 0){
    //   ctx.status = 404;
    //   return ctx.body={err:'service can not find'}
    // }
    //选择一个服务访问
    // var service = services[Math.floor(Math.random()*services.length)].Service;
    var service = {
        Address:'127.0.0.1',
        Port: 3003
    }

    var result = await rpc.getResponse(service,params);
    ctx.body = result;
  } catch (err) {
    ctx.body = {err:err.message}
  }
  
}

exports = module.exports = {
  executeApi,
  verifyToken
}