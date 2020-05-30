/**
 * @description 微博数据格式验证
 * @author zhanghaifeng
 * 
 */

const validate_data=require("../validator/_validate.js")
const {Success,Error}=require("../controllers/user/ApiResultFormat.js")
const {data_validataion_failed}=require("../conf/errorInfo.js")


 // 校验规则 json schema
const SCHEMA = {
    type: 'object',
    properties: {
        content:{
            type:"string"
        },
        image:{
            type:"string",
            maxLength:255,
        }
    }
}


//执行校验
/**
 * @description 校验用户数据
 * 
 */

//中间件 中间件一定是async函数
validate_weibo=async(ctx,next)=>{

    //data为用户通过路由传递的数据
    let data=ctx.request.body
    let err=validate_data(SCHEMA,data)
    console.log(err);
    if(err){
        ctx.body=new Error(data_validataion_failed)
        return // 不再执行后面的程序
    }

    //验证通过进行下一步，使用controller里的方法进行逻辑处理
    await next()
}
module.exports=validate_weibo