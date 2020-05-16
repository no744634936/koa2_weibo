const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get("/testSession",async(ctx,next)=>{
    ctx.session.name="zhanghaifeng";
    ctx.body=`将session的值保存到redis里面去.
              请打开 redis-server.exe 然后打开redis-cli.exe,
              然后在redis-cli里面输入keys * 查看加密后的session 的key
              然后输入 get weibo:sess:~~~~~~~~~
              (我测试的时候是这个key weibo:sess:9ABLOysxlw5LFILSmpLpa7NCQCbAZ4sg) 
              就可以看到zhanghaifeng这个值了`
})

router.get('/http_request', async (ctx, next) => {
    ctx.body = {
      title: 'good good'
    }
  })

router.get('/env_test', async (ctx, next) => {
    ctx.body = {
      "环境变量": process.env.NODE_ENV
    }
})




module.exports = router
