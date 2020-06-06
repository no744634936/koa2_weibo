制作粉丝列表功能


表与表之间关系的说明:   注意这很重要。



// UserRelation 的followeeId 跟 followerId 都得跟 User表得id 有关系，
// 所以有四种关系，我都列出来了。
//但是用到的关系只有 一个 
// 就是下面这个

User.hasMany(UserRelation,{foreighKey:"followeeId",constraints: false})

//其他的暂时还用不到。
// UserRelation.belongsTo(User,{foreighKey:"followeeId",constraints: false})
// UserRelation.belongsTo(User,{foreighKey:"followerId",constraints: false})
//User.hasMany(UserRelation,{foreighKey:"followerId",constraints: false})



1,

Weibo.belongsTo(User, { foreignKey: 'userId',constraints: false})

这个句话的意思是说，
通过某个条件查找到user表里的记录，
假设找到一条数据，这时三条数据的id为 1
然后因为，User表里的id = Weibo表里的userID建立了联系
就可以由， userID等于1这个条件来查找weibo里的数据(数据可以是一条，也可以是多条)


用代码写出来话就是这样:
首先执行include里面的语句，然后再执行 Weibo.findAndCountAll

    let result=await Weibo.findAndCountAll({

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



2,

User.hasMany(UserRelation,{foreighKey:"followeeId",constraints: false})

//根据被关注者的id 在UserRelation表里找到了记录，
//然后因为 User表里的id 等于 UserRelation表表里的followeeId
//所以id可以找出，followee的基本信息。

用代码写就是这样


