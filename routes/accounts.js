const Router = require('koa-router')
const router = new Router();
const ctlIndex = require('../controller/index')

router.prefix('/accounts');

router.get('/:service/:controller/:action', ctlIndex.executeApi);

module.exports = router;