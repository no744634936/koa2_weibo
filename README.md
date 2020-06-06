下载 redis到电脑上，打开 redis-server.exe 文件。要一直运行redis


npm install redis --save


查看src/redis文件夹里的所有文件。

学会如何写js doc

--------------------------------------------
1，将session写入redis

npm install koa-redis koa-generic-session --save


2，app.js 里面配置session

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


3，写路由

router.get("/testSession",async(ctx,next)=>{

    ctx.session.name="zhanghaifeng";
    
    ctx.body=`将session的值保存到redis里面去.
    
              打开 redis-server.exe 然后打开redis-cli.exe,
             
              然后在redis-cli里面输入keys * 查看加密后的session 的key
              
              然后输入 get weibo:sess:~~~~~~~~~
              
              (我测试的时候是这个key weibo:sess:9ABLOysxlw5LFILSmpLpa7NCQCbAZ4sg) 
              
              就可以看到zhanghaifeng这个值了`
              
})


4，npm run dev

5，将session储存到redis里面去

    localhost:3000/testSession


6,查看是否将sessio储存到了redis里面去了

    打开 redis-server.exe 然后打开redis-cli.exe,
    然后在redis-cli里面输入keys * 查看加密后的session 的key
    然后输入 get weibo:sess:~~~~~~~~~
    (我测试的时候输入这个key weibo:sess:9ABLOysxlw5LFILSmpLpa7NCQCbAZ4sg) 
    就可以看到zhanghaifeng这个值了

