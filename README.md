因为上一次写cms系统的时候，是从零开始配置各种文件的很麻烦，所以这次使用
koa脚手架来快速生成项目
端口在 bin/www文件里的
var port = normalizePort(process.env.PORT || '3000');
可以用更改端口



npm install -g koa-generator (全局安装一个电脑只需要安装一次。)

koa2 -e koa2_weibo      (-e 表示用的是ejs模板引擎koa2_weibo　是项目名。)

npm install