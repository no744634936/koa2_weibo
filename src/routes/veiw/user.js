/**
 * @description  view里面跟user相关的路由
 * @author zhanghaifeng
 */

 const router=require("koa-router")();
 const UserViewController=require("../../controllers/user/UserViewController.js")

 router.get("/login",UserViewController.login);

 router.get("/register",UserViewController.register);

 module.exports=router;