/**
 * @description httpRequest test
 * @author zhang
 */

 const server=require("./server.js")

 //测试get请求
 test("api 接口返回数据格式正确",async()=>{
     const response=await server.get("/http_request");
     expect(response.body).toEqual({
        title: 'good good'
     })

     expect(response.body.title).toBe("good good");
 })


 //测试post请求,以后会学。
