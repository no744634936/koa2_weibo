const router = require('koa-router')()
const {loginRedirect}=require("../validator/loginCheck.js")

//loginRedirect 是登录验证中间件。至于登录后才能使用这写路由。
router.get('/', loginRedirect,async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', loginRedirect,async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', loginRedirect,async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
