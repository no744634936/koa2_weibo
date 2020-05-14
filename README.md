环境变量的设置


--------------------------------------------------------------------------------
  "scripts": {
    "start": "node bin/www",
    "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
    "prd": "cross-env NODE_ENV=production pm2 start bin/www",
    "test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors"
  },



package.json 文件中的scripts object里有  四个key，分别对应

npm run start  (使用 node bin/www 来启动项目，这时项目运行于什么环境不知道。也没用。
               平时开发的时候就 用npm run dev 就行了)

npm run dev    (使用nodemon来启动项目，这时项目运行于开发环境，使用开发环境的配置
                ./node_modules/.bin/nodemon bin/www)

npm run prd    (使用 pm2来运行项目，这时项目运行于运营环境(线上环境)，使用运营环境的配置  
                pm2 start bin/www)

npm run test   (使用jest来运行根目录里的文件夹里的所有以.test.js结尾的文件。
                "cross-env NODE_ENV=test jest --runInBand --forceExit --colors")


四个命令。
-----------------------------------------------------------------------------------
使用 process.env.NODE_ENV 可以获得现在运行环境变量的数值。


npm run dev 
输入　localhost:3000/env_test

就可以看到 运行环境是 dev


npm run prd
输入　localhost:3000/env_test

就可以看到 运行环境是 production


-----------------------------------------------------------------------------------



全局安装pm2 :   npm install -g pm2

真正上线时用pm2 运行项目

    npm run prd

使用这个命令来停止运行项目

    pm2 stop C:\Users\zhang\Desktop\koa2_weibo\bin\www 


------------------------------------------------------------------

PM2とは、Node.js製のWebアプリケーションを動かすための仕組みの一つです。例えば、Express4な

どで作成したアプリ（app.js）を動かしたい場合に普通だと、

$ node app.js として起動しますが、PM2を用いると、

$ pm2 start app.js のような形式でWebサービスを起動することができます。

node app.jsでの起動は非常にシンプルですが、以下のような問題点があります。

・基本的にはCPU1コアしか使えず、マルチコアに対応するのに手間がかかる

・ログ出力や状態チェックなど自前で作る必要がある

・その他、本番運用のための細かな手間がある

などなど。PM2を用いると、例えばCPUコア数を自動的に考慮して複数インスタンスを起動してくれる

など、便利な点が多いです。


