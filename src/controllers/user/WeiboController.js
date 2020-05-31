
const WeiboModel=require("../../models/WeiboModel.js")
const {Success,Error}=require("./ApiResultFormat.js")
const{
    create_weibo_failed,
}=require("../../conf/errorInfo.js")
const xss=require("xss")


   
class WeiboController{
    showTopPage=async(ctx,next)=>{
        await ctx.render("index.html")
    }
    create=async(ctx,next)=>{
        let {content,image}=ctx.request.body
        //将session里的id 赋给userId，
        let userId=ctx.session.userInfo.id
        try{
            let weibo=await WeiboModel.createWeibo({
                userId,
                content:xss(content),
                image
            })
            //要将插入数据库的数据返回给前端，前端也许要拿着个这数据做些什么
            //所以将weibo当作参数了传进success里面去了
            ctx.body=new Success(weibo)
            return

        }catch(ex){
            console.error(ex.message,ex.stack)
            ctx.body=new Error(create_weibo_failed)
        }
    }
    showMyProfile=async (ctx,next)=>{
        let {userName}=ctx.session.userInfo
        ctx.redirect(`/profile/${userName}`)
    }

    showProfile= async(ctx,next)=>{

        await ctx.render("profile.html",{})
    }
}

module.exports=new WeiboController();