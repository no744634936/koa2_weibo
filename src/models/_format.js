/**
 * @description 数据的格式话。带下划线的文件都是内部文件
 * @author zhanghaifeng
 */

const{DEFAULT_USER_PICTURE}=require("../conf/constant.js")

_formatUserPicture=(obj)=>{
    if(obj.picture==null){
        obj.picture=DEFAULT_USER_PICTURE
    }
    return obj
}


module.exports={
    /**
     * @description 格式化用户信息
     * @param {Array|Object} list 用户列表或者单个用户对象
     */
    formatUserImg:(list)=>{
        if(list==null){
            return list
        }
        
        //如果时数组，用户列表
        if(list instanceof Array){
            return list.map(_formatUserPicture)
        }
        r
        //单个对象时
        return _formatUserPicture(list)
    }
}
