
const WeiboModel=require("../../models/WeiboModel.js")
const {Success,Error}=require("./ApiResultFormat.js")
const{
    create_weibo_failed,
}=require("../../conf/errorInfo.js")
const xss=require("xss")
const UserModel=require("../../models/UserModel.js")
const template_art = require('art-template');
const path=require("path")
const {formatDateTime}=require("../../models/_format.js")



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
        let pageSize=3
        let result=await WeiboModel.get_weibo_by_userName(current_userName,pageNum,pageSize)
        
        let weibo_list=formatDateTime(result.weibo_list)
        let count=result.count
        let isEmpty= weibo_list.length===0 ? true : false

        // console.log("---");
        //console.log(weibo_list);
        
        
        await ctx.render("profile.html",{
            isEmpty,
            blogList:weibo_list,
            pageSize,
            pageNum: pageNum,
            count,

            userInfo,
            isMe,
        })

    }

    test=()=>{
        let string=path.join(__dirname,"..","..","views","components","blog-list.html")

        var html = template(string, {
            testValue: 'zhanghaifeng'
        });
        // console.log(html);
        
    }

    loadMore=async(ctx,next)=>{
        let {userName,pageNum}=ctx.params
        // 字符串转成数字
        pageNum=parseInt(pageNum)
        
        let pageSize=3
        let result=await WeiboModel.get_weibo_by_userName(userName,pageNum,pageSize)
        
        let file_path=path.join(__dirname,"..","..","views","components","blog-list.html")
        let html = template_art(file_path, {
            blogData:result.weibo_list
        });
        
        ctx.body={
            html:html,
            pageNum:pageNum
        }
    }

    showSquare=async(ctx,next)=>{
        //只取出第一页数据
        let pageNum=1
        let pageSize=10
        let result=await WeiboModel.get_all_weibo({pageNum,pageSize})
        let isEmpty= result.length===0 ? true : false

        //对时间的处理formatDateTime应该放在model层来做的
        await ctx.render("square.html",{
            isEmpty,
            blogList:formatDateTime(result.weibo_list),
            pageSize,
            pageNum: pageNum,
            count:result.count
        })
    }


    square_loadMore=async(ctx,index)=>{
        let {pageNum}=ctx.params
        // 字符串转成数字
        pageNum=parseInt(pageNum);
        let pageSize=10
        let result=await WeiboModel.get_all_weibo({pageNum,pageSize})

        let file_path=path.join(__dirname,"..","..","views","components","blog-list.html")
        let html = template_art(file_path, {
            blogData:result.weibo_list
        });

        ctx.body={
            html:html,
            pageNum:pageNum
        }
    }

}

// let a=new WeiboController();
// a.loadMore().then(data=>console.log(data));

module.exports=new WeiboController();