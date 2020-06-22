1,制作@ 功能
有@别人的的功能，需要 https://github.com/zurb/tribute
可以打卡tribute_example 文件夹里的 index.html文件来测试使用方法。


2,
header.html 里面导入
    <link rel="stylesheet" href="css/tribute.css" />
    <script src="javascripts/tribute.js"></script>


3

<script>
getdata=async()=>{
   let response= await fetch("/api/user/getAtList")
   let data = await response.json()
   return data;
}

// async 方法返回的数据也只能在 async 方法里面用await 关键字取出
at_function=async()=>{

   let test=await getdata();
   console.log(test);

    var tributeMultipleTriggers = new Tribute({
        collection: [
          {
            // The function that gets call on select that retuns the content to insert
            selectTemplate: function(item) {
              if (this.range.isContentEditable(this.current.element)) {
                return (
                  item.original.value
                );
              }

              return "@" + item.original.value;
            },

            // the array of objects
            values:test,
          },
        ]
      });
    tributeMultipleTriggers.attach(document.getElementById("text-content"));
}
at_function();

</script>

4，写 '/api/user/getAtList'  路由


5，在首页的输入栏里面输入@ 就会出现 关注的人的列表。
