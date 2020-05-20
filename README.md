http://localhost:3000/login


一个方法使用了一个异步(async)方法，那么获取返回值时一定要用await才行。

------------------------------------------------
userModel.getUserInfo() 是一个异步函数，尽管它返回的不是一个promise而是一个object
也必须使用await 来取这个 返回的object

    doLogin=async(ctx,next)=>{
        let {userName,password}=ctx.request.body
        let userInfo=await userModel.getUserInfo(userName,docrypto(password));
        console.log(userInfo);
        
        if(userInfo){
            if(ctx.session.userInfo==null){
                ctx.session.userInfo=userInfo
            }
            ctx.body= new Success();
        }else{
            //登录失败
            ctx.body=new Error(login_failed_info)
        }
    }



------------------------------------------------


登录功能，登录成功后将用户数据放入redis缓存里面去。

