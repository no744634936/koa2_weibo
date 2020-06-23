格式化带有@ 的微博，也就是点击带有@zhanghaifeng 这样的文字时，
页面跳转到zhanghaifeng的主页
查看 @function.png 图片













与replace 函数相关的知识点
------------------------------------------------------------------------
let re = /(\w+)\s(\w+)/;
let str = 'John Smith';
let newstr = str.replace(re, '$2, $1');
console.log(newstr);  // Smith, John

正規表現の( )で囲んだグループは、「$1」「$2」という文字列で操作できるようになります。


---------------------------------------------------
我写的方法，

_format_weibo_with_at=(obj)=>{
    obj.formatContent=obj.content;

    //格式化 带有＠符号的微博
    // 将「 @zhanghaifeng 你好　」　这样的微博转换成
    //「<a href="/profile/zhanghaifeng">zhanghaifeng</a> 你好」这个样子
    // 用正则表达式 以@ 符号开头，中间有几个字符，以空格(\s)结尾,\b是什么意思不太懂。
    // /g是什么意思也不太懂。
    let parten=/@(.+?)\s\b/g

    obj.formatContent=obj.formatContent.replace(
        parten,
        (matchStr,userName)=>{
            //userName 对应得就是，()里面得内容。
            //正则表达式「 /@(.+?)\s\b/g　 」里有几个（）就可以在matchStr后面写几个参数来将队应得内容取出来。
            return `<a href="/profile/${userName}">@${userName}</a>`
        }
    )
}
-----------------------------------------------------
教学视频里的方法。

function _formatContent(obj) {
    obj.contentFormat = obj.content

    // 格式化 @
    // from '哈喽 @张三 - zhangsan 你好'
    // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'

    let REG_FOR_AT_WHO=/@(.+?)\s-\s(\w+?)\b/g

    obj.contentFormat = obj.contentFormat.replace(

        REG_FOR_AT_WHO,

        (matchStr, nickName, userName) => {

            //userName 对应得就是，()里面得内容。

            //正则表达式「 /@(.+?)\s\b/g　 」里有几个（）就可以在matchStr后面写几个参数来将队应得内容取出来。

            return `<a href="/profile/${userName}">@${nickName}</a>`

        }

    )

    return obj
}





----------------------------------------------------------------

<span><%- blog.formatContent%></span>

这里不能用 <%=  %> 必须用 <%-  %>  。否者会将a标签的连接内容显示出来。
----------------------------------------------------------------