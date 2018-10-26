import React from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
import {imoocForm} from '../../component/imooc-form/imooc-form';
@connect(
    state=>state.user,
    {register}
)
@imoocForm
class Register extends React.Component{
    constructor(props){
        super(props);
        this.regisger=this.regisger.bind(this);
        this.handlerRegister=this.handlerRegister.bind(this);
        // this.state={
        //     user:'',
        //     pwd:'',
        //     repeatpwd:'',
        //     type:'genius'
        // };
    }
    regisger(){
        this.props.history.push('/register');
    }
    componentDidMount(){
        this.props.handleChange('type','genius');
    }
    handlerRegister(){
        this.props.register(this.props.state);
    }
    render(){
        const RadioItem=Radio.RadioItem;
        return(
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <List>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                    <WhiteSpace></WhiteSpace>
                    <InputItem 
                        onChange={v=>this.props.handleChange('user',v)}
                    >用户名</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem 
                        onChange={v=>this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem 
                        onChange={v=>this.props.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <RadioItem 
                        checked={this.props.type=='genius'}
                        onChange={()=>this.props.handleChange('type','genius')}
                    >牛人</RadioItem>
                    <WhiteSpace></WhiteSpace>
                    <RadioItem 
                        checked={this.props.type=='boss'}
                        onChange={()=>this.props.handleChange('type','boss')}
                    >boss</RadioItem>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.handlerRegister}>注册</Button>
                </List>
            </div>
        )
    }
}
export default Register;