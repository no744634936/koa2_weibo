1, 首先实例化sequelize
seq.js



2,表与表之间的关系

首先建立两个表
user_table.js
userRelation.js

3,然后建立表与表之间的联系
table_relations.js


手动给两个表传入数据，
INSERT INTO `user_tests` VALUES 
(1,'zhanghaifeng','5a9c450adaeb73e05148e70b7bbd21f7','zhanghaifeng',1,NULL,NULL,'2020-06-10 15:10:39','2020-06-10 15:10:39'),
(2,'wang','5a9c450adaeb73e05148e70b7bbd21f7','wang',1,NULL,NULL,'2020-06-10 15:10:53','2020-06-10 15:10:53');


INSERT INTO `userrelation_tests` VALUES (1,1,2,'2020-06-10 15:11:09','2020-06-10 15:11:09');


执行find_data.js  文件，根据关系的不同可以看见，不同的结果。


如果关系是这个，
User.hasMany(UserRelation,{foreignKey:'followeeId',constraints: false})
UserRelation.belongsTo(User,{foreignKey:"followeeId",constraints: false})


下面这段代码的意思就是说，先从UserRelation表里面将 followeeId 等于2 的记录去取出来，
然后根据记录里的followeeId 的值(值为2)从User表里查找出记录

-----------
    let result=await User.findAndCountAll({
        attributes:["id","userName","nickName","picture"],
        order:[["id","desc"]],
        include:[
            {
                model:UserRelation,
                where:{followeeId:followeeId}
            }
        ]
    })
-------------


执行的结果为:

[
  {
    id: 2,
    userName: 'wang',
    nickName: 'wang',
    picture: null,
    userRelation_tests: [ [userRelation_test] ]
  }
]



如果关系是这个，
User.hasMany(UserRelation,{foreignKey:'followerId',constraints: false})
UserRelation.belongsTo(User,{foreignKey:"followerId",constraints: false})


下面这段代码的意思就是说，先从UserRelation表里面将 followeeId 等于2 的记录去取出来，
然后根据记录里的followerId 的值(值为1)从User表里查找出记录

-----------
    let result=await User.findAndCountAll({
        attributes:["id","userName","nickName","picture"],
        order:[["id","desc"]],r
        include:[
            {
                model:UserRelation,
                where:{followeeId:followeeId}
            }
        ]
    })
-------------

那么查询的结果为

[
  {
    id: 1,
    userName: 'zhanghaifeng',
    nickName: 'zhanghaifeng',
    picture: null,
    userRelation_tests: [ [userRelation_test] ]
  }
]