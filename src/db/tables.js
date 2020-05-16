const Sequelize=require("sequelize");
const seq=require("./seq")


//创建authors表。 注意author会自动变为复数authors.
const author=seq.define("author",{
    //id 会自动创建并设为主键，并自增。
    name:{
        type:Sequelize.STRING,  //varchar(255)
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    nickName:{
        type:Sequelize.STRING,
        comment:"昵称"
    },
    is_deleted:{
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
});

const blog=seq.define("blog",{
    title:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    content:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    authorID:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }

})

//这两句话是用来建立表与表之间的关系的。建立关系但是不使用外键
//不写这两句，后面就没法执行连表查询。执行select_comples.js 文件。
blog.belongsTo(author, { foreignKey: 'authorID',constraints: false});
author.hasMany(blog, { foreignKey: 'authorID',constraints: false});

module.exports={
    author,
    blog
}

