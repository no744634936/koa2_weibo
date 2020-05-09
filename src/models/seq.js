const Sequeize=require("sequelize");

const seq= new Sequeize("koacms","root","no744634",{
    host:"localhost",
    dialect:'mysql',   //因为sequelize能操作多种数据库，所以要指定数据库类型
});


// "koacms": 数据库名
// "root"  :用户名
// "no744634" :密码

//测试链接
seq.authenticate().then(()=>{
    console.log("ok");
}).catch(()=>{
    console.log("can not connect to mysql");
    
})

