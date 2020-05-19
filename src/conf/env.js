/**
 * 配置环境变量,开发环境跟线上环境运行不同的sequelize 与redis 的配置
 * 
 */

const ENV=process.env.NODE_ENV;
module.exports={
    isDev: ENV==="dev",
    isPrd:ENV==="prd",
    isTest:ENV==="test",
}