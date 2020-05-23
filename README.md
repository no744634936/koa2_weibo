测试接口，现阶段就是测试登录与注册api 然后测试数据要及时删除。

--------------------------------------------------------------
查看 src\test\user_login.test.js 文件



//测试完register后，数据库里就会有一条testUser的测试数据，

//接着我用这条测试数据的 userName,password 来登录，

//登录之后就会生成一个cookie。

//然后我拿着这个cookie 来登录验证，使用delete_test_data路由，来删除添加的测试数据。

//所以我在 src\routes\api\user.js 文件里添加了一个delete_test_data路由，

//这个路由是在test环境下，而且必须登录之后才能执行，