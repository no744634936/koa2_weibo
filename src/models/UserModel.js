/**
 * @description user model 调用输入
 * @author zhanghaifeng
 */

 const {User}=require("../db/tables/user_table.js")
 const {formatUserImg}=require("./_format.js")

 class UserModel{

     /**
      * @description 获取用户信息
      * @param {string} userName 用户名
      * @param {string} password 密码
      */
    getUserInfo=async(userName,password)=>{
        console.log(userName);
        
        //查询条件
        let whereOpt={
            userName:userName
        }

        //如果调用getUserInfo方法时有输入password那么就将password也放入查询条件
        if(password){
            Object.assign(whereOpt,{password:password})
        }

        let result=await User.findOne({
            attributes:["id","userName","nickName","picture","city"],
            where:whereOpt
        })

        if(result==null){
            //没找到
            return result
        }

        //找到了记录，并格式化数据
        return formatUserImg(result.dataValues);
    }
 }

 module.exports=new UserModel();