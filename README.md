
----------------------------------------------------------------

运行命令
node src/models/insert.js
输入数据


运行命令
node src/models/select.js
查询数据


连表查询


改

删

连接池。查看 seq.js



-------------------------------------------------------------------
建立表之间的关系的时候一定要注意foreignKey 是否写对了，否则sequelize会自动给表添加 userId 字段。

blog.belongsTo(author, { foreignKey: 'authorID',constraints: false});

author.hasMany(blog, { foreignKey: 'authorID',constraints: false});

------------------------------------------------------------------------------------------


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
    `authors` AS `author` ON `blog`.`authorID` = `author`.`id` 
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