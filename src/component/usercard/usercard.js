import React from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
@withRouter
class UserCard extends React.Component{
    static propTypes={
        userlist:PropTypes.array.isRequired
    };
    // constructor(props){
    //     super(props);
    //     this.handleClick=this.handleClick.bind(this);
    // }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`);
    }
    render(){
        const Header=Card.Header;
        const Body=Card.Body;
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v=>(
                    v.avatar?(
                    <Card 
                        key={v._id}
                        onClick={()=>this.handleClick(v)}
                    >
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        >
                        </Header>
                        <Body>
                            {v.type=='boss'?<div>公司名称：{v.company}</div>:null}
                            <WhiteSpace></WhiteSpace>
                            {v.desc.split("\n").map(d=>(
                                <div key={d}>{d}</div>
                            ))}
                            <WhiteSpace></WhiteSpace>
                            {v.type=='boss'?<div>薪资：{v.money}</div>:null}
                        </Body>
                        
                    </Card>):null
                ))}
            </WingBlank>
        )
    }
}
export  default UserCard;