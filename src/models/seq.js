const Sequelize=require("sequelize");

const seq= new Sequelize("koacms","root","no744634",{
    host:"localhost",
    dialect:'mysql',   //因为sequelize能操作多种数据库，所以要指定数据库类型

    //线上环境使用连接池的配置。线下环境不用使用连接池
    //pool:5,            //连接池中最大的连接数量
    //min:0,             //最小的数量
    //idle:10000,   //如果一个连接池如果10秒没被使用就被释放
});


// "koacms": 数据库名
// "root"  :用户名
// "no744634" :密码


module.exports=seq;
