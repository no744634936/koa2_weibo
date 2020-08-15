
const {author,blog}=require("./tables.js")
find=async()=>{
        //连表查询1,通过blog来发起查询

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
        console.log(blogListWithAuthor);
        console.log("-----------------------");
        
        console.log(blogListWithAuthor.count);
        console.log(blogListWithAuthor.rows);

        console.log("------------分割线-----------");
        
        // 注意下面这两种错误的写法
        // let result=blogListWithAuthor.rows.map(blog=>{blog.dataValues})   //这样写会出错
        // let result=blogListWithAuthor.rows.map((blog)=>{blog.dataValues});   //这样写也会出错
        
        //let result=blogListWithAuthor.rows.map(blog=>blog.dataValues);    //这样写没有错
        // let result=blogListWithAuthor.rows.map((blog)=>{return blog.dataValues}); //这样子写没有错。map里面打了大括号之后记得要return
        
        let result=blogListWithAuthor.rows.map((blog)=>{
            let blogVal=blog.dataValues;
            blogVal.author=blogVal.author.dataValues;  //为什么这样写？ console.log(blogVal)就知道了
            return blogVal;
        });

        console.log(result);


        console.log("-----------连表查询2----------------------");
        
        //连表查询2,通过author来发起查询
        let authorListWithBlog=await author.findAndCountAll({
            attributes:["name","nickName"],
            include:[
                {model:blog}
            ]
        });
        result2=authorListWithBlog.rows.map(author=>{
           let authorVal=author.dataValues;
        //    console.log(authorVal);
           authorVal.blog=authorVal.blogs.map(blog=>blog.dataValues);
           return authorVal;
        })

        console.log(result2);
 
        //sequelize 返回的数据是json 格式的js object。
        //result2包含object所以用 JSON.stringify()来将它展开
        console.log(JSON.stringify(result2));
        
        /*

        返回的是json 格式的js object。
            [
                {
                    name: 'zhanghaifeng',
                    nickName: 'zhang',
                    blogs: [ [blog] ],
                    blog: [ [Object] ]
                },
                {
                    name: 'lisi',
                    nickName: '李四',
                    blogs: [ [blog] ],
                    blog: [ [Object] ]
                }
            ]

        使用JSON.stringify()将json格式的js对象转变为字符串就可以看见里面具体的数据了
            [
                {
                    "name":"zhanghaifeng",
                    "nickName":"zhang",
                    "blogs":[{"id":1,"title":"test","content":"test","authorID":1,"createdAt":"2020-06-18T23:31:16.000Z","updatedAt":"2020-06-18T23:31:16.000Z"}],
                    "blog":[{"id":1,"title":"test","content":"test","authorID":1,"createdAt":"2020-06-18T23:31:16.000Z","updatedAt":"2020-06-18T23:31:16.000Z"}]
                },
                {
                    "name":"lisi",
                    "nickName":"李四",
                    "blogs":[{"id":2,"title":"test2","content":"test2","authorID":2,"createdAt":"2020-06-18T23:31:16.000Z","updatedAt":"2020-06-18T23:31:16.000Z"}],
                    "blog":[{"id":2,"title":"test2","content":"test2","authorID":2,"createdAt":"2020-06-18T23:31:16.000Z","updatedAt":"2020-06-18T23:31:16.000Z"}]
                }
            ]
        */
        
}

find();
