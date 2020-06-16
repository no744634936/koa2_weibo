/**
 * @description 粉丝列表与关注人列表的测试
 * @author zhanghaifeng
 */

const server=require("./server.js")
//因为没有api，来获取粉丝列表跟关注的人的列表，所以只能用model里面的函数
const UserRelationModel=require("../models/UserRelationModel.js");



//因为要测试关注与被关注，所以要用到两个用户，确保数据库里有这两个用户的信息
let id1=1;
let userName=`zhanghaifeng`
let password=`123`

let id2=2;
let userName2="wang";
let password2="123"

//因为没有登录无法使用api 所以要储存cookie，进行登录验证。
let COOKIE=""

//登录测试，用zhanghaifeng 先取登录，获取cookie
test("登录应该成功",async()=>{
    let response=await server.post("/api/user/login").send({userName,password})
    
    expect(response.body.errnum).toBe(0)

    //获取cookie
    COOKIE=response.header["set-cookie"].join(";");
})


//这是一个准备数据的过程
//先让zhanghaifeng 取消关注wang ，为了避免zhanghaifeng 已经关注了wang
// zhanghaifeng 登录取取消关注wang
test("无论如何，zhanghaifeng 取消关注wang应该成功",async()=>{
    const response=await server
                   .post("/api/profile/unfollow")
                   .send({curUserId:id2})
                   .set("cookie",COOKIE)
    expect(1).toBe(1);    //不管怎么样，先让zhanghaifeng去取消关注wang。都是成功的。expect(1).toBe(1); 没有什么意义
});


//添加关注
test("zhanghaifeng 关注王应该成功",async()=>{
    const response=await server
                    .post("/api/profile/follow")
                    .send({curUserId:id2})
                    .set("cookie",COOKIE)
    expect(response.body.errnum).toBe(0);
})

//获取粉丝，获取李四的粉丝

test("获取wang的粉丝，应该有zhanghaifeng",async()=>{
    let fans_result=await UserRelationModel.get_fans_list(id2);
    let {count,fans_list,}=fans_result;

    //查看粉丝列表里面有没有zhanghaifeng
    let hasUsername=fans_list.some(faninfo=>{
        return faninfo.userName===userName;
    })

    expect(count>0).toBe(true);
    expect(hasUsername).toBe(true);
})


//获取关注人列表，zhanghaifeng关注的人
test("获取zhanghaifeng 关注的人，应该有wang",async()=>{
    let followee_result=await UserRelationModel.get_followee_list(id1);
    let { count,followee_list}=followee_result;

    let hasUsername=followee_list.some(faninfo=>{
        return faninfo.userName===userName2;
    })
    
    
    expect(count>0).toBe(true);
    expect(hasUsername).toBe(true);
})


//取消关注

test("zhanghaifeng 取消关注wang应该成功",async()=>{
    const response=await server
                   .post("/api/profile/unfollow")
                   .send({curUserId:id2})
                   .set("cookie",COOKIE)
    expect(response.body.errnum).toBe(0);
});
