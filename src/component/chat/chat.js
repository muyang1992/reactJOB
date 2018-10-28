import React from 'react';
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux';
import { getChatId } from '../../util';
const socket=io('ws://localhost:9093');//由于现在后端的接口是9093，而前端的端口是在3000因此是跨域的需要手动的链接，如果不跨域可以直接使用
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={text:'',msg:[]};
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
        this.fixCarrousel();
    }
    componentWillUnmount(){
            const to=this.props.match.params.user;
            this.props.readMsg(to);
    }
   fixCarrousel(){
        //此函数用来专门修正，Grid组件的跑马灯的bug
        //为了解决ant-design 官网的宫格首次加载的时候只展示一行，之后滑动之后才能全部展示的bug
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'));
        },0);
   }
    handleSubmit(){
        const from=this.props.user._id;
        const to=this.props.match.params.user;
        const msg=this.state.text;
        this.props.sendMsg({from,to,msg});
        console.log(this.props);
        this.setState({
            text:'',
            showEmoji:false
        });
    }
    render(){
        const emoji='😀 😁 😂 🤣 😎 😘 😪 😓 😭 😤 😱 😭 🤪 🤒 😓 😀 😁 😂 🤣 😎 😘 😪 😓 😭 😤 😱 😭 🤪 🤒 😓 😀 😁 😂 🤣 😎 😘 😪 😓 😭 😤 😱 😭 🤪 🤒 😓'
                .split(' ')
                .filter(v=>v)
                .map(v=>({text:v}));
        const userid=this.props.match.params.user;
        const Item=List.Item;
        const users=this.props.chat.users;
        const chatid=getChatId(userid,this.props.user._id);
        const chatmsgs=this.props.chat.chatmsg.filter(v=>v.chatid==chatid);
        console.log(this.props);
        if(!users[userid]){
            return null;
        }//如果没有users数据或者没有对应的用户数据，则就不需要渲染了
        return (
            <div id="chat-page">
                <NavBar 
                    mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.goBack()}}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v=>{
                    const avatar=require(`../img/${users[v.from].avatar}.png`)
                    return v.from==userid?(
                        <List key={v._id}>
                            <Item
                                 thumb={avatar}
                            >
                                {v.content}
                            </Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item className='chat-me'
                                extra={<img src={avatar}/>}
                            >
                                {v.content}
                            </Item>
                        </List>
                    );
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:15}}
                                        onClick={()=>{
                                            this.fixCarrousel();
                                            this.setState({showEmoji:!this.state.showEmoji})
                                        }}
                                    >😂</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                                
                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji?
                        <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el=>{
                                this.setState({
                                    text:this.state.text+el.text
                                })
                                console.log(el);
                            }}
                        />
                        :null}
                    
                </div>
            </div>
            
        )
    }
}

export default Chat;