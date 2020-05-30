const server=require("./server.js")


//用户民信息,用来做测试的账号跟密码。我自己提前新建的账号跟密码
//因为每次使用sequelize建表的时候，表里的数据都会消失，所以需要跟新表之后及时建立这个账号
//userName:  zhanghaifeng 
//password:  123

let userName=`zhanghaifeng`
let password=`123`


//因为没有登录无法使用api 所以要储存cookie，进行登录验证。
let COOKIE=""

//后面也许还会根据weiboId来测试
let weiboId=""



//登录测试，获取cookie
test("登录应该成功",async()=>{
    let response=await server.post("/api/user/login").send({userName,password})
    console.log("--------------------------------------")
    console.log(response.body);
    
    expect(response.body.errnum).toBe(0)

    //获取cookie
    COOKIE=response.header["set-cookie"].join(";");
})

// 这个接口要登陆才能验证
test("创建一条微博应该成功",async()=>{
    let content="单元测试创建的微博"
    let image="/xxx.jgp"
    let response=await server
        .post("/api/weibo/create")
        .send({
            content,
            image
        })
        .set("cookie",COOKIE)

    ///api/weibo/create 这个接口如果创建了微博，会返这个微博的所有信息
    expect(response.body.errnum).toBe(0)
    expect(response.body.data.content).toBe(content)
    expect(response.body.data.image).toBe(image)

    //给weiboid 赋值
    weiboId=response.body.data.id
})