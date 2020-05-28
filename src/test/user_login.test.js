/**
 * @description user login api test
 * @author zhanghaifeng
 */

const server=require("./server.js")

//用户民信息
let userName=`u_test_${Date.now()}`
let password=`p_test${Date.now()}`
let testUser={
    userName,
    password,
    nickName: "test_nickName",
    gender:1,
    city:"test"
}

//因为没有登录无法使用api 所以要储存cookie，绕过登录验证。
let COOKIE=""

//测试注册功能，
//注意必须使用异步函数，因为 server.post("/api/user/register") 这句话的意思是说，
//使用controllers/user/UserApiController.js里的register方法，因为register 函数是异步，所以调用它的方法也得是异步
test("注册一个用户应该成功",async ()=>{
    let response=await server.post("/api/user/register").send(testUser)
    expect(response.body.errnum).toBe(0)
})


//测试重复注册功能，即用户名相同时不能注册
test("重复注册用户因该失败",async()=>{
    let response=await server.post("/api/user/register").send(testUser)
    console.log(response.body);
    
    expect(response.body.errnum).not.toBe(0)
})


//查询用户是否存在，测试isExist 接口
test("测试的用户名应该存在",async()=>{
    let response=await server.post("/api/user/isExist").send({userName})
    expect(response.body.errnum).toBe(0)
})

//注册数据格式验证
test("json schema 检测，非法的格式，注册因该失败",async()=>{
    let response=await server
        .post("/api/user/register")
        .send({
            userName:"123",   //用户名不是以字母或下划线开头
            password:"a",     //最小长度不是3
            gender:"male"    //不是数字
        })
    expect(response.body.errnum).not.toBe(0)
})

//登录测试
 
test("登录应该成功",async()=>{
    let response=await server.post("/api/user/login").send({userName,password})
    expect(response.body.errnum).toBe(0)

    //获取cookie
    COOKIE=response.header["set-cookie"].join(";");
})

//修改localhost:3000/setting 页面的基本信息
test("修改基本信息应该成功",async()=>{
    let response=await server
    .patch("/api/user/changeInfo")
    .send({
        nickName:"a_测试昵称",
        city:"测试城市",
        picture:"/test.jpg"
    })
    .set("cookie",COOKIE)
    expect(response.body.errnum).toBe(0)
})

//修改密码
test("修改基本信息应该成功",async()=>{
    let response=await server
    .patch("/api/user/changePassword")
    .send({
        password:password,
        newPassword: "test_password"
    })
    .set("cookie",COOKIE)
    expect(response.body.errnum).toBe(0)
})





//测试完register后，数据库里就会有一条testUser的测试数据，
//接着我用这条测试数据的 userName,password 来登录，
//登录之后就会生成一个cookie。
//然后我拿着这个cookie 来登录验证，使用delete路由，来删除添加的测试数据。
//所以我在 src\routes\api\user.js 文件里添加了一个delete路由，
//这个路由是在test环境下，而且必须登录之后才能执行，

test("删除用户应该成功",async()=>{
        let response=await server
            .post("/api/user/delete_test_data")
            .set("cookie",COOKIE)   // 有cookie说明已经登录了.模拟登录
        expect(response.body.errnum).toBe(0)
})


//查询用户是否存在，测试isExist 接口
test("删除之后，测试的用户名应该不存在",async()=>{
    let response=await server.post("/api/user/isExist").send({userName})
    expect(response.body.errnum).not.toBe(0)
})



//只有在删除测试结束之后，在测试 退出登录功能。
//因为删除测试有个登录验证，session必须存在，所以必须将session的删除放在最后执行

test("退出登录应该成功",async()=>{
    let response=await server
    .post("/api/user/logout")
    .set("cookie",COOKIE)
    expect(response.body.errnum).toBe(0)
})