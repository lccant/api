const Router = require('koa-router')
const router = new Router();
const ctlIndex = require('../controller/index')
const ctlHealth =require('../controller/health')

router.prefix('/api');

router.get('/health/check',ctlHealth.check)

// router.get('*',ctlIndex.verifyToken)

router.all('/:service/:controller/:action', ctlIndex.executeApi);

module.exports = router
