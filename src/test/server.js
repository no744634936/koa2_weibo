
/**
 * @description jest server
 * @author zhang
 */

const request=require("supertest")                  //request 是一个函数。
const server=require("../app.js").callback();   //server就是app对象的callback()函数。
module.exports= request(server);