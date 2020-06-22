/**
 * @description user  API 路由
 * @author zhanghaifeng
 */


const router=require("koa-router")()
const UserApiController=require("../../controllers/user/UserApiController.js")
const validate_userInfo=require("../../validator/validate_userInfo.js")
const {loginRedirect,loginCheck}=require("../../validator/loginCheck.js")

router.prefix("/api/user")

router.post("/register",validate_userInfo,UserApiController.register)

router.post("/isExist",UserApiController.isExist)

router.post("/login",UserApiController.doLogin)

//删除添加的测试数据 的路由post 一般用来新建数据，
router.post("/delete_test_data",loginRedirect,UserApiController.deleteTestData)

//patch 是修改的意思，补丁
router.patch("/changeInfo",loginCheck,validate_userInfo,UserApiController.editUserInfo)

router.patch("/changePassword",loginCheck,validate_userInfo,UserApiController.changePassword)

router.post("/logout",UserApiController.logout)

router.get("/getAtList",UserApiController.getFolloweeList)



module.exports=router

//每次建立了路由就要在app.js里面注册一下。