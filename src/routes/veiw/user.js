/**
 * @description  view里面跟user相关的路由
 * @author zhanghaifeng
 */

 const router=require("koa-router")();
 const UserViewController=require("../../controllers/user/UserViewController.js")
 const {loginRedirect}=require("../../validator/loginCheck.js")

 router.get("/login",UserViewController.login);

 router.get("/register",UserViewController.register);

 //用户设置页面
router.get("/setting",loginRedirect,UserViewController.setting)

 module.exports=router;