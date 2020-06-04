加载更多，后端渲染，后端根据数据返回一个带数据的html字符串
前端显示这个字符串
前端渲染的意思是说，后端将数据传给前端，前端在将数据放到html里面。


点击加载更多，触发路由
localhost:3000/profile/loadMore/:userName/:pageNum



--------------------------------

对时间戳的处理有两种方法，
一种就是在前端页面使用art-template提供的过滤器
像这样
{{blog.createdAt|dateFormat}} 
但是，
当我想将一个html文件读取到后台，然后将数据放入html，最后返回前端的时候。

就像这样
let file_path=path.join(__dirname,"..","..","views","components","blog-list.html")

var html = template(file_path, {
    testValue: 'zhanghaifeng'
});

过滤器无法被读取到后端。


blog-list.html文件里有一个过滤器 
{{blog.createdAt|dateFormat}} 
来将时间戳转换成一定格式的字符串
但是
这个template() 方法无法读取blog-list.html文件里的过滤器。
所以对时间的处理要在后端解决。




查看与 loadmore 路由有关的个种方法与页面

//load more function
router.get("/profile/loadMore/:userName/:pageNum",loginCheck,WeiboController.loadMore)
