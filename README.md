@ 功能跟回复功能是前端的没有办法测，
就测@列表 功能



在 test_follower_followee.test.js 文件里 写上这个方法


//获取 zhanghaifeng的 @ 列表,也就是获取，zhanghaifeng关注的人
test("获取zhanghaifeng 的@列表，应该有wang",async()=>{
    
    const response=await server
                .get("/api/user/getAtList")
                .set("cookie",COOKIE)

    
    let atList=response.body;
    let hasUsername=atList.some(item=>{
        return item.value===userName2;
    })
    expect(hasUsername).toBe(true);
})