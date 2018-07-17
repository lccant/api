/**
 * 数据库操作
 * Created by xzh 2017-10-30
 */

const pool = require('./db').pool;



/**
 * 参数转义,防sql注入
 * 拼接sql时使用
 * 仅提供string和一层Json转义
 * 
 * @param {any} obj 
 * @returns 
 */
let escape = (obj) => {
  if (typeof obj === 'object') {
    for (var i in obj) {
      obj[i] = pool.escape(obj[i]);
    }
  } else {
    obj = pool.escape(obj);
  }
  return obj;
}

/**
 * 执行查询
 * 
 * @param {any} sql 
 * @param {any} params 
 * @returns 
 */
let query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    })
  })
}


/**
 * 获取connection连接
 * 
 * @returns 
 */
let getConnection = () => {
  return new Promise((resovle, reject) => {
    pool.getConnection((err, conn) => {
      if (err) reject(err);
      else resovle(conn);
    })
  })
}

/**
 * 查询分页数据并返回数据行总数
 * 
 * @param {any} sqls sql脚本对象
 * @param {any} params 传入参数
 * @param {any} limit 查询条数
 * @param {any} offset 查询偏移
 * @returns 
 */
let findAndCountAll = async(sqls, params, limit, offset) => {
  // 分页返回数据对象
  var listSql = `${sqls.select} ${sqls.from} limit ${offset},${limit};`;
  var countSql = `select count(*) as count  ${sqls.from};`
  let result = await query(countSql + listSql, params);
  var data = {
    rows: result[1],
    count: result[0][0].count
  };
  return data;
}


/**
 * 查询一条
 * 
 * @param {Object} sqls sql脚本对象 
 * @param {Array} params 传入参数
 * @returns 
 */
let findOne = async(sqls, params) => {
  let sql = `${sqls.select} ${sqls.from}`
  let rows = await query(sql, params);
  return rows.length > 0 ? rows[0] : null;
}


/**
 * 查询所有数据
 * 
 * @param {Object} sqls sql脚本对象 
 * @param {Array} params 传入参数
 * @returns 
 */
let findAll = async(sqls, params) => {
  var sql = `${sqls.select} ${sqls.from}`;
  let data = await query(sql, params);
  return data;
}


exports = module.exports = {
  escape,
  findAndCountAll,
  findAll,
  findOne,
  getConnection,
  query,
}