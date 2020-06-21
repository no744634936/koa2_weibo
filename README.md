首页要进行三表查询


1，首页显示自己的博客以及关注人的博客，
   显示自己的微博要用到微博表与 用户表。
   显示关注的人的微博就要用到 微博表，用户表 与 用户关系表了，
   weibo 就得关联 userRelation表 

2，建立数据模型之间的关系，
   参考 3.2_sequelize_three_tables_relation 分支

3，自己关注自己，
   我需要，自己关注自己，这样从userRelaiton 表里取出的followeeId里面，就包含我的id与我关注的人的id，然后去，weibo表取记录的时候，就可以将我的weibo与我关注的人的微博，一起，取出来，还可以按时间按顺序排列，非常方便。如果不自己关注自己，那么我自己的微博 与 我关注的人的微博就得分开取出来，然后按时间顺序排列也会很麻烦。如果不用sequelize而用SQL会比较灵活一点，
   新建用户得时候，就自己关注自己

   查看 UserModel.js 文件里的 createUser 方法。

4,自己关注自己后，粉丝列表和，关注人列表，都会显示自己，所以要将自己从粉丝列表
  与关注人列表里删除。
  查看 UserRelationModel.js 文件里的 get_fans_list 与  get_followee_list
  方法



5,获取自己与关注的人的微博，粉丝，关注的人，分页
  查看WeiboController.js 里的 showTopPage 方法。


6,首页的loadmore 功能。查看路由
 router.get("/topPage/loadMore/:pageNum",loginCheck,WeiboController.top_page_load_more)



---------------------------------------------0---------------------------------------------------------
建立数据模型之间的关系后用到的测试数据


INSERT INTO users VALUES (1,'zhanghaifeng','5a9c450adaeb73e05148e70b7bbd21f7','zhanghaifeng',1,NULL, NULL,'2020-06-10 15:10:39','2020-06-10 15:10:39'), (2,'wang','5a9c450adaeb73e05148e70b7bbd21f7','wang',1,NULL,NULL,'2020-06-10 15:10:53','2020-06-10 15:10:53');

INSERT INTO users VALUES (3,'yang','5a9c450adaeb73e05148e70b7bbd21f7','yang',1,NULL,NULL,'2020-06-10 15:10:39','2020-06-10 15:10:39'), (4,'huang','5a9c450adaeb73e05148e70b7bbd21f7','huang',1,NULL,NULL,'2020-06-10 15:10:53','2020-06-10 15:10:53');

INSERT INTO userrelations VALUES (1,1,2,'2020-06-10 15:11:09','2020-06-10 15:11:09'); INSERT INTO userrelations VALUES (2,1,3,'2020-06-10 15:11:09','2020-06-10 15:11:09');
INSERT INTO userrelations VALUES (3,1,1,'2020-06-10 15:11:09','2020-06-10 15:11:09'); INSERT INTO userrelations VALUES (2,1,3,'2020-06-10 15:11:09','2020-06-10 15:11:09');

INSERT INTO weibos VALUES (1,1,"test test","/test.picture",'2020-06-10 15:11:09','2020-06-10 15:11:09'); INSERT INTO weibos VALUES (2,2,"hahahhaah","/test.picture",'2020-06-10 15:11:09','2020-06-10 15:11:09'); INSERT INTO weibos VALUES (3,3,"wawawaawa","/test.picture",'2020-06-10 15:11:09','2020-06-10 15:11:09');

