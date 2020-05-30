/**
 * @description 对微博数据表的crud操作
 * @author zhanghaifeng
 */

 //导入数据模型
const {Weibo}=require("../db/tables/weibo.js")

class WeiboModel{

    createWeibo=async({userId,content,image})=>{
        let result=await Weibo.create({
            userId,
            content,
            image,
        })
        return result.dataValues
    }
}



module.exports=new WeiboModel()