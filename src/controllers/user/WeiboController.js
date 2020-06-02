
const WeiboModel=require("../../models/WeiboModel.js")
const {Success,Error}=require("./ApiResultFormat.js")
const{
    create_weibo_failed,
}=require("../../conf/errorInfo.js")
const xss=require("xss")
const UserModel=require("../../models/UserModel.js")



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
        let url_userName=ctx.params.userName
        let session_userName=ctx.session.userInfo.userName
        let current_userName=""
        let userInfo=""

        //如果url里的名字跟session里的名字同名可以确定事本人了
        let isMe=url_userName==session_userName
        if(isMe){
            userInfo=ctx.session.userInfo
            current_userName=ctx.params.userName
        }else{
            //如果不是本人就根据url里的名字从数据库中取出这个用户的基本信息
            userInfo=await UserModel.getUserInfo(url_userName)
            current_userName=userInfo.userName
        }

        let pageNum=1
        let pageSize=5
        let result=await WeiboModel.get_weibo_by_userName(current_userName,pageNum,pageSize)
        let weibo_list=result.weibo_list
        let count=result.count
        let isEmpty= weibo_list.length===0 ? true : false

        // console.log("---");
        console.log(weibo_list);
        
        
        await ctx.render("profile.html",{
            isEmpty,
            blogList:weibo_list,
            pageSize,
            pageIndex: pageNum,
            count,

            userInfo,
            isMe,
        })

    }
}

module.exports=new WeiboController();