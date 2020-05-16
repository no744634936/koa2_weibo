const {author,blog}=require("./tables.js")

deleteMethod=async()=>{
    let deleteResult=await author.destroy(
        {where:{id:2}}
    )
    console.log(deleteResult); //返回1 
    
}

deleteMethod();