/**
 * @description 登录验证
 * @author zhanghaifeng
 */

const {Success,Error}=require("../controllers/user/ApiResultFormat.js")
const {login_failed_info}=require("../conf/errorInfo.js")



/**
 * @description 当用户没有登录，直接访问localhost:3000/string
 *              或者 localhost:3000/json的时候，不让访问。
 */
 loginCheck=async(ctx,next)=>{
     if(ctx.session && ctx.session.userInfo){
         //已经登录
        await next()
        return 
     }

     //未登录
     ctx.body=new Error(login_failed_info)
 }


 /**
  * @description 这个功能是用来提高用户体验的，
  *              例如当用户在没有登录的情况下输入 localhost:3000/string 的时候，
  *              跳转到login页面，这是login页面的路由不是原本的(localhost:3000/login)
  *              而是，localhost:3000/login?url=xxxxxxxx
  *              xxxxxx 是使用encodeURIComponent 转码之后的效果
  *              当用户输入id 密码之后，就直接跳转到localhost:3000/string 
  *              (这里的跳转在login.html文件里面有写这个功能   var redirectUrl = $.query.get('url') || '/')
  *              而不用进到首页
  */

  loginRedirect=async(ctx,next)=>{
      
    if(ctx.session && ctx.session.userInfo){
        //已经登录
       await next()
       //必须写return 否则执行完下一个中间件之后就会执行未登录的代码
       return 
    }
    //未登录
    let current_url=ctx.url
    //encodeURIComponent 将url变成看不懂的字符
    ctx.redirect("/login?url="+encodeURIComponent(current_url))
  }



  // 这两个登录验证功能都差不多，
  // 与api相关的验证用loginCheck 。与页面相关的就使用 loginRedirect
  module.exports={
    loginRedirect,
    loginCheck
  }