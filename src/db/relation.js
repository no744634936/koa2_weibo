const {User}=require("./tables/user_table.js")
const {Weibo}=require("./tables/weibo.js")
const {UserRelation}=require("./tables/user_relation.js")




//查询微博带出个人信息时启用
Weibo.belongsTo(User, { foreignKey: 'userId',constraints: false})

// 查询个人信息带出微博的信息时启用
User.hasMany(Weibo, { foreignKey: 'userId',constraints: false})

// UserRelation 的followeeId 跟 followerId 都得跟 User表得id 有关系，
// 所以有四种关系，我都列出来了。
//但是用到的关系只有 一个 User.hasMany(UserRelation,{foreighKey:"followeeId",constraints: false})

//根据被关注者的id 在UserRelation表里找到了记录，
//然后因为 User表里的id 等于 UserRelation表表里的followeeId
//所以id可以找出，followee的基本信息。
User.hasMany(UserRelation,{foreighKey:"followeeId",constraints: false})

//其他的暂时还用不到。
// UserRelation.belongsTo(User,{foreighKey:"followeeId",constraints: false})
// UserRelation.belongsTo(User,{foreighKey:"followerId",constraints: false})
//User.hasMany(UserRelation,{foreighKey:"followerId",constraints: false})


module.exports={
    Weibo,
    User,
    UserRelation
}