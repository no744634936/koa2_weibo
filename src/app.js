const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const render = require('koa-art-template')
const index = require('./routes/index')
const errorRoute=require("./routes/veiw/error")
const path=require('path')
const session=require("koa-generic-session")
const redisStore=require("koa-redis")
const {REDIS_CONF}=require("./config/conf.js");
const {isDev,isPrd}=require("./config/env.js")

console.log(REDIS_CONF);


// error handler
//线上环境的时候，如果出现错误就显示错误页面，开发环境下不需要
let errorPage={}

if(isDev){
    errorPage={redirect: "/error"}
    
}
onerror(app,errorPage)            //当网页报错的时候，启动localhost:3000/error路由

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



// 注册路由
app.use(index.routes(), index.allowedMethods())
app.use(errorRoute.routes(), errorRoute.allowedMethods()) //404路由一定要注册到最后面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
