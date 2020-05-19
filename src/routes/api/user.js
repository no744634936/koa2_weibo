/**
 * @description user  API 路由
 * @author zhanghaifeng
 */


const router=require("koa-router")()
const UserApiController=require("../../controllers/user/UserApiController.js")

router.prefix("/api/user")

router.post("/register",UserApiController.register)

router.post("/isExist",UserApiController.isExist)

module.exports=router

//每次建立了路由就要在app.js里面注册一下。