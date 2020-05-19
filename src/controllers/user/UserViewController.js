class UserViewController{
    login=async(ctx,next)=>{
        await ctx.render("login.html");
    }
    register=async(ctx,next)=>{
        await ctx.render("register.html");
    }
}

module.exports= new UserViewController();