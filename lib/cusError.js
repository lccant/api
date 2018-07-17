const util = require('util');

/**
 * 自定义错误类
 * 
 * @class CustomError
 */
class CustomError {
  /**
   * Creates an instance of CustomError.
   * @param {any} code 
   * @param {any} message 
   * 
   * @memberOf CustomError
   */
  constructor(message, ecode = '-1'){
    this.ecode = ecode;
    this.message = message;
  }

  
  toString(){
    return this.message;
  }
}

//继承Error错误类
util.inherits(CustomError,Error);

exports = module.exports = CustomError;