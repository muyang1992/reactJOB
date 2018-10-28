const express =require('express');
const Router=express.Router();
const models=require('./model');
const utils = require('utility');//用来使用md5来对密码进行加密处理
const User=models.getModel('user');
const Chat=models.getModel('chat');
//定义一个过滤条件，这样的话，在查询到数据的时候可以让不需要暴露的数据不显示
const _filter={'pwd':0,'__v':0};
// Chat.remove({},function(err,doc){

// });
Router.get('/list',function(req,res){
    // User.remove({},function(err,doc){}); //清楚所有的数据
    const {type}=req.query;
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc});
    });
});
Router.get('/getmsglist',function(req,res){
    const user=req.cookies.userid;
    // {'$or':[{from:user,to:user}]}//这个是传入参数的时候用来过滤聊天数据的一个查询条件
    User.find({},function(err,userdoc){
        let users={};
        userdoc.forEach(v=>{
            users[v._id]={name:v.user,avatar:v.avatar};
        });
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,users:users});
            }else{
                return res.json({code:1,msgs:'请求出错了'});
            }
        });
    });
});
Router.post('/login',function(req,res){
    const {user,pwd}=req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){//传入的参数，第一个是查询条件，第二个是显示条件
        //将{"pwd":0}将pwd参数设置为0表示，请求到结果之后不显示密码
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'});
        }
        res.cookie('userid',doc._id);//_id 是MongoDB自动生成的一个用户的唯一标识
        return res.json({code:0,data:doc});
        
    });
});
Router.post('/readmsg',function(req,res){
    const  userid=req.cookies.userid;
    const {from}=req.body;
    Chat.update({from,to:userid},{read:true},{'muti':true},function(err,doc){
        if(!err){
            return res.json({code:0,num:doc.nModified});
        }
        return res.json({code:1,msg:'修改失败'});
    });
});
Router.post('/register',function(req,res){
    const {user,pwd,type}=req.body;
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'});
        }else{
            const userModel=new User({user,type,pwd:md5Pwd(pwd)});
            userModel.save(function(err,doc){
                if(err){
                    return res.json({code:1,msg:'后端出错了'});
                }
                const {user,type,_id}=doc;//使用的是对象结构的语法
                res.cookie('userid',_id);
                return res.json({code:0,data:{user,type,_id}});
            });

        }
    });
});
Router.get('/info',function(req,res){
    const {userid}=req.cookies;
    if(!userid){
        return res.json({code:1});
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'});
        }
        if(doc){
            return res.json({code:0,data:doc});
        }
    });
});
Router.post('/update',function(req,res){
    const userid=req.cookies.userid;
    if(!userid){
        return json.dumps({code:1})
    };
    const body=req.body;
    User.findByIdAndUpdate(userid,body,function(err,doc){//findByIdAndUpdate函数是mogroose里面的api查找并更新
        const data=Object.assign({},{
            user:doc.user,
            type:doc.type,
        },body);
        return res.json({code:0,data});
    }); 
});

function md5Pwd(pwd){
    const salt='lixu_app_very_good_h13！@#￥%…………&（）*';//使用加盐的方式来增加密码的复杂度
    return utils.md5(utils.md5(pwd+salt));
}


module.exports=Router;