const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const render = require('koa-art-template')
const index = require('./routes/index')

const userViewRouter=require('./routes/veiw/user.js')
const userApiRouter=require("./routes/api/user.js")
const session=require("koa-generic-session")
const redisStore=require("koa-redis")
const {REDIS_CONF}=require("./conf/conf.js")

const path=require('path')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

render(app, {
    root: path.join(__dirname, 'views'),   //视图的位置
    extname: '.html', //后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
});


//session 配置，将session放进redis里面去
app.keys=["Ui_zhanghaifeng123"];  //将数据加密的签名，随便写。大小写，特殊字符，数字
app.use(session({
    key:"weibo.sid",  //cookie name 默认是koa.sid
    prefix:"weibo:sess:",//redis key 的前缀，默认是 "koa:sess:" 将数据保存到redis的时候会加前缀为了好区分
    cookie:{
        path:"/",
        httpOnly:true,
        maxAge:24*24*60*1000,
    },
    //ttl:24*24*60*1000,    //cookie 过期之后，redis里面也要将数据删除。如果不写ttl就默认与cookie的maxAge一样的时间过期。
    store:redisStore({
        // all:"127.0.0.1:6379"
        all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

console.log(`${REDIS_CONF.host}:${REDIS_CONF.port}`);


// routes
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
