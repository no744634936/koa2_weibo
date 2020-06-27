/**
 * @description 对AtRelations数据表的crud操作
 * @author zhanghaifeng
 */

const{AtRelation,Weibo,User}=require("../db/relation.js")
const{formatWeibo,formatUserImg}=require("./_format.js")

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

    /**
     * 获取@ 我的微博列表
     * @param {number} userId 
     * @param {number} pageNum 
     * @param {number} pageSize 
     */
    get_at_me_weibos= async (userId,pageNum,pageSize)=>{

        //weibo 与 AtRelation通过外键关联，取出相应的数据
        //然后取出的数据又根据 Weibo 与 User的外键关联，取出用户信息
        let result=await Weibo.findAndCountAll({
            limit:pageSize, //每页多少条
            offset:(pageNum-1)*pageSize, //跳过多少条
            order:[
                ["id","desc"], //根据id 倒序排列
            ],
            include:[
                {
                    model:AtRelation,
                    attributes:["userId","weiboId"],
                    where:{userId:userId,isRead:false}
                },
                //上面这段代码执行结束之后，查询的微博是不带有用户信息的，所以要把用户信息取出来
                {
                    model:User,
                    attributes:["userName","nickName","picture"],
                }
            ]

        })

        //result.count
        //result.rows

        //把微博得数据取出来
        let weibo_list=result.rows.map(row=>row.dataValues)

        //给格式化weibo，数据的格式化应该在model里面进行，而不是在controller里面进行
        weibo_list=formatWeibo(weibo_list);

        weibo_list=weibo_list.map(weiboItem=>{
            //将weiboItem.user.dataValues 格式化了之后，赋值给weiboItem.user。
            //然后返回weiboItem
            weiboItem.user=formatUserImg(weiboItem.user.dataValues);
            return weiboItem;
        })

        return {
            count:result.count,
            weibo_list
        }
    }

}


module.exports=new AtRelationModel();