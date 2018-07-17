/**
 * 数据库配置
 * Created by xzh 2017-10-30
 */

const mysql = require('mysql');
const cfg = require('../config/index')

const pool = mysql.createPool({
  host: cfg.sys.db.host,
  user: cfg.sys.db.user,
  password: cfg.sys.db.passwd,
  database: cfg.sys.db.database,
  port: cfg.sys.db.port,
  multipleStatements: true
})

exports = module.exports = {
  pool
}
