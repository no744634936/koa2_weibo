
输入
http://localhost:3000/profile
跳转到
http://localhost:3000/profile/:userName


如果，连接里的userName等于session里的userName，那么 查看的是自己的主页，
如果，连接里的userName不等于session里的userName 那么查看的就是他人的主页

g
根据userName取出blog数据，与user数据。这里用到了联表查询。


//测试用连接
注册两个用户zhanghaifeng 跟 wang，用这两个用户各发几条微博。
然后输入这连两个网址查看
http://localhost:3000/profile/zhanghaifeng
http://localhost:3000/profile/wang
