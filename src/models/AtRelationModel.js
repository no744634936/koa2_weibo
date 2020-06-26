/**
 * @description 对AtRelations数据表的crud操作
 * @author zhanghaifeng
 */



const{AtRelation}=require("../db/relation.js")

class AtRelationModel{

    /**
     * 创建@到的用户与微博的关系
     * @param {number} weiboId 
     * @param {number} userId 
     */
    create_at_relation=async(userId,weiboId)=>{
        let result=await AtRelation.create({
            userId,
            weiboId
        })

        return result.dataValues;
    }

    /**
     * 获取@ 我的微博的数量
     * @param {number} userId 
     */
    get_at_num=async(userId)=>{
        let result=await AtRelation.findAndCountAll({
                where:{
                    userId,
                    isRead:false,
                }
        });

        return result.count;
    }

}


module.exports=new AtRelationModel();