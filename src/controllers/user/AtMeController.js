
const AtRelationModel=require("../../models/AtRelationModel")


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

        //标记为已读，这段代码放在渲染前端页面之后。

    }
}

module.exports=new AtMeController();