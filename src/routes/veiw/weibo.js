/**
 * @description  微博页面相关的路由
 * @author zhanghaifeng
 */

const router=require("koa-router")();
const {loginRedirect}=require("../../validator/loginCheck.js")
const Weibo=require("../../controllers/user/WeiboController.js")

router.get("/",loginRedirect,Weibo.showTopPage)



module.exports=router