
const {User}=require("./tables/user_table.js")
const {UserRelation}=require("./tables/userRelation.js")
const {Weibo}=require("./tables/weibo.js")

//创建关系

//查询微博带出个人信息时启用
//weibo 表中的userId关联到的是user表中的id
Weibo.belongsTo(User, { foreignKey: 'userId',constraints: false})

// 查询个人信息带出微博的信息时启用
User.hasMany(Weibo, { foreignKey: 'userId',constraints: false})


//get_fans_list
//userRelation表中的 followerId 关联到的是 user表中的id
User.hasMany(UserRelation,{foreignKey:'followerId',constraints: false})
// UserRelation.belongsTo(User,{foreignKey:"followerId",constraints: false})

// //get_followee_list
//userRelation表中的 followeeId 关联到的是 user表中的id
UserRelation.belongsTo(User,{foreignKey:"followeeId",constraints: false})
// User.hasMany(UserRelation,{foreignKey:'followeeId',constraints: false})


//获取我关注的人的微博数据
//Weibo 表中的 userId  对应到 userRelation表中的FolloweeId ,
//如果不写 targetKey:"followeeId",  那么Weibo 表中的 userId  对应到 userRelation表中的id。
Weibo.belongsTo(UserRelation,{
    foreignKey:"userId",
    targetKey:"followeeId",
    constraints: false
})

// UserRelation.hasMany(Weibo,{
//     foreignKey:"userId",
//     targetKey:"followeeId",
//     constraints: false
// })


module.exports={
    User,
    UserRelation,
    Weibo
}