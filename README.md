login.html 跟 register.html 文件里面都有防抖功能


防抖的原理就是：
你尽管触发事件，但是我一定在事件触发 n 秒后才执行，
如果你在一个事件触发的 n 秒内又触发了这个事件，
那我就以新的事件的时间为准，n 秒后才执行，
总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，真是任性呐!

------------------------------------------------------------------------------





login.html 跟 register.html 文件
通过jquery来向后台请求跟发送用户输入的数据。





使用sequelize ，依次按顺序看完这几个文件。

src/conf/env.js             设置环境变量

src/conf/conf.js            放入数据库跟redis的配置信息

src/db/seq.js               建立sequelize的实例，传入数据库配置信息

src/db/types.js              封装sequelize的数据类型，写表的结构时更方便

src/db/tables/user_table.js  写表的结构

src/db/create_table.js        创建表

------------------------------------------------------

//写login 跟 register的路由
src\routes\api\user.js


//写login 跟 register的controller
src\controllers\user\UserApiController.js


//写login 跟 register的model
src\models\UserModel.js


//格式化信息,从数据库里取出的头像数据是null的时候，给他默认加一个头像的url。
  （用户注册时如果没有上传头像，就默认加一个头像的写法比较好。而不是在取出数据之后再加默认的头像）
src\models\_format.js


//常量都放在一个集合里面去
src\conf\constant.js


//写一个class来让api输出的内容有一个规范。因为是api所以需要一个错误code或者成功code
src\controllers\user\ApiResultFormat.js


//把所有api请求失败的信息都放到 一个文件里面
src\conf\errorInfo.js



这一章节就完成了一个功能，当用户在
http://localhost:3000/register 页面输入用户名的时候，显示，用户名可用 或者用户名不可用