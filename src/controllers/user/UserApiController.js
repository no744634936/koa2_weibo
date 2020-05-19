
//引入model
const userModel=require("../../models/UserModel.js")
const {Success,Error}=require("./ApiResultFormat.js")
const{
    user_name_exist_info
}=require("../../conf/errorInfo.js")

class UserApiController{
    /** 
     * 用户名是否存在
     */
    isExist=async(ctx,next)=>{

        let {userName}=ctx.request.body
        let userInfo= await userModel.getUserInfo(userName);

        if(userInfo){
            //用户名存在

            //返回的数据就是{errnum:0,data:{xxxxxxxxxxxxxx}}
            // ctx.body={
            //     errnum:0,data:{xxxxxxxxxxxxxx}
            // }
            ctx.body= new Success(userInfo);
        }else{
            //用户名不存在
            // return new Error({
            //     errnum:10003,
            //     message:"用户名不存在"
            // })
            //返回的数据就是{errnum:10003,message:"用户名不存在"}
            //由于存在很多api请求错误信息，所以要把错误信息抽出来，放进一个文件夹里去。
            // ctx.body={
            //     errnum:10003,message:"用户名不存在"
            // }

            ctx.body=new Error(user_name_exist_info)
        }

    }
}

module.exports=new UserApiController();