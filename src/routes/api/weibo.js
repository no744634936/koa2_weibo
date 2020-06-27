/**
 * @description  微博API相关的路由
 * @author zhanghaifeng
 */

const router=require("koa-router")();
const {loginRedirect,loginCheck}=require("../../validator/loginCheck.js")
const WeiboController=require("../../controllers/user/WeiboController.js")
const validate_weibo=require("../../validator/validate_weibo.js")
const AtMeController=require("../../controllers/user/AtMeController.js")

router.prefix("/api")

router.post("/weibo/create",loginCheck,validate_weibo,WeiboController.create)

//load more function
router.get("/profile/loadMore/:userName/:pageNum",loginCheck,WeiboController.loadMore)

//关注功能
router.post("/profile/follow",loginCheck,WeiboController.follow)

//取消关注功能
router.post("/profile/unfollow",loginCheck,WeiboController.unfollow)



//广场页的loadmore
router.get("/square/loadMore/:pageNum",loginCheck,WeiboController.square_loadMore)


//首页的loadmore
router.get("/topPage/loadMore/:pageNum",loginCheck,WeiboController.top_page_load_more)

//@ 我的页面的loadmore功能
router.get("/at-me/loadMore/:pageNum",loginCheck,AtMeController.at_me_page_load_more)


module.exports=router