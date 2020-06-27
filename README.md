

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

查看这个分页api
//@ 我的页面的loadmore功能
router.get("/at-me/loadMore/:pageNum",loginCheck,AtMeController.at_me_page_load_more)


----------------------------------------------------

标记为已读
标记为已读是一页一页地标记。

查看 await AtRelationModel.weibo_is_readed(userId,pageNum,pageSize)
方法
