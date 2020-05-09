这是一个自己配置的属于自己的脚手架

因为上一次写cms系统的时候，是从零开始配置各种文件.
还必须手动ctrl 加 alt 加 n 来开启app.js很麻烦，
所以这次使用
koa脚手架来快速生成项目
端口在 bin/www文件里的
var port = normalizePort(process.env.PORT || '3000');
可以用更改端口



npm install -g koa-generator (全局安装一个电脑只需要安装一次。)

koa2 -e koa2_weibo      (-e 表示用的是ejs模板引擎koa2_weibo　是项目名。)

npm install



感觉ejs难用，所有删除ejs 使用art-template 模板引擎

npm uninstall ejs --save


app.js 文件里删掉这俩个部分

const views = require('koa-views')

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


导入art-template模板


----------------------------------------------------------
配置环境

npm install --save-dev cross-env

在package.json 里面将

    "dev": "./node_modules/.bin/nodemon bin/www",
    "prd": "pm2 start bin/www",

    改成

    "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
    "prd": "cross-env NODE_ENV=production pm2 start bin/www",


至于怎么用，后面会解释。

调整一下文件结构 将 public，controller， model，view，route app.js 文件夹放入src文件夹里

然后将 bin/www 文件里的
var app = require('../app');

改为

var app = require('../src/app');

localhost:3000/ 运行的就是app.js这个文件。