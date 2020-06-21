/**
 * @description 对微博数据表的crud操作
 * @author zhanghaifeng
 */

//导入数据模型
//不能这样单独的导入每个表，只能查询单个表，不能做连表查询
// const {Weibo}=require("../db/tables/weibo.js")
// const {User}=require("../db/tables/user_table.js")

//要这样导入才能做连表查询
const{Weibo,User,UserRelation}=require("../db/relation.js")
const {redis_set,redis_get}=require("../cache/_redis.js")


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

        //拼接查询条件,这个是user表的查询条件，如果不穿用户名就查出所有用户的微博
        let user_whereOpts={}
        if(userName){
           user_whereOpts.userName=userName
        }


        //执行查询
        let result=await Weibo.findAndCountAll({
            limit:pageSize, //每页多少条
            offset:(pageNum-1)*pageSize, //跳过多少条
            order:[
                ["id","desc"], //根据id 倒序排列
            ],
            include:[
                {
                    model:User,
                    attributes:["userName","nickName","picture"],
                    //因为这是where表的查询条件所以要放到user表里面来
                    where:user_whereOpts
                }
            ]
        })

        // console.log(result);

        //把微博得数据取出来
        let weibo_list=result.rows.map(row=>row.dataValues)

        console.log(weibo_list);

        //把user的信息也得取出来
        weibo_list=weibo_list.map(item=>{
            let user=item.user.dataValues
            item.user=user
            return item
        })
        
        // console.log(weibo_list);
        
        return{
            count:result.count,
            weibo_list,
        }
        
    }

    get_all_weibo=async({pageNum,pageSize})=>{
        let userName=null;
        const  REDIS_KEY_PREFIX="weibo:squarePage"
        let key=`${REDIS_KEY_PREFIX}${pageNum}_${pageSize}`
        
        //有缓存的时候　就从缓存里面取出来
        let cacheResult=await redis_get(key)
        if(cacheResult!==null){
            return cacheResult
        }
        
        //没有缓存的时候，读取数据库，将数据放入缓存,返回从数据中读取的数据
        //redis key的前缀，用来辨认是哪一个页面的redis key
        let result=await this.get_weibo_by_userName(userName,pageNum,pageSize)
        redis_set(key,result,60)
        return result
    }

    get_followee_blog_list=async(myUserId,pageNum=1,pageSize=5)=>{
        //followee 里面也包含自己
        //因为要查询的是微博，所以才是 Weibo.findAndCountAll
        let result=await Weibo.findAndCountAll({

            limit:pageSize, //每页多少条
            offset:(pageNum-1)*pageSize, //跳过多少条
            order:[["id","desc"]],
            include:[
                {
                    model:User,
                    attributes:["id","userName","nickName","picture"]
                },
                //第一步这个时候，weibo与user表已经通过 userId=id联系起来了，
                //每条weibo里面都包含了 user的"id","userName","nickName","picture" 信息
                {
                    model:UserRelation,
                    attributes:["followerId","followeeId"],
                    where:{followerId:myUserId}
                }
                //第二步这个时候，根据followerId:myUserId 来取出符合条的记录
                //然后因为 Weibo 表中的 userId  对应到 userRelation表中的FolloweeId ,
                //将followeeId 每一条记录里面，写入"followerId","followeeId"
            ]
        })
    
    
        let followee_weibo_list=result.rows.map(row=>row.dataValues);
        // console.log("111111111111111111");
        // console.log(followee_weibo_list);
        followee_weibo_list=followee_weibo_list.map(weiboItem=>{
            weiboItem.user=weiboItem.user.dataValues;
            return weiboItem;
        })
        // console.log("222222222222222222");
        // console.log(followee_weibo_list);

        return{
            count:result.count,
            followee_weibo_list,
        }
    }

}

// let test=new WeiboModel()
// test.get_weibo_by_userName("zhanghaifeng")
// test.get_followee_blog_list(1);


module.exports=new WeiboModel()