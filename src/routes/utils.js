/**
 * @description utils api 路由
 * @author  zhanghaifeng
 * 
 */


const router=require("koa-router")()
const {loginCheck}=require("../validator/loginCheck.js")
const koaForm=require("formidable-upload-koa")
const UtilsController=require("../controllers/UtilsController.js")


router.prefix("/api/utils")
router.get("/test",async(ctx,next)=>{
    ctx.body={
        test:"test"
    }
})

//传图片，只有在登录的情况下才能上传图片
//这里我就不把函数写到controller里面去了。
//图片经过koaForm() 的时候，图片被放在 一个临时的文件夹里了
router.post("/upload",loginCheck,koaForm(),UtilsController.uploadPicture)

module.exports = router
