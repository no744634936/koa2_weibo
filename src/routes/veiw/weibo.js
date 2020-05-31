/**
 * @description  微博页面相关的路由
 * @author zhanghaifeng
 */

const router=require("koa-router")();
const {loginRedirect}=require("../../validator/loginCheck.js")
const Weibo=require("../../controllers/user/WeiboController.js")

router.get("/",loginRedirect,Weibo.showTopPage)

//默认显示个人主页
router.get("/profile",loginRedirect,Weibo.showMyProfile)

//显示别人的个人主页
router.get("/profile/:useName",loginRedirect,Weibo.showProfile)



module.exports=router