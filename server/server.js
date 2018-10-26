const express=require('express');

const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const userRouter=require('./user');
const app=express();
const models=require('./model');
const Chat=models.getModel('chat');
//worker with express
// 现将现有的express实例app 使用HTTP模块包裹一下
const server=require('http').Server(app);
//然后将包裹之后的server变量传入socket.io
const io=require('socket.io')(server);

io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        console.log(data);
        const {from,to,msg}=data;
        const chatid=[from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            console.log('调用派发事件');
            io.emit('recvmsg',Object.assign({},doc._doc));//派发一个全局事件
        });
    });
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);
// app.listen(9093,function(){
//     console.log("Node app start at port 9093");
// });
//最后使用server来监听端口
server.listen(9093,function(){
    console.log('node app start at port 9093');
});