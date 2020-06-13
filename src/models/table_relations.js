
const {User}=require("./tables/user_table.js")
const {UserRelation}=require("./tables/userRelation.js")


//创建关系


//get_fans_list
User.hasMany(UserRelation,{foreignKey:'followerId',constraints: false})
UserRelation.belongsTo(User,{foreignKey:"followerId",constraints: false})

//get_followee_list
User.hasMany(UserRelation,{foreignKey:'followeeId',constraints: false})
UserRelation.belongsTo(User,{foreignKey:"followeeId",constraints: false})



module.exports={
    User,
    UserRelation
}