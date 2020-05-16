1,将sequlize对数据的删改查等操作都放到，db文件夹里面去

2，新建config文件夹来放不同环境下的reids跟squelize的配置。


(移动文件后我没有做测试，以后记得运行看看，有没有错误)



3，配置代码规范 eslint

npm install eslint babel-eslint --save-dev


4，建立　.eslintignore 文件来不检查文件里的语法规则


5，建立 .eslintrc.json 文件来添加语法规则。多人协同操作的时候保证语法统一。


6,在package.json 文件script里面写下这个命令

"lint" :"eslint --ext .js ./src",


--ext 是extention 后缀名的意思
在src文件夹中对.js文件做语法检查

7,查看项目中的文件是否符合语法规则

    npm run lint


8，下载 pre-commit ，文件语法没有修改完毕禁止github里commit 代码

 npm i pre-commit --save-dev


9,
在package.json 文件 里面写上
"pre-commit":["lint"]

它的意思是说在commit之前，要先执行npm run lint 命令，
如果有错误就不能提交代码。不能使用 git commit -m 命令。
在这里因为我是学习，所以语法要求不那么规范，我将"pre-commit":["lint"] 删掉

如果像要用pre-commit
的话要这样写
----------------------------------------------

{
  "name": "koa2_weibo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start": "node bin/www",
    "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
    "prd": "cross-env NODE_ENV=production pm2 start bin/www",
    "lint": "eslint --ext .js ./src",
    "test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors"
  },
  "dependencies": {
    "art-template": "^4.13.2",
    "debug": "^4.1.1",
    "koa": "^2.7.0",
    "koa-art-template": "^1.1.1",
    "koa-bodyparser": "^4.2.1",
    "koa-convert": "^1.2.0",
    "koa-generic-session": "^2.0.4",
    "koa-json": "^2.0.2",
    "koa-logger": "^3.2.0",
    "koa-onerror": "^4.1.0",
    "koa-redis": "^4.0.1",
    "koa-router": "^7.4.0",
    "koa-session": "^6.0.0",
    "koa-static": "^5.0.0",
    "koa-views": "^6.2.0",
    "mysql2": "^2.1.0",
    "redis": "^3.0.2",
    "save-dev": "0.0.1-security",
    "sequelize": "^5.21.7"
  },
  "devDependencies": {
    "babel-eslint": "^10.1.0",
    "cross-env": "^7.0.2",
    "eslint": "^7.0.0",
    "jest": "^26.0.1",
    "nodemon": "^1.19.1",
    "pre-commit": "^1.2.2",
    "supertest": "^4.0.2"
  },


  "pre-commit":["lint"]   //添加这一行命令
}