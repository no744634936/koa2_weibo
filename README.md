最新的微博都会显示在广场页面

广场页的所有信息都是一样的，数据大，请求多，所以有必要做一下缓存

将广场页面的数据放到redis缓存里面。
redis里面的缓存一两分钟过期一次，
一两分钟之内的话，数据就从redis里面取，这样可以减轻数据库的压力
然后一两分钟之后如果还有看新的数据再向数据库发起请求，


将每一页的数据都放到缓存。
redis 里的可以就会变成这样
"weibo:squarePage1_10"
"weibo:squarePage2_10"
"weibo:squarePage3_10"
"weibo:squarePage4_10"
"weibo:squarePage5_10"




//也写了广场页的loadmore 功能