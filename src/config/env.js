/**
 * 配置环境变量
 * 
 */

 const ENV=process.env.NODE_ENV;
 module.exports={
     isDev: ENV==="dev",
     isPrd:ENV==="prd",
     isTest:ENV==="test",
 }