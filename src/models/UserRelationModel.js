const {UserRelation,User}=require("../db/relation.js")


class UserRelationModel{
    /**
     * @description 根据被关注人的id 找到他的粉丝们
     * @param {number} followeeid 被关注人的id
     * 
     */
    get_fans_list=async(followeeid)=>{
        let result=await User.findAndCountAll({
            attributes:["id","userName","nickName","picture"],
            order:[["id","desc"]],
            include:[
                {
                    model:UserRelation,
                    where:{followeeid}
                }
            ]
        })

        let fans_list=result.rows.map(row=>row.dataValues)

        return {
            count:result.count,
            fans_list,
        }
    }

    create_relation=async(followerId,followeeId)=>{
        let result=await UserRelation.create({
            followerId,
            followeeId,
        })

        return result.dataValues
    }
}

module.exports=new UserRelationModel();
