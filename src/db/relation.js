const {User}=require("./tables/user_table.js")
const {Weibo}=require("./tables/weibo.js")




//查询微博带出个人信息时启用
Weibo.belongsTo(User, { foreignKey: 'userId',constraints: false})

// 查询个人信息带出微博的信息时启用
User.hasMany(Weibo, { foreignKey: 'userId',constraints: false})

module.exports={
    Weibo,
    User
}