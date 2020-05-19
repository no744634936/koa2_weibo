class Base{
    constructor({errnum,data,message}){
        this.errnum=errnum
        if(data){
            this.data=data
        }
        if(message){
            this.message=message
        }
    }
}


/**
 * api求情成功时候的数据结构.
 * 成功时的errnum为0，返回数据
 */

 class Success extends Base{
     constructor(data={}){
        super({
            errnum:0,
            data:data
        })
     }
 }


class Error extends Base{
    //api错误时的错误code是不一样的，错误message也不一样
    constructor({errnum,message}){
        super({errnum,message})
    }
}

module.exports={
    Success,
    Error
}


//感觉写三个方法也可以完成上面的共能。
//上面又写class 又写 继承的很麻烦