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

