
const mongoose = require('mongoose');
const cfg = require('../config/index').sys.mongodb

// var dbpath = `mongodb://${cfg.user}:${cfg.passwd}@${cfg.host}:${cfg.port}/${cfg.database}`;
const dbpath = `mongodb://${cfg.host}:${cfg.port}/${cfg.database}`;
mongoose.connect(dbpath,{},function(err){
  if(err){
    console.log(`connect to server [${cfg.host}] error: `, err.message);
    process.exit(1);
  }
})


require('./white_list');


module.exports = {
  WhiteList:       mongoose.model('white_lists')
}