/**
 * @description 校验 json schema
 * @author zhanghaifeng 
 */


 const Ajv=require("ajv")
 const ajv=new Ajv({
    //  allErrors:true     //输出所有的错误(比较慢)
 })


 /**
  * @param {object} schema json schema的规则
  * @param {object} schema data 等待校验的数据
  */
 validate_data=(schema,data={})=>{
    let valid=ajv.validate(schema,data)

    //如果验证没有通过,就返回一个错误，如果通过了就不需要返回认识的东西
    if(!valid){
        return ajv.errors[0]   //返回数组里的第一个错误
    }
 }

 module.exports=validate_data