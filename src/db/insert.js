const {author,blog}=require("./tables.js")

insert=async()=>{
    //创建作者
    const zhanghaifeng=await author.create({
        name:"zhanghaifeng",
        password:"123456",
        nickName:"zhang"
    })
    //insert into authors (...) values(....)
    //打印创建的信息，
    console.log(zhanghaifeng.dataValues);
    let zhanghaifengID=zhanghaifeng.dataValues.id;
    

    const lisi=await author.create({
        name:"lisi",
        password:"123456",
        nickName:"李四"
    })
    let lisiID=lisi.dataValues.id;


    //创建博客
    const blog1=await blog.create({
        title:"test",
        content:"test",
        authorID:zhanghaifengID
    })
    const blog2=await blog.create({
        title:"test2",
        content:"test2",
        authorID:lisiID
    })
}
insert();