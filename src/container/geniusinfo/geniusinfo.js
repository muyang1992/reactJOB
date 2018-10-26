
import React from 'react';
import { NavBar, Icon ,InputItem,TextareaItem,Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux';
@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            avatar:''
        };
        this.onChange=this.onChange.bind(this);
        this.selectAvatar=this.selectAvatar.bind(this);
    }
    onChange(key,val){
        this.setState({
            [key]:val
        });
    }
    selectAvatar(imgname){
        this.setState({
            avatar:imgname
        });
    }
    render(){
        const path=this.props.location.pathname;
        const redirect=this.props.redirectTo;
        return (
            <div>
                {redirect&&redirect!=path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <AvatarSelector
                    selectAvatar={this.selectAvatar}
                ></AvatarSelector>
                <InputItem onChange={(v)=>this.onChange('title',v)}>
                    求职岗位
                </InputItem>
                <TextareaItem 
                    onChange={(v)=>this.onChange('desc',v)}
                    rows={3}
                    title="个人简介"
                    autoHeight
                >
                </TextareaItem>
                <Button 
                    type='primary'
                    onClick={()=>{
                       this.props.update(this.state);
                    }}
                >保存</Button>
            </div>
        )
    }
}
export default GeniusInfo;