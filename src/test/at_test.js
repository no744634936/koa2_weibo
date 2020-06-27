

/**
 * @description 微博@ 关系
 * @author zhanghaifeng
 */

const server=require("./server.js")



let id1=1;
let userName=`zhanghaifeng`
let password=`123`

let id2=2;
let userName2="wang";
let password2="123"


let Z_COOKIE=""
let W_COOKIE=""
let weibo_id=null

//登录测试，用zhanghaifeng 先取登录，获取cookie
test("zhanghaifeng登录应该成功",async()=>{
    let response=await server.post("/api/user/login").send({userName,password})
    
    expect(response.body.errnum).toBe(0)

    //获取cookie
    Z_COOKIE=response.header["set-cookie"].join(";");

})


test("wang登录应该成功",async()=>{
    let response=await server.post("/api/user/login").send({userName2,password2})
    
    expect(response.body.errnum).toBe(0)

    //获取cookie
    W_COOKIE=response.header["set-cookie"].join(";");

})


test("zhanghaifeng 创建一条微博＠ wang 应该成功",async()=>{
    let content="单元测试自动创建的微博 @wang";
    let response=await server
                .post("/api/weibo/create")
                .send({content})
                .set("cookie",Z_COOKIE)
    expect(response.body.errnum).toBe(0)

    //记录刚才创建的微博的id
    weibo_id=response.body.data.id;
})

// test("获取@ wang 的微博列表，应该有刚才创建的微博",async()=>{
//     let response=await server
//                 .get("/at-me") //因为逆序排列刚创建的微博在第一页。
//                 .set("cookie",W_COOKIE)
//     //这个测试没法写，因为 /at-me 路由指向的controller的方法并没有返回任何值。
//     //而是直接渲染了页面
// })


// test("获取@ wang 的微博列表，应该有刚才创建的微博",async()=>{
//     let response=await server
//                 .get("/at-me/loadMore/0") //因为逆序排列刚创建的微博在第一页。
//                 .set("cookie",W_COOKIE)
//     //这个测试没法写，因为/at-me/loadMore/0路由指向的controller的方法
//     //里使用了template_art，测试了会报错
//     
// })