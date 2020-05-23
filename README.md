使用jest 编写单元测试

//开发环境使用jest ，加dev

npm install jest --save-dev   


//package.json 里面写上

"test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors"

--runInBand  表示测试代码一个一个执行

--forceExit 执行完之后强制退出

--colors   有颜色为了美观


// test文件夹里写 demo.test.js 文件。

  写入代码
  
  注意测试文件一定要以 .test.js结尾，否则不能运行




//最后执行test. 他是怎么找到test文件来执行的呢？

npm run test 


-----------------------------------
http请求测试

//安装supertest

npm install supertest --save-dev


//test 文件夹里建立了server.js 跟 httpRequest.test.js文件
