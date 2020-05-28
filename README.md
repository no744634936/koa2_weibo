setting.html 是使用 ajax来传递的文件，不是使用 cms项目那样用multer来传递数据的
setting.html 有使用  pulice/javascripts/my-ajax.js  里的upload方法来传递文件。



下载两个中间件。

//用来接收文件的中间件
npm install formidable-upload-koa --save


//下载  来操作文件
npm i fs-extra --save


用multer来传图片比较方便。
文件体积过大要删除这一点值得借鉴。


一般来说线上环境下用户图片这一类的资源应该放在 (文件服务/CDN)里面，查看照片 explain.jpg