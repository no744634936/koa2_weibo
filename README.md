1，xss 过滤，当别人将，这段script代码当作微博发表这之后，
后台如果不做什么处理的，script代码就会原原本本地被放入数据库中。
cookie就可能被别人获取到。
<script>alert(document.cookie)</script>


//下载 xss 中间件

npm install xss --save


安装完之后，在将微博放入，数据库的时候，做些处理。
WeiboController 的 create方法里对content数据使用xss方法就可以了。


数据库里的script 代码就会变成这样
 &lt;script&gt;alert(document.cookie)&lt;/script&gt;




 2，对微博进行数据验证
 查看文件 validate/validate_weibo.js 就可以了
   
 

 