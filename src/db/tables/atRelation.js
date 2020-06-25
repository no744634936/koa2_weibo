/**
 * @description 微博 @ 用户的关系，数据模型
 * @author zhanghaifeng
 */


const seq=require("../seq.js")
const {BOOLEAN,INTEGER} = require('../types.js')

const AtRelation=seq.define("atRelation",{

    userId:{
        type:INTEGER,
        allowNull:false,
        comment:"用户id"
    },
    weiboId:{
        type:INTEGER,
        allowNull:false,
        comment:"微博id"
    },
    //sequelize 会自动将 isRead的值转换成1 和0 ，而不是true和false。
    isRead:{
        type:BOOLEAN,
        allowNull:false,
        defaultValue:false,
        comment:"微博是否已读"
    }
})

module.exports={
    AtRelation
}