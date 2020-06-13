const {UserRelation,User}=require("../db/relation.js")


class UserRelationModel{
    /**
     * @description 根据被关注人的id 找到他的粉丝们
     * @param {number} followeeid 被关注人的id
     * 
     * 根据被关注者的id 在UserRelation表里找到了记录，
     * 然后因为 User表里的id 等于 UserRelation表里的followeeId
     * (relation.js 里的User.hasMany(UserRelation,{foreighKey:"followeeId",constraints: false})关系来连接表)
     * 所以id可以找出，followee的基本信息。
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

console.log(fans_list);

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
