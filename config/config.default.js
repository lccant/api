
/**
 * 公共配置项
 */

const ADDR = process.env.HOST_IP || '10.2.15.75'; //服务ip地址，由环境变量传递
const HEALTHCHECK_PORT = 3000;                    //健康检查端口
const PRC_PORT = 3001;                            //微服务RPC端口
const SRV_NAME = 'api';                          //服务名   
const SRV_ID = "api_" + ADDR;                    //服务ID


exports = module.exports = {
  healthcheck_port:HEALTHCHECK_PORT,
  rpc_port: PRC_PORT,
  systemVersion: '10.0.0.01',
  secret_key: 'lc-api',
  expire_time: 1200,
  //服务参数
  service_opts: {
    name: SRV_NAME,
    id: SRV_ID,
    tags: ['authservice'],
    address: ADDR,
    port: PRC_PORT,
    check: {
      http: `http://${ADDR}:${HEALTHCHECK_PORT}/health/check`,
      interval: '5s',
      timeout: '5s'
    }
  }
  
}