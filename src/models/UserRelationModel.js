const {UserRelation,User}=require("../db/relation.js")


class UserRelationModel{
    /**
     * @description 根据被关注人的id 找到他的粉丝们
     * @param {number} followeeid 被关注人的id
     * 
     */
    get_fans_list=async(followeeId)=>{
        let result=await User.findAndCountAll({
            attributes:["id","userName","nickName","picture"],
            order:[["id","desc"]],
            include:[
                {
                    model:UserRelation,
                    where:{followeeId}
                }
            ]
        })

        let fans_list=result.rows.map(row=>row.dataValues)

        return {
            count:result.count,
            fans_list,
        }
    }

    /**
     * @description 获取关注的人的列表
     * @param {number} followerId 粉丝的id
     */
    get_followee_list=async(followerId)=>{

    }

    create_relation=async(followerId,followeeId)=>{
        let result=await UserRelation.create({
            followerId,
            followeeId,
        })

        return result.dataValues
    }
    delete_relation=async(followerId,followeeId)=>{
        console.log(followerId,followeeId);
        
        let result=await UserRelation.destroy({
            where:{
                followerId:followerId,
                followeeId,followeeId,
            }
        })
        return result>0;
    }
}

module.exports=new UserRelationModel();
