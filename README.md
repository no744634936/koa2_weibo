

----------------------------------------------------
查看@ 我的微博的页面。
查看@我微博的页面.png 图片

----------------------------------------

查看与这个路由相关的controller 与 model


//显示@我的微博页面
router.get("/at-me",loginRedirect,AtMeController.get_at_me_weibo)
----------------------------------------
需要写分页功能的时候，后台先把第一页数据渲染到前端页面，
然后，前端页面传页码给后台，后台再写分页功能。