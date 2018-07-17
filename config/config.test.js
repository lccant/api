/**
 * 测试环境
 * Created by xzh 2017-10-30
 */
exports = module.exports = {
  port: 3000,
  systemVersion: '10.0.0.01',
  gateway_ip:'http://10.2.15.233:8500',
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: null,
    db: null,
    family: 4,
    prefix: 'lc-api'
  },
  db: {
    type: 'mysql',
    host: '10.2.15.233',
    port: 3306,
    database: 'loraasdb',
    user: 'root',
    passwd: 'Jz_123456'
  },
  consul:{
    host: '10.2.15.142',
    port: '8500',
    promisify: true
  }
}