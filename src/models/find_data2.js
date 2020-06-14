const {User,UserRelation}=require("./table_relations2.js")


//get fans list
/**
 * UserRelation.belongsTo(User,{foreignKey:"followerId",constraints: false})
 * 
 * 首先将followeeId=2 的记录从UserRelation表里取出来，
 * 然后根据记录的followerId 从User表中到粉丝的记录
 * 
 * where条件在哪里就先从那张表开始找。
 */
get_fans_list=async(followeeId)=>{
    let result=await UserRelation.findAndCountAll({
        order:[["id","desc"]],
        where:{followeeId:followeeId},
        include:[
            {
                model:User,
                attributes:["id","userName","nickName","picture"],
            }
        ]
    })

    let fans_list=result.rows.map(row=>row.dataValues)
    fans_list=fans_list.map(row=>{
        let fans=row.user_test.dataValues;
        return fans
        
    })

    console.log(fans_list);

    return {
        count:result.count,
        fans_list,
    }
}
get_fans_list(2);


//get followees list
/**
 * User.hasMany(UserRelation,{foreignKey:'followeeId',constraints: false})
 * 
 * 首先从UserRelation表里面将followerId等于1的记录取出，
 * 然后根据取出记录中的followeeId 从 User表中取出记录。也就是用户关注的人，也叫被关注者。
 * where条件在哪里就先从那张表开始找。
 */
get_followee_list=async(followerId)=>{
    let result=await User.findAndCountAll({
        order:[["id","desc"]],
        attributes:["id","userName","nickName","picture"],
        include:[
            {
                model:UserRelation,
                where:{followerId,followerId},
            }
        ],
 
    })

    let followee_list=result.rows.map(row=>row.dataValues);

    console.log("--------------------");
    
    console.log(followee_list);

    followee_list=followee_list.map(row=>{
        console.log(row.userRelation_tests[0].dataValues);
        
    })
    
    console.log("bbbbbbbbbbbbbbbbbbbbbbbb");

    return {
        count:result.count,
        followee_list,
    }
}

get_followee_list(1);