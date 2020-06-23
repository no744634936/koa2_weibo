/**
 * @description 数据的格式话。带下划线的文件都是内部文件
 * @author zhanghaifeng
 */

const{DEFAULT_USER_PICTURE}=require("../conf/constant.js")
const sd = require('silly-datetime');


_dateFormat=(obj)=>{
    obj.createdAt=sd.format(obj.createdAt, 'YYYY-MM-DD HH:mm');
    return obj
}

_formatUserPicture=(obj)=>{
    if(obj.picture==null){
        obj.picture=DEFAULT_USER_PICTURE
    }
    return obj
}

_format_weibo_with_at=(obj)=>{

    // 给obj 添加一个 formatContent 属性。
    obj.formatContent=obj.content;

    //格式化 带有＠符号的微博
    // 将「 @zhanghaifeng 你好　」　这样的微博转换成
    //「<a href="/profile/zhanghaifeng">zhanghaifeng</a> 你好」这个样子
    // 用正则表达式 以@ 符号开头，中间有几个字符，以空格(\s)结尾,\b是什么意思不太懂。
    // /g是什么意思也不太懂。
    let parten=/@(.+?)\s/g          

    obj.formatContent=obj.formatContent.replace(
        parten,
        (matchStr,userName)=>{
            //userName 对应得就是，()里面得内容。
            //userName 对应的是 「 /@(.+?)\s\b/g　 」 里的括号里的内容
            //正则表达式「 /@(.+?)\s\b/g　 」里有几个（）就可以在matchStr后面写几个参数来将对应地内容取出来。
            return `<a href="/profile/${userName}">@${userName}</a>`
        }
    )
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
        //单个对象时
        return _formatUserPicture(list)
    },


        /**
     * @description 格式化时间信息
     * @param {Array|Object} list 列表或者单个用户对象
     */
    formatDateTime:(list)=>{
        if(list==null){
            return list
        }
        
        //如果时数组，用户列表
        if(list instanceof Array){
            return list.map(_dateFormat)
        }
        //单个对象时
        return _dateFormat(list)
    },


    //既可以格式化时间，又可以格式化带@的微博。
    formatWeibo:(list)=>{
        if(list==null){
            return list
        }
        
        //如果是一个object数组，
        if(list instanceof Array){
            return list.map(_dateFormat).map(_format_weibo_with_at)
        }
        //如果是单个object 时
        list=_dateFormat(list);           //先格式化时间
        list=_format_weibo_with_at(list); //再格式话带@的微博。

        return _dateFormat(list)
    }
}
