/**
 * @description 加密方法
 * @author zhanghaifeng 
 * 
 */

 //自带的加密包
 const crypto= require("crypto")

 //其实也可以把这个项目中的密钥常量，取出来单独放到一个文件里面，并引用过来
 const CRYPT_SECRET_KEY="zhanghaifeng123456ooo@"

 /**
  * @description md5 加密
  * @param {string} password 密码
  */

 _md5=(password)=>{
    let md5=crypto.createHash("md5");
    //返回一个16（hex）进制的密码。
    return md5.update(password).digest("hex")
 }


 /**
  * @description 执行加密
  * @param {string} password 密码
  */

  docrypto=(password)=>{
      let str=`passowrd=${password}&key=${CRYPT_SECRET_KEY}`
      return _md5(str)
  }

  module.exports=docrypto