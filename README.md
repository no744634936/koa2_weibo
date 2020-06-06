建立 userRelation表 :查看 src/db/tables/user_realation.js 文件即可




UserRelation 的followeeId 跟 followerId 都得跟 User表的id 有关系，
查看weibo_database_structure_.png 图片，

查看db/relation.js 文件中的四个关系

UserRelation.belongsTo(User,{foreighKey:"followeeId",constraints: false})
User.hasMany(UserRelation,{foreighKey:"followeeId",constraints: false})

UserRelation.belongsTo(User,{foreighKey:"followerId",constraints: false})
User.hasMany(UserRelation,{foreighKey:"followerId",constraints: false})