为public添加了很多css javascript文件。
这是直接下载的。具体用处不清楚。随着学习的深入后面会懂


做一个404 网页。要看404 网页的代码。

404网页路由的写法，看 routes/veiw/error.js文件


输入一个不存在的路由进行测试
http://localhost:3000/lll




------------------------------------------------------
app.js 文件中 onerror 的使用方法。
具体看app.js 文件 这个是代码片段

// error handler
//线上环境的时候，如果出现错误就显示错误页面，开发环境下不需要
let errorPage={}
if(isPrd){
    errorPage={redirect: "/error"}    
}
onerror(app,errorPage)              //当网页报错的时候，启动localhost:3000/error路由



分别运行 npm run dev
        npm run prd
在不同环境下输入  localhost:3000/testError 
查看区别

dev 环境下localhost:3000/testError 页面会显示出错，但不会跳转页面

prd 环境下localhost:3000/testError 页面不显示任何东西，而是直接跳转到localhost:3000/error