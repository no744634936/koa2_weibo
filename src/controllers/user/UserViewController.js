class UserViewController{
    login=async(ctx,next)=>{
        //如果是登陆状态就提示，您已成功登录，请直接访问首页
        let data={isLogin:false}  //默认未登录
        let userInfo=ctx.session.userInfo
        if(userInfo){
            data={
                isLogin:true,
                userName:userInfo.userName,
            }
        }
        await ctx.render("login.html",data);
    }

    register=async(ctx,next)=>{
        await ctx.render("register.html");
    }
}

module.exports= new UserViewController();