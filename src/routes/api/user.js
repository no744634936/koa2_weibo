/**
 * @description user  API 路由
 * @author zhanghaifeng
 */


const router=require("koa-router")()
const UserApiController=require("../../controllers/user/UserApiController.js")
const validate_userInfo=require("../../validator/validate_userInfo.js")
const {loginRedirect}=require("../../validator/loginCheck.js")

router.prefix("/api/user")

router.post("/register",validate_userInfo,UserApiController.register)

router.post("/isExist",UserApiController.isExist)

router.post("/login",UserApiController.doLogin)


//
router.post("/delete_test_data",loginRedirect,UserApiController.deleteTestData)




module.exports=router

//每次建立了路由就要在app.js里面注册一下。