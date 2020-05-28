
//引入model
const userModel=require("../../models/UserModel.js")
const {Success,Error}=require("./ApiResultFormat.js")
const{
    user_name_exist_info,
    user_name_not_exist_info,
    register_failed_info,
    data_validataion_failed,
    login_failed_info,
    delete_test_data_failed,
    change_Info_failed,
}=require("../../conf/errorInfo.js")

const docrypto=require("../../my_tools/cryp.js")

const {isTest}=require("../../conf/env.js")

class UserApiController{
    /** 
     * 用户名是否存在
     */
    isExist=async(ctx,next)=>{

        let {userName}=ctx.request.body
        let userInfo=await userModel.getUserInfo(userName);
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
        let {userName,password,gender}=ctx.request.body
        
        let  userInfo=await userModel.getUserInfo(userName);
        
        if(userInfo){
            //用户名已存在
            ctx.body=new Error(user_name_exist_info)
            return  //必须return，不能执行下面的代码
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

    doLogin=async(ctx,next)=>{
        let {userName,password}=ctx.request.body
        let userInfo=await userModel.getUserInfo(userName,docrypto(password));
        if(userInfo){
            if(ctx.session.userInfo== null){
                console.log(userInfo);
                ctx.session.userInfo=userInfo
            }
            ctx.body= new Success();
        }else{
            //登录失败
            ctx.body=new Error(login_failed_info)
        }
    }

    deleteTestData=async(ctx,next)=>{
        //测试环境，测试登录账号后，删除测试的账号
        if(isTest){
            //测试环境下使用测试数据登录之后，取得保存在session里的用户名
            let {userName}=ctx.session.userInfo

            //然后删除之
            let result=await userModel.deleteTestData(userName)
            if(result){
                ctx.body= new Success();
            }else{
                //删除失败
                ctx.body=new Error(delete_test_data_failed)
            }
        }
    }
    editUserInfo=async(ctx,next)=>{
        console.log("haha");
        
        let {nickName,city,picture}=ctx.request.body
        
        let {userName}=ctx.session.userInfo
        if(!nickName){
            nickName=userName
        }

        let content={
            newNickName:nickName,
            newCity:city,
            newPicture:picture,
        }
        let condition={userName}

        let result=await userModel.updateUserInfo(content,condition)
        console.log(result);
        
        
        if(result){
            //如果修改成功，session里面的信息也得改
            Object.assign(ctx.session.userInfo,{
                nickName:nickName,
                city:city,
                picture:picture,
            })
            return new Success()
        }
        ctx.body=new Error(change_Info_failed)
    }
}

module.exports=new UserApiController();