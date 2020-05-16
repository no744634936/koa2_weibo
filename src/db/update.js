const {author,blog}=require("./tables.js")

update=async()=>{
    let updateResult=await author.update(
        {nickName:"zhanhaifeng_xiugai"},
        {where:{name:"zhanghaifeng"}}
    )
    console.log(updateResult);  // 返回[ 1 ]
    
}

update();