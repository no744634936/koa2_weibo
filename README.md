
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





//只有在删除测试结束之后，在测试 退出登录功能。
//因为删除测试有个登录验证，session必须存在，所以必须将session的删除放在最后执行

test("退出登录应该成功",async()=>{
    let response=await server
    .post("/api/user/logout")
    .set("cookie",COOKIE)
    expect(response.body.errnum).toBe(0)
})



上传图片没有做测试，好像也不能测试