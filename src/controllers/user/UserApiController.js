
//引入model
const userModel=require("../../models/UserModel.js")
const {Success,Error}=require("./ApiResultFormat.js")
const{
    user_name_exist_info,
    user_name_not_exist_info,
    register_failed_info,
    data_validataion_failed,
}=require("../../conf/errorInfo.js")

const docrypto=require("../../my_tools/cryp.js")
const validate_userInfo=require("../../validator/validate_userInfo.js")


class UserApiController{
    /** 
     * 用户名是否存在
     */
    isExist=async(ctx,next)=>{

        let {userName}=ctx.request.body
        let userInfo= await userModel.getUserInfo(userName);

        if(userInfo){
            //用户名存在
            //ctx.body={xxxxxxx} 是api返回数据的方式
            ctx.body= new Success(userInfo);
        }else{
            //用户名不存在
            ctx.body=new Error(user_name_not_exist_info)
        }
    }

    register=async(ctx,next)=>{
        //校验用户输入的数据，如果验证没通过返回的是一个err
        let err=validate_userInfo(ctx.request.body)
        if(err){
            ctx.body=new Error(data_validataion_failed)
            return // 程序不在执行
        }

        let {userName,password,gender}=ctx.request.body
        
        let  userInfo= await userModel.getUserInfo(userName);
        if(userInfo){
            //用户名已存在
            ctx.body=new Error(user_name_exist_info)
        }

        //创建数据的时候经常用try catch来做，因为有可能出错
        try {

            //在这里可以不传入nickName，虽然createUser方法的object里有nickName这个参数
            userModel.createUser({
                userName,
                password:docrypto(password),
                gender
            })
            ctx.body=new Success()   //返回 {errnum:0,{}}
        } catch (error) {
            //打印错误日志的时候会讲到
            console.error(error.message,error.stack);

            ctx.body=new Error(register_failed_info)
        }
    }
}

module.exports=new UserApiController();