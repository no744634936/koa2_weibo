/**
 * @description  微博API相关的路由
 * @author zhanghaifeng
 */

const router=require("koa-router")();
const {loginRedirect,loginCheck}=require("../../validator/loginCheck.js")
const WeiboController=require("../../controllers/user/WeiboController.js")
const validate_weibo=require("../../validator/validate_weibo.js")

router.prefix("/api")

router.get('/test', async (ctx, next) => {
    ctx.body = {
      title: {data:"hahah"}
    }
})

router.post("/weibo/create",loginCheck,validate_weibo,WeiboController.create)

//load more function
router.get("/profile/loadMore/:userName/:pageNum",loginCheck,WeiboController.loadMore)

module.exports=router