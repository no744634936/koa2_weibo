1, 安装pm2

本地环境使用 nodemon
服务器上使用 pm2
本地环境也可以安装 PM2

npm install pm2 -g


2, 启动服务,
  npm run prd
  
  pm2 是后台运行。使用 pm2 list 来查看是否在运行
  使用的是服务器的 数据库 和redis 的配置。而不是本地的数据库与redis的配置

3，重启
   pm2 restart 0 
   或则
   pm2 restart www

    0 为id
    www 为name

4，停止
  pm2 stop 0


5,删除
 pm2 delete 0


6，删除之后重新建立一个进程
  npm run prd


7.pm2 info 
  可以查看一些日志啊，版本等信息

8, 查看最新的15 行日志。
  pm2 log 0


9, 可以查看内存，实时的变化
  pm2 monite 0

10,pm2 有进程守护的功能
  当某个网页出现错误时，其他网页可以正常运行


11， 线上环境下，修改了文件之后，要重启才行，它不是像nodeon 那样自动重启。
-------------------------------------------------------------------------

pm2 的配置

1，建立一个配置文件 pm2.conf.json


{
    "apps":{
        "name":"weibo",          // 将name改从www 改为weibo
        "script":"bin/www",      //这个不能变
        "watch":true,            //文件更改之后，线上系统自动重启
        "ignore_watch":[       
            "node_modules",      //node_modules 文件夹里的文件更改的时候，不重启
            "logs",              // logs  文件夹里的文件更改的时候，不重启
            "uploadPicture"      // 报存上传的文件的 uploadPicture 文件夹里的文件更改时不重启
        ], 
        "instances":4,            //服务器cpu是几核s，就定几个，4个进程
        "error_file":"./logs/err.log"          //手动建立logs 文件夹，err.log自动建立
        "out_file":"./logs/out.log",           //打印正常的日志
        "log_date_format":"YYYY-MM-DD HH:mm:ss"   //给每个日志前面加上时间戳
    }ss
}



2, 修改 packag.json 文件里的命令

"prd": "cross-env NODE_ENV=production pm2 start bin/www",


改为

"prd": "cross-env NODE_ENV=production pm2 start pm2.conf.json",


3, 重新启动新进程
pm2 stop 0
pm2 delete 0
npm run prd



4, 故意制作一个错误
   浏览器里输入
   http://localhost:3000/api/user/throwError
   就可以看到 error被打印进了错去日志

router.get("/throwError",async(ctx,next)=>{
    throw Error();
    ctx.body={
        test:"hahaha"
    }
})


5,
一个进程的最大内存数量，32位操作系统0.7G  64位操作系统1.4G
如果一个服务器有8G内存，你只开一个进程就是对服务器内存的浪费


6，因为进程与进程之间无法通信，所以如果将session保存在内存里，
   而又用了多个进程，那么session就可能存在一个不同的进程里面。
   我的操作是靠一个进程，可是session存放在另一个进程里面。
   那么session就找不到。
   所以要将session等信息放入第三方redis里面。



nginx 代理的功能

1，静态文件服务器

2，负载均衡，

3，反向代理


1，下载 nginx

2，修改配置文件 找到nginx.conf 文件，(windows 跟 linux 系统存储文件的地点不一样)


3，
    查看我放进这个项目里的 exampleexample_nginx.conf  文件。
    可以看到有以下内容。

    listen       80;
    server_name  localhost;
    location / {
        proxy_pass http://localhost:3000;
    }

    这几句话的意思是说当用户在浏览器输入 localhost 的时候
    会自动跳到 http://localhost:3000 去

    如果listen 后面是81 那么要在浏览器输入 localhost:81 
    才能自动跳到 http://localhost:3000 去

    ------------------------------------------------------------------------
    修改access log(访问日志)的存放的位置

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                     '$status $body_bytes_sent "$http_referer" '
                     '"$http_user_agent" "$http_x_forwarded_for"';

    access_log koa2_weibo/logs/access.log  main;



4， 常用命令
nginx -t     修改完配置文件后，检查配置文件是否正确

nginx        启动nginx

nginx -s reload   改了配置文件之后重启

--------------------------------------------------------------------------------------------------
日志

access log : 访问日志 使用nginx，不推荐使用node.js来记录access log
             因为access log有可能被分开成多个文件。到时候还得合并访问日志

error log  : 错误日志就使用 pm2 ，用 console.error()打印错误日志

