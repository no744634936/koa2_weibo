const {User}=require("./tables/user_table.js")
const {Weibo}=require("./tables/weibo.js")
const {UserRelation}=require("./tables/user_relation.js")
const {AtRelation}=require("./tables/atRelation.js")




//查询微博带出个人信息时启用
Weibo.belongsTo(User, { foreignKey: 'userId',constraints: false})

// 查询个人信息带出微博的信息时启用
User.hasMany(Weibo, { foreignKey: 'userId',constraints: false})

//get_fans_list
User.hasMany(UserRelation,{foreignKey:'followerId',constraints: false})

// //get_followee_list
UserRelation.belongsTo(User,{foreignKey:"followeeId",constraints: false})

//获取我关注的人的微博数据
//Weibo 表中的 userId  对应到 userRelation表中的FolloweeId ,
//如果不写 targetKey:"followeeId",  那么Weibo 表中的 userId  对应到 userRelation表中的id。
Weibo.belongsTo(UserRelation,{
    foreignKey:"userId",
    targetKey:"followeeId",
    constraints: false
})

UserRelation.hasMany(Weibo,{
    foreignKey:"userId",
    targetKey:"followeeId",
    constraints: false
})

AtRelation.belongsTo(Weibo,{foreignKey:'weiboId',constraints: false})
Weibo.hasMany(AtRelation,{foreignKey:'weiboId',constraints: false})

module.exports={
    Weibo,
    User,
    UserRelation,
    AtRelation
}