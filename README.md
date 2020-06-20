
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



INSERT INTO `weibo_tests` VALUES (1,1,"test test","/test.picture",'2020-06-10 15:11:09','2020-06-10 15:11:09');
INSERT INTO `weibo_tests` VALUES (2,2,"hahahhaah","/test.picture",'2020-06-10 15:11:09','2020-06-10 15:11:09');
INSERT INTO `weibo_tests` VALUES (3,3,"wawawaawa","/test.picture",'2020-06-10 15:11:09','2020-06-10 15:11:09');



查看 table_relations.js 与  find_data.js 

注意一定要先执行 create_tables.js文件后，插入数据，再执行find_data.js



-------------------------------------------------------------------------

//sequelize 简单粗暴，
//三表连接查询，我想要查询我关注的人的weibo，然后每条微博下面都有user信息，


get_followee_blog_list=async(myUserId)=>{
    //因为要查询的是微博，所以才是 Weibo.findAndCountAll
    let result=await Weibo.findAndCountAll({
        order:[["id","desc"]],
        include:[
            {
                model:User,
                attributes:["id","userName","nickName","picture"]
            },
            //第一步这个时候，weibo与user表已经通过 userId=id联系起来了，
            //每条weibo里面都包含了 user的"id","userName","nickName","picture" 信息
            {
                model:UserRelation,
                attributes:["followerId","followeeId"],
                where:{followerId:myUserId}
            }
            //第二步这个时候，根据followerId:myUserId 来取出符合条的记录
            //然后因为 Weibo 表中的 userId  对应到 userRelation表中的FolloweeId ,
            //所以可以通过followeeId找到 weibo表里的userId
            //最后在userId 对应的记录里面写入"followerId","followeeId"
        ]
})

//第一步跟第二步可以颠倒。没关系，sequelize就是怎么粗暴。
