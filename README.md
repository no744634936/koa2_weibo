使用这个项目的时候记得打开mysql 数据库跟redis


将验证抽离出来做中间件，不要把验证放在controller里面，而是把验证放在，路由中。


修改了src\validator\validate_userInfo.js 文件

我将数据验证做成了一个中间件 validate_userInfo 放到了 /register路由里面


router.post("/register",validate_userInfo,UserApiController.register)


---------------------------------------------------------------------------
制作登录验证的中间件。放到index.js 文件里面了


1, 查看 src\validator\loginCheck.js
2, 查看 src\routes\index.js
3, 查看 src\views\login.html