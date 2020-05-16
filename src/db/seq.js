const Sequelize=require("sequelize");
const {MYSQL_CONF}=require("../config/conf.js")
const {isDev,isPrd}=require("../config/env.js")

const {host,user,password,database}=MYSQL_CONF;

const conf={
    host:host,
    dialect:'mysql',   //因为sequelize能操作多种数据库，所以要指定数据库类型
}

if(isPrd){
    //线上环境，使用连接池
    conf.pool={
        max:5,            //连接池中最大的连接数量
        min:0,             //最小的数量
        idle:10000,   //如果一个连接池如果10秒没被使用就被释放
    }
}


const seq= new Sequelize(database,user,password,conf);

module.exports=seq;