/**
 * @description  微博页面相关的路由
 * @author zhanghaifeng
 */

const router=require("koa-router")();
const {loginRedirect}=require("../../validator/loginCheck.js")
const Weibo=require("../../controllers/user/WeiboController.js")
const AtMeController=require("../../controllers/user/AtMeController.js")

router.get("/",loginRedirect,Weibo.showTopPage)

//默认显示个人主页
router.get("/profile",loginRedirect,Weibo.showMyProfile)

//显示别人的个人主页
router.get("/profile/:userName",loginRedirect,Weibo.showProfile)

//显示广场页面
router.get("/square",loginRedirect,Weibo.showSquare)

//显示@我的微博页面

router.get("/at-me",loginRedirect,AtMeController.get_at_me_weibo)

module.exports=router