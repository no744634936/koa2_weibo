
0,最开始查看weibo_database_structure 图片


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
(1,'zhanghaifeng','5a9c450adaeb73e05148e70b7bbd21f7','zhanghaifeng',1,NULL,
NULL,'2020-06-10 15:10:39','2020-06-10 15:10:39'),
(2,'wang','5a9c450adaeb73e05148e70b7bbd21f7','wang',1,NULL,NULL,'2020-06-10 
15:10:53','2020-06-10 15:10:53');

INSERT INTO `user_tests` VALUES 
(3,'yang','5a9c450adaeb73e05148e70b7bbd21f7','yang',1,NULL,NULL,'2020-06-10 15:10:39','2020-06-10 15:10:39'),
(4,'huang','5a9c450adaeb73e05148e70b7bbd21f7','huang',1,NULL,NULL,'2020-06-10 15:10:53','2020-06-10 15:10:53');


INSERT INTO `userrelation_tests` VALUES (1,1,2,'2020-06-10 15:11:09','2020-06-10 15:11:09');
INSERT INTO `userrelation_tests` VALUES (2,1,3,'2020-06-10 15:11:09','2020-06-10 15:11:09');





1，如果一张表里面有两个外键，那么可以这样写关系，

  hasMany 跟belongsTo 关系一定是成对出现的。


//get_fans_list
//查user然后，include userRelation
User.hasMany(UserRelation,{foreignKey:'followeeId',constraints: false})

// //get_followee_list
//查userRelation然后，include user
UserRelation.belongsTo(User,{foreignKey:"followerId",constraints: false})


或者这样写也可以

//get_followee_list
//查user然后，include userRelation
User.hasMany(UserRelation,{foreignKey:'followerId',constraints: false})

//get_fans_list
//查userRelation然后，include user
UserRelation.belongsTo(User,{foreignKey:"followeeId",constraints: false})


查看 table_relations.js 与 table_relations2.js 的区别。

查看 find_data.js 与 find_data2.js 的区别。

注意一定要先执行 create_tables.js文件后，插入数据，再执行find_data.js

一定要先执行 create_tables2.js文件后，插入数据，再执行find_data2.js