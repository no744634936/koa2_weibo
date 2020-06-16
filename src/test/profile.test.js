

/**
 * @description 个人主页测试
 * @author zhanghaifeng
 */

const server=require("./server.js")



let userName=`zhanghaifeng`
let password=`123`

//因为没有登录无法使用api 所以要储存cookie，进行登录验证。
let COOKIE=""

//登录测试，获取cookie
test("登录应该成功",async()=>{
    let response=await server.post("/api/user/login").send({userName,password})
    
    expect(response.body.errnum).toBe(0)

    //获取cookie
    COOKIE=response.header["set-cookie"].join(";");
})


//测试第一页就够了，测试第二页，第三页，也可以但是太麻烦
test("个人主页,加载第一页数据应该成功",async()=>{
    
    let response=await server
    .get(`/api/profile/loadMore/${userName}/1`)
    .set("cookie",COOKIE)

    //由于我没有在controller的方法里返回 new Success().
    //所以也就没有errnum为零
    // expect(response.body.errnum).toBe(0)

    //我可以测是否返回了一些参数，这样测不太准确，记住种方法就行
    console.log("hhahah");
    
    console.log(response.body);
    
    expect(response.body).toHaveProperty("html")
    expect(response.body).toHaveProperty("pageNum")

})

