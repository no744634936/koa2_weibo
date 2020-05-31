/**
 * @description 对微博数据表的crud操作
 * @author zhanghaifeng
 */

 //导入数据模型
const {Weibo}=require("../db/tables/weibo.js")
const {User}=require("../db/tables/user_table.js")

class WeiboModel{

    createWeibo=async({userId,content,image})=>{
        let result=await Weibo.create({
            userId,
            content,
            image,
        })
        return result.dataValues

    }
    

    /**
     * @description 根据用户名来获取微博
     * @param {Object} 查询参数 {userName,offset=0,pageSize=10}
     * @param {sting} userName 用户名
     * @param {number} offset 从几号位开始查询
     * @param {number} pageSize 获取多少条数据
     * 
     */

    get_weibo_by_userName=async(userName,pageNum=1,pageSize=10)=>{

        //拼接查询条件,这个是user表的查询条件
        let user_whereOpts={}
        if(userName){
           user_whereOpts.userName=userName
        }


        //执行查询
        let result=await Weibo.findAndCountAll({
            limit:pageSize, //每页多少条
            offset:(pageNum-1)*10, //跳过多少条
            order:[
                ["id","desc"], //根据id 倒序排列
            ],
            include:[
                {
                    model:User,
                    attributes:["userName","nickName,picture"],
                    //因为这是where表的查询条件所以要放到user表里面来
                    where:user_whereOpts
                }
            ]
        })

        console.log(weibo_list);
        
        let weibo_list=result.rows.map(row=>row.dataValues)
        weibo_list=weio
    }
}

let test=new WeiboModel()
test.get_weibo_by_userName("zhanghaifeng")

// module.exports=new WeiboModel()