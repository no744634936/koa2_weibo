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
module.exports={
    author,
    blog
}

