/**
 * @description:连接redis，使用get set方法
 */

 let redis=require("redis");
 let {REDIS_CONF}=require("../conf.js");


 //创建客户端
let redisClient=redis.createClient(REDIS_CONF.port,REDIS_CONF.host);

redisClient.on("err",err=>{
    console.error("redis error",err);
    
});

//set
/**
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间 单位为秒
 */
set=(key,val,timeout=60*60)=>{
    if(typeof val==="object"){
        val=JSON.stringify(val); //object 变成字符串类型
    }
    redisClient.set(key,val);
    redisClient.expire(key,timeout);
}

//get
/**
 * @param {string} key 键
 */

get=(key)=>{
    let promise=new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err);
            }
            if(val==null){   //如果值过期了，或者本来就没有，就返回null
                resolve(null)
            }

            try{
                resolve(JSON.parse(val))  //把字符串转变成object
            }catch(ex){
                //如果字符串不能被转变成oject，那么就直接返回这个值
                resolve(val);
            }
        })

    })
    return promise;
}


module.exports={
    set,
    get
}
