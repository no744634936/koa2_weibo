
/**
 * @description 操作redis的方法
 * @author zhanghaifeng
 */
const redis=require("redis")
const {REDIS_CONF}=require("../conf/conf.js")

//创建客户端
const redisClient=redis.createClient(REDIS_CONF.port,REDIS_CONF.host)

redisClient.on("error",err=>{
    console.error("redis error",err);
    
})

//timeout为1小时，一小时之后将自动
redis_set=(key,value,timeout=60*60)=>{

    //如果传进来的value是个object
    //console.log(JSON.stringify({ x: 5, y: 6 }));
　　// expected output: "{"x":5,"y":6}"
    if(typeof value=="object"){
        //将object类型转换成json字符串类型
        value=JSON.stringify(value);
    }
    
    //放入redis 并设置过期时间
    redisClient.set(key,value)
    redisClient.expire(key,timeout)

    
    
}

//redis 会返回一个值，node.JS向，redis请求
//获取数据就需要返回一个promise
redis_get=(key)=>{
    console.log("redis_get");
    
    let promise=new Promise((resolve,reject)=>{
        redisClient.get(key,(err,value)=>{
            if(err){
                reject(err)
            }
            //传过来了一个key但是没有找到value的情况下。
            if(value==null){
                resolve(null)
            }
            try{
                //首先尝试将字符串转成object
                resolve(JSON.parse(value))
            }catch(ex){
                // 如果不能将将字符串转成object，就说明value是个非json字符串
                resolve(value)
            }
        })
    })
    return promise
}

module.exports={
    redis_set,
    redis_get
}