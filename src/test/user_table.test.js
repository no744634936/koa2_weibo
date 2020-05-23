/**
 * @description 测试db/tables/user_table.js 的表的结构是否被改动过
 *              例如，user_table.js的结构被更改，picture被删除了，那么测试就会报
 * @zhanghaifeng 
 */

const {User}=require("../db/tables/user_table.js")

test("user 表的各个属性符合预期",()=>{

    //build 会构建一个内容记录，不会把记录真的放到数据库中去
    let user=User.build({
        userName: "zhanghaifeng",
        password:"no744634",
        nickName:"zhangsan",
        //gender:1
        picture:"/xxx.jpg",
        city:"tokyo"
    })

    //验证各种属性
    expect(user.userName).toBe("zhanghaifeng")
    expect(user.password).toBe("no744634")
    expect(user.nickName).toBe("zhangsan")
    expect(user.gender).toBe(3)            //测试gender的默认值为3
    expect(user.picture).toBe("/xxx.jpg")
    expect(user.city).toBe("tokyo")
})