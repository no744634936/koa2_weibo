const {User,UserRelation}=require("./table_relations.js")



get_fans_list=async(followeeId)=>{
    let result=await User.findAndCountAll({
        attributes:["id","userName","nickName","picture"],
        order:[["id","desc"]],
        include:[
            {
                model:UserRelation,
                where:{followeeId:followeeId}
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

get_fans_list(2);

