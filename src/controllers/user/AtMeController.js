
const AtRelationModel=require("../../models/AtRelationModel")
const template_art = require('art-template');
const path=require("path")


class AtMeController{
    get_at_me_weibo=async(ctx,next)=>{
        let {id:userId}=ctx.session.userInfo;

        //获取@我的微博的数量
        let atCount = await AtRelationModel.get_at_num(userId)

        //获取第一页的@我的微博的列表
        let pageNum=1;
        let pageSize=3;
        let result=await AtRelationModel.get_at_me_weibos(userId,pageNum,pageSize);

        let {weibo_list,count}=result;
        let isEmpty= weibo_list.length===0 ? true : false

        //将数据传给前端
        await ctx.render("at_me.html",{
            isEmpty,
            blogList:weibo_list,
            pageSize,
            pageNum: pageNum,
            count,
            atCount,    //@我的微博的数量

        })

        //这一页显示完后标记为已读，这段代码放在渲染前端页面之后。
        await AtRelationModel.weibo_is_readed(userId,pageNum,pageSize)
        


    }

    at_me_page_load_more=async(ctx,next)=>{
        let {pageNum}=ctx.params
        // 字符串转成数字
        pageNum=parseInt(pageNum);
        let {id:userId}=ctx.session.userInfo
        let pageSize=3
        let result=await AtRelationModel.get_at_me_weibos(userId,pageNum,pageSize);
        
        let file_path=path.join(__dirname,"..","..","views","components","blog-list.html")
        let html = template_art(file_path, {
            blogData:result.weibo_list
        });

        ctx.body={
            html:html,
            pageNum:pageNum
        }

        //这一页显示完后标记为已读
        await AtRelationModel.weibo_is_readed(userId,pageNum,pageSize)
    }
}

module.exports=new AtMeController();