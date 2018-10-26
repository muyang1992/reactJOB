import React from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';
@connect(
    state=>state
)
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1];
    }
    render(){
        const Item=List.Item;
        const Brief=Item.Brief;
        //根据聊天用户的chatid来对聊天消息进行分组
        const msgGroup={};
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid]=msgGroup[v.chatid]||[];//给对象添加默认属性值
            msgGroup[v.chatid].push(v);//将对应的数据添加到对应的对象上去
        });
        // const chatList=Object.values(msgGroup);//将对象的转为一个名值对的数组
        const userid=this.props.user._id;
        const userinfo=this.props.chat.users;
        const chatList=Object.values(msgGroup).sort((a,b)=>{
            const a_last=this.getLast(a).create_time;
            const b_last=this.getLast(b).create_time;
            return b_last - a_last;
        });//根据聊天的最后时间来对聊天列表进行排序，最上面显示最新消息列表

        return (
            <div>
                
                    {chatList.map(v=>{
                        const lastItem=this.getLast(v);
                        const targetid=v[0].from==userid?v[0].to:v[0].from;
                        if(!userinfo[targetid]){
                            return null;
                        }
                        const name=userinfo[targetid]?userinfo[targetid].name:'';
                        const avatar=userinfo[targetid]?userinfo[targetid].avatar:'';
                        const unreadnum=v.filter(v=>!v.read&&v.to==userid).length;
                        return (
                            <List key={lastItem._id}>
                                <Item
                                    extra={<Badge text={unreadnum}></Badge>}
                                    thumb={require(`../img/${userinfo[targetid].avatar}.png`)}
                                    arrow='horizontal'
                                    onClick={()=>{
                                        this.props.history.push(`/chat/${targetid}`);
                                    }}
                                >
                                    {lastItem.content}
                                    <Brief>{name}</Brief>

                                </Item>
                            </List>
                        )
                    })}
               
            </div>
        )
    }
}

export default Msg;