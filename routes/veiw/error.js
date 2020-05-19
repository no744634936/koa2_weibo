/**
 * @description error 404 路由
 * @author zhanghaifeng
 */



const router = require('koa-router')();


//这个* 表示 当路由没有命中的时候，就返回404页面
router.get('/error', async (ctx, next) => {
  await ctx.render('error.html')
})


router.get('/testError', async (ctx, next) => {
    throw Error();  //这是我故意丢的错误，用来检测 onerror中间件是否有在运行
    ctx.body = {
        title: 'test error page'
    }
})


//带星号的路由必须放下面
router.get('*', async (ctx, next) => {
  await ctx.render('404.html')
})
module.exports = router

//写完路由后记得在app.js文件里注册路由