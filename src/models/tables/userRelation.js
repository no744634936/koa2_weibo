/**
 * @description 关注与被关注表者得表
 * @author zhanghaifeng 
 */

const seq=require("../seq.js")
const { STRING, DECIMAL,INTEGER} = require('../types.js')

let UserRelation=seq.define("userRelation_test",{
    //follower 关注得 followee

    followerId:{
        type:INTEGER,
        allowNull:false,
        comment:"关注者ID"
    },
    followeeId:{
        type:INTEGER,
        allowNull:false,
        comment:"被关注者ID，"
    }
})

module.exports={
    UserRelation
}