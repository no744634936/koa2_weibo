const {Success,Error}=require("./user/ApiResultFormat.js")
const{
    upload_file_failed
}=require("../conf/errorInfo.js")

const fse=require("fs-extra")
const pathHelper=require('path')

class UtilsController{
    uploadPicture=async(ctx,next)=>{
        
        let  file=ctx.req.files["file"]

        let {size,path,name,type}=file

        let MAX_SIZE=1024*1024*1024   // 1M

        //文件体积过大
        if(size>MAX_SIZE){
            //因为文件已经上传了，所以要删除掉文件，
            //所有的文件操作都是异步的所以要用await
            await fse.remove(path)
            ctx.body=new Error(upload_file_failed)
            return
        }

        //给文件命名
        let fileName=`${Date.now()}.${name}`

        //图片经过koaForm() 的时候，图片被放在 一个临时的文件夹里了

        //目的地
        let distFile=pathHelper.join("uploadPicture/",fileName)
        
        //将文件从原来的地方移动到，目的地
        await fse.move(path,distFile)

        //返回信息 {errnum:0,data:{url:"/2.jpg"}}
        //因为是根目录下的图片 localhost:3000/2.jpg
        //前端页面需要拿到url来显示图片
        console.log(new Success({ 
            url:"/"+fileName
        }));
        
        ctx.body=new Success({ url:"/"+fileName})
    }
}

module.exports=new UtilsController()