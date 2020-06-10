
----------------------------------------------------------------

运行命令
node src/models/insert.js
输入数据


运行命令
node src/models/select.js
查询数据


连表查询


改

删

连接池。查看 seq.js



-------------------------------------------------------------------
建立表之间的关系的时候一定要注意foreignKey 是否写对了，否则sequelize会自动给表添加 userId 字段。

blog.belongsTo(author, { foreignKey: 'authorID',constraints: false});

author.hasMany(blog, { foreignKey: 'authorID',constraints: false});
