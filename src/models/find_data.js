const {User,UserRelation,Weibo}=require("./table_relations.js")


//get fans list
/**
 * User.hasMany(UserRelation,{foreignKey:'followerId',constraints: false})
 * 
 * 先根据followeeId等于2 从 UserRelation 表里将记录取出。
 * 然后根据记录中的followerId从 User表里取出对应的记录。也就是粉丝的记录
 * 
 * where条件在哪里就先从那张表开始找。
 * 
 */
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
    console.log(result);
    
    let fans_list=result.rows.map(row=>row.dataValues)

    console.log(fans_list);

    return {
        count:result.count,
        fans_list,
    }
}
get_fans_list(2);


//get followees list
/**
 * UserRelation.belongsTo(User,{foreignKey:"followeeId",constraints: false})
 * 
 * 先根据followerId等于1 从 UserRelation 表中取出记录，
 * 然后根据followeeId从 User表里取出对应的记录。也就是用户关注的人，也叫被关注者。
 * 
 * where条件在哪里就先从那张表开始找。
 */
get_followee_list=async(followerId)=>{
    let result=await UserRelation.findAndCountAll({
        order:[["id","desc"]],
        where:{followerId,followerId},
        include:[
            {
                model:User,
                attributes:["id","userName","nickName","picture"]
            }
        ],
 
    })

    let followee_list=result.rows.map(row=>row.dataValues);


    console.log("--------------------");
    
    followee_list=followee_list.map(row=>{
        let followee=row.user_test.dataValues;
        return followee
        
    })
    console.log(followee_list);
    
    console.log("bbbbbbbbbbbbbbbbbbbbbbbb");
    
    
    return {
        count:result.count,
        followee_list,
    }
}

get_followee_list(1);


get_followee_blog_list=async(myUserId)=>{
    //因为要查询的是微博，所以才是 Weibo.findAndCountAll
    let result=await Weibo.findAndCountAll({
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
    console.log("111111111111111111");
    console.log(followee_weibo_list);

    followee_weibo_list=followee_weibo_list.map(weiboItem=>{
        weiboItem.user_test=weiboItem.user_test.dataValues;
        return weiboItem;
    })

    console.log("222222222222222222");
    console.log(followee_weibo_list);
}

get_followee_blog_list(1);