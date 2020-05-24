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

    setting=async(ctx,next)=>{
        //用户的基本信息，注意如果没有更改头像，之里面包含了一个默认头像连接，
        console.log(ctx.session.userInfo);
        await ctx.render("setting.html",ctx.session.userInfo)
    }
}

module.exports= new UserViewController();