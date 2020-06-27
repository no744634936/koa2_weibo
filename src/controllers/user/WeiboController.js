
const WeiboModel=require("../../models/WeiboModel.js")
const UserRelationModel=require("../../models/UserRelationModel.js")
const UserModel=require("../../models/UserModel.js")
const AtRelationModel=require("../../models/AtRelationModel")
const {Success,Error}=require("./ApiResultFormat.js")
const{
    create_weibo_failed,
    follow_failed,
    unfollow_failed,
}=require("../../conf/errorInfo.js")
const xss=require("xss")
const template_art = require('art-template');
const path=require("path")
const {formatWeibo}=require("../../models/_format.js")

class WeiboController{
    showTopPage=async(ctx,next)=>{
        let userInfo=ctx.session.userInfo;
        let {id}=userInfo;

        //获取粉丝列表
        let fans_result=await UserRelationModel.get_fans_list(id)
        //把结构出来的count重命名为fans_count
        let {count:fans_count,fans_list}=fans_result

        //获取我关注的人的列表
        let followee_result=await UserRelationModel.get_followee_list(id)

        //获取我自己的微博与我关注的人的第一页微博
        let pageNum=1
        let pageSize=3
        let result=await WeiboModel.get_followee_blog_list(id,pageNum,pageSize)
        
        let weibo_list=formatWeibo(result.followee_weibo_list)
        let count=result.count
        let isEmpty= weibo_list.length===0 ? true : false

        //获取@ 我的微博的数量
        let atCount = await AtRelationModel.get_at_num(id);
        
        await ctx.render("index.html",{
            //我自己的微博与我关注的人的微博，分页
            isEmpty,
            blogList:weibo_list,
            pageSize,
            pageNum: pageNum,
            count,
            atCount,    //@我的微博的数量

            //用户的数据
            userInfo,
            //粉丝列表数据
            fans_count,
            fans_list,
            //关注的人列表数据
            followee_count:followee_result.count,
            followee_list:followee_result.followee_list,
        })
    }
    create=async(ctx,next)=>{
        let {content,image}=ctx.request.body

        //分析并收集content中@到的人的id
        //content 格式如 hello @wang @li good morning
        let parten=/@(.+?)\s/g          
        let at_user_name_arr=[];

        content=content.replace(
            parten,
            (matchStr,userName)=>{
                //替换但不生效，目的仅仅是使用replace方法取出userName
                at_user_name_arr.push(userName)

                return matchStr //替换但不生效
            }
        )

        //根据at_user_arr 里的用户名查询用户信息

        //的到一个promise的数组。
        let at_user_promise=at_user_name_arr.map(userName=>UserModel.getUserInfo(userName))
        let at_user_arr=await Promise.all(at_user_promise)

        //根据用户信息获取用户id的数组
        let at_user_id_arr=at_user_arr.map(user=>user.id)
        

        //将session里的id 赋给userId，
        let userId=ctx.session.userInfo.id
        try{
            let weibo=await WeiboModel.createWeibo({
                userId,
                content:xss(content),
                image
            })

            // 将@到的人的id 和微博id 放进 atrelations 表里去。
            //一次性向数据库创建多条数据的时候，或者一次性取出多条数据的时候可以用promise.all
            let record_arr=await Promise.all(at_user_id_arr.map(
                userId=>AtRelationModel.create_at_relation(userId,weibo.id)
            ))
            
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
        
        let weibo_list=formatWeibo(result.weibo_list)
        let count=result.count
        let isEmpty= weibo_list.length===0 ? true : false

        //获取粉丝
        console.log(userInfo.id);
        
        let fans_result=await UserRelationModel.get_fans_list(userInfo.id)
        //把结构出来的count重命名为fans_count
        let {count:fans_count,fans_list}=fans_result


        //我是否关注了此人
        //如果当前主页的粉丝列表里有我，那么就显示取消关注，
        // 如果当前主页的粉丝列表里没有我，那么就显示关注
        //some 方法返回true或false
        let followed=fans_list.some(item=>{
            return item.userName==session_userName;
        })
        

        //获取我关注的人的列表
        let followee_result=await UserRelationModel.get_followee_list(userInfo.id)

        // console.log(followee_result);
        

        //获取@ 我的微博的数量
        let atCount = await AtRelationModel.get_at_num(ctx.session.userInfo.id);
        console.log("------------------------");
        console.log(atCount);

        await ctx.render("profile.html",{
            isEmpty,
            blogList:weibo_list,
            pageSize,
            pageNum: pageNum,
            count,
            atCount,

            userInfo,
            isMe,
            fans_count,
            fans_list,
            followed,

            followee_count:followee_result.count,
            followee_list:followee_result.followee_list,
        })

    }

    follow=async(ctx,next)=>{

        //被关注的用户的id，这个是从前端页面通过ajax传过来的
        let {curUserId:followeeId}=ctx.request.body
        
        //粉丝的id
        let {id:followerId}=ctx.session.userInfo
        try {
            let result= await UserRelationModel.create_relation(followerId,followeeId)
             ctx.body=new Success()
        } catch (error) {
            console.error(error);
            ctx.body=new Error(follow_failed)
        }

    }

    unfollow=async(ctx,next)=>{
        //被关注的用户的id，这个是从前端页面通过ajax传过来的
        console.log(ctx.request.body.curUserId);
        
        let {curUserId:followeeId}=ctx.request.body
        //粉丝的id
        let {id:followerId}=ctx.session.userInfo
        let result=await UserRelationModel.delete_relation(followerId,followeeId)
    
        //为什么follow 方法利用try catch 而这里却用if呢？
        if(result){
            ctx.body=new Success()
        }else{
            ctx.body=new Error(unfollow_failed)
        }
        
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
            blogData:formatWeibo(result.weibo_list)
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

        await ctx.render("square.html",{
            isEmpty,
            blogList:formatWeibo(result.weibo_list),
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
            blogData:formatWeibo(result.weibo_list)
        });

        ctx.body={
            html:html,
            pageNum:pageNum
        }
    }

    top_page_load_more=async(ctx,next)=>{
        //获取我自己的微博与我关注的人的第一页微博

        let {pageNum}=ctx.params
        // 字符串转成数字
        pageNum=parseInt(pageNum);
        
        let myUesrId=ctx.session.userInfo.id
        let pageSize=3
        let result=await WeiboModel.get_followee_blog_list(myUesrId,pageNum,pageSize)
        
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        
        console.log(result);
        
        
        let file_path=path.join(__dirname,"..","..","views","components","blog-list.html")
        let html = template_art(file_path, {
            blogData:formatWeibo(result.followee_weibo_list)
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