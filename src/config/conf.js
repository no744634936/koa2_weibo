const {isDev,isPrd}=require("./env.js")

if(isDev){
    //开发环境下的配置
    var REDIS_CONF={
        port:6379,
        host:"127.0.0.1"
    }
    
    var MYSQL_CONF={
        host:"localhost",
        user:"root",
        password:"no744634",
        port:"3306",   //默认为3306 写不写都可以，还是写上比较好
        database:"localhost"
    }
}else if(isPrd){
    //线上环境下的配置


    // let REDIS_CONF={
    //     。。。
    // }
    
    // let MYSQL_CONF={
    //     。。。
    // }
}

module.exports={
    REDIS_CONF,
    MYSQL_CONF,
}