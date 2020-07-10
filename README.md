
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













let result=await author.findOne( {where : {name:"zhanghaifeng"} });

对应的是

SELECT 
  `id`, `name`, `password`, `nickName`, `is_deleted`, `createdAt`, `updatedAt` 
FROM 
   `authors`AS `author` 
WHERE 
  `author`.`name` = 'zhanghaifeng' 
LIMIT 1;


------------------------------------------------------------------------------------------
//查询特定的列
let result2=await author.findOne({
    attributes:["name","nickName"],
    where:{name:"zhanghaifeng"}
})

对应的是

SELECT `name`, `nickName` FROM `authors` AS `author` WHERE `author`.`name` = 'zhanghaifeng' LIMIT 1;

------------------------------------------------------------------------------------------
let zhangblogList=await blog.findAll({
        where:{authorID:1},
        order:[ ["id","desc"],]
})

对应的是

SELECT 
  `id`, `title`, `content`, `authorID`, `createdAt`, `updatedAt` 
FROM 
  `blogs` AS `blog` 
WHERE 
  `blog`.`authorID` = 1 
ORDER BY 
`blog`.`id` 
DESC;


------------------------------------------------------------------------------------------


//分页,从尾部开始取，
let blogPagelist=await blog.findAll({
    limit:2,       //限制本次查询，只查询两条
    offset:0,       //跳过多少条
    order:[["id","desc"]]
})

对应的是

SELECT 
    `id`, `title`, `content`, `authorID`, `createdAt`, `updatedAt` 
FROM 
    `blogs` AS `blog` 
ORDER BY 
    `blog`.`id` 
DESC 
LIMIT 0, 2;

----------------------------------------------------------------------------------
//查询总数
//这个写法既能查找分页数据，还能计算表里的数据的总数
let blogListAndCount=await blog.findAndCountAll({
    limit:2,       //限制本次查询，只查询两条
    offset:0,       //跳过多少条
    order:[["id","desc"]]
})


对应的是



SELECT count(*) AS `count` FROM `blogs` AS `blog`;

和

SELECT 
    `id`, `title`, `content`, `authorID`, `createdAt`, `updatedAt` 
FROM 
    `blogs` AS `blog` 
ORDER BY 
    `blog`.`id` 
DESC 
LIMIT 0, 2;


-----------------------------------------------------------------------------

const blogListWithAuthor=await blog.findAndCountAll({
    order:[["id","desc"]],   //将blog中的数据倒序排列
    include:[
        {
            model:author,
            attributes:["name","nickName"],//只取出authors表里的name跟nickName字段
            where:{name:"zhanghaifeng"}    //条件为
        },
    ]
})


对应的是

SELECT 
    count(`blog`.`id`) AS `count` 
FROM 
    `blogs` AS `blog` 
INNER JOIN 
    `authors` AS `author` ON `blog`.`authorID` = `author`.`id` 
AND 
    `author`.`name` = 'zhanghaifeng';



SELECT 
    `blog`.`id`, 
    `blog`.`title`, 
    `blog`.`content`, 
    `blog`.`authorID`, 
    `blog`.`createdAt`, 
    `blog`.`updatedAt`, 
    `author`.`id` AS `author.id`, 
    `author`.`name` AS `author.name`, 
    `author`.`nickName` AS `author.nickName` 
FROM 
    `blogs` AS `blog` 
INNER JOIN 
    `authors` AS `author` 
ON 
    `blog`.`authorID` = `author`.`id` 
AND 
    `author`.`name` = 'zhanghaifeng' 
ORDER BY 
    `blog`.`id` 
DESC;




---------------------------------------------------------------------
let authorListWithBlog=await author.findAndCountAll({
    attributes:["name","nickName"],
    include:[
        {model:blog}
    ]
});


对应的是

 SELECT count(`author`.`id`) AS `count` FROM `authors` AS `author` LEFT OUTER JOIN `blogs` AS `blogs` ON `author`.`id` = `blogs`.`authorID`;



 SELECT 
    `author`.`id`, 
    `author`.`name`, 
    `author`.`nickName`, 
    `blogs`.`id` AS `blogs.id`, 
    `blogs`.`title` AS `blogs.title`, 
    `blogs`.`content` AS `blogs.content`, 
    `blogs`.`authorID` AS `blogs.authorID`, 
    `blogs`.`createdAt` AS `blogs.createdAt`, 
    `blogs`.`updatedAt` AS `blogs.updatedAt` 
FROM 
    `authors` AS `author` 
LEFT OUTER JOIN 
    `blogs` AS `blogs` ON `author`.`id` = `blogs`.`authorID`;



-------------------------------------------------------------------------
let result=await UserRelation.findAndCountAll({
    order:[["id","desc"]],
    where:{followerId,followerId},
    include:[
        {
            model:User,
            attributes:["id","userName","nickName","picture"]
        }
    ],
})

对应的是(省略了count)

SELECT 
    `userRelation_test`.`id`, 
    `userRelation_test`.`followerId`, 
    `userRelation_test`.`followeeId`, 
    `userRelation_test`.`createdAt`, 
    `userRelation_test`.`updatedAt`, 
    `user_test`.`id` AS `user_test.id`, 
    `user_test`.`userName` AS `user_test.userName`, 
    `user_test`.`nickName` AS `user_test.nickName`, 
    `user_test`.`picture` AS `user_test.picture` 
FROM 
    `userRelation_tests` AS `userRelation_test` 
LEFT OUTER JOIN 
    `user_tests` AS `user_test` 
ON 
    `userRelation_test`.`followeeId` = `user_test`.`id` 
WHERE 
    `userRelation_test`.`followerId` = 1 
ORDER BY 
    `userRelation_test`.`id` 
DESC;
