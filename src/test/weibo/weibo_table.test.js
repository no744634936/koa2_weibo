/**
 * @description 微博数据模型单元测试
 * @author
 */
const {Weibo}=require("../../db/tables/weibo.js")

test("微博数据模型各个属性符合预期",()=>{
    let weibo=Weibo.build({
        userId:10,
        content:"test content",
        image:"/test.jpg"
    })
    expect(weibo.userId).toBe(10)
    expect(weibo.content).toBe("test content")
    expect(weibo.image).toBe("/test.jpg")

})