//链接mongo 并且使用imooc 这个集合
const mongoose=require('mongoose');
const DB_URL="mongodb://127.0.0.1:27017/lixuapp-chart";//这地址是在启动MongoDB的时候控制台自己打印出来的链接地址

mongoose.connect(DB_URL);

const models={
    user:{
        'user':{'type':String,'require':true},
        'pwd':{'type':String,'require':true},
        'type':{'type':String,'require':true},
        //头像
        'avatar':{'type':String},
        //个人简介或者职位简介
        'desc':{'type':String},
        //职位名（牛人或者boss）
        'title':{'type':String},
        //如果是boss还有两个字段
        'company':{'type':String},
        'money':{'type':String}
    },
    chat:{
        'chatid':{'type':String},
        'from':{'type':String,'require':true},
        'to':{'type':String,'require':true},
        'read':{'type':Boolean,'default':false},
        'content':{'type':String,'rquire':true,'default':''},
        'create_time':{'type':Number,'default':new Date().getTime()}
    }
};

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m])); //批量新家数据模型
}
module.exports={
    getModel:function(name){
        return mongoose.model(name);//直接将模块名返回出来
    }
}