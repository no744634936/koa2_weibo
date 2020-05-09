1,create database koacms


2,use koacms


3,
create table user (
    id int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username varchar(255) NOT NULL,
    password varchar(32) NOT NULL 
);



4,
insert into user values (1, 'Yamada', '1234');
insert into user values (2, 'Yamada', 'hahah');
insert into user values (3, 'test', 'test');
----------------------------------------------------------------



使用sequelize 链接数据库

npm install mysql2 --save    必须用mysql2 才能和sequelize一起使用
npm install --save sequelize


查看  src/models/seq.js 文件里的写法

运行看是否链接了数据库   node src/models/seq.js

ctrl 加c 退出链接