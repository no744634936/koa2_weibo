const {author,blog}=require("./tables.js")

find=async()=>{

    //查询一条记录
    let result=await author.findOne( {where : {name:"zhanghaifeng"} });
    console.log(result.dataValues);

    //查询结果返回特定的列
    let result2=await author.findOne({
        attributes:["name","nickName"],
        where:{name:"zhanghaifeng"}
    })
    console.log(result2.dataValues);
    

    //查询多条数据.并排序
    //返回的是一个包含多个object的数组所以没办法用dataValues
    let zhangblogList=await blog.findAll(
        {
            where:{authorID:1},
            order:[ ["id","desc"],]
        },
    )
    console.log(zhangblogList);
    console.log(
        //返回一个包含所有记录的数组
        zhangblogList.map(blog=>blog.dataValues)
    );
    

    //分页,从尾部开始取，
    let blogPagelist=await blog.findAll({
        limit:2,       //限制本次查询，只查询两条
        offset:0,       //跳过多少条
        order:[["id","desc"]]
    })
    console.log(
        //返回一个包含所有记录的数组
        blogPagelist.map(blog=>blog.dataValues)
    );

    //查询总数
    //这个写法既能查找分页数据，还能计算表里的数据的总数
    let blogListAndCount=await blog.findAndCountAll({
        limit:2,       //限制本次查询，只查询两条
        offset:0,       //跳过多少条
        order:[["id","desc"]]
    })

    console.log(
        blogListAndCount.count, //不考虑分页时的数据总数
        blogListAndCount.rows.map(blog=>blog.dataValues)  //记录分页数据的数组
    );
    
}

find();

