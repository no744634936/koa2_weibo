/**
 * @description  微博API相关的路由
 * @author zhanghaifeng
 */

const router=require("koa-router")();
const {loginRedirect,loginCheck}=require("../../validator/loginCheck.js")
const WeiboController=require("../../controllers/user/WeiboController.js")
const validate_weibo=require("../../validator/validate_weibo.js")

router.prefix("/api/weibo")
router.post("/create",loginCheck,validate_weibo,WeiboController.create)


module.exports=router