const {author,blog}=require("./tables.js")



get_fans_list=async(Id)=>{
    let result=await User.findAndCountAll({
        attributes:["id","userName","nickName","picture"],
        order:[["id","desc"]],
        include:[
            {
                model:UserRelation,
                where:{Id}
            }
        ]
    })

    let fans_list=result.rows.map(row=>row.dataValues)

console.log(fans_list);

    return {
        count:result.count,
        fans_list,
    }
}

get_fans_list();