使用这个项目的时候记得打开mysql 数据库跟redis


将验证抽离出来做中间件，不要把验证放在controller里面，而是把验证放在，路由中。


修改了src\validator\validate_userInfo.js 文件

我将数据验证做成了一个中间件 validate_userInfo 放到了 /register路由里面


router.post("/register",validate_userInfo,UserApiController.register)
