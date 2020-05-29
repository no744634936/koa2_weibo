/**
 * @description 创建表的程序
 * 
 */


const seq=require("./seq.js")

require("./relation.js")

//测试链接
seq.authenticate().then(()=>{
    console.log("ok");
}).catch(()=>{
    console.log("can not connect to mysql");
    
})


//执行同步，创建数据表。
//{force:true} 如果数据库里包含了同名的表就删除后再建立
seq.sync({force:true}).then(()=>{

    console.log("数据表创建成功");
    //表建立了之后退出sequelize;
    process.exit();
})