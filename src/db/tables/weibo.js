/**
 * @description 微博数据模型
 * @author zhanghaifeng
 */

const seq=require("../seq.js")
const { STRING,INTEGER,TEXT } = require('../types.js')

const Weibo=seq.define("weibo",{
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        comment: '图片地址'
    }
})

module.exports={Weibo}