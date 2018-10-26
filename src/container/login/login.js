import React from 'react';

import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {login} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
import {imoocForm} from '../../component/imooc-form/imooc-form';
@connect(
    state=>state.user,
    {login}
)
@imoocForm
class Login extends React.Component{
    constructor(props){
        super(props);
        // this.state={
        //     user:'',
        //     pwd:''
        // };
        this.regisger=this.regisger.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    regisger(){
        this.props.history.push('/register');
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     });
    // }
    handleLogin(){
        this.props .login(this.props.state);
    }
    render(){
        const redirectTo=this.props.redirectTo;
        return(
            <div>
               {(redirectTo&&redirectTo!='/login')?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem
                            onChange={v=>this.props.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v=>this.props.handleChange('pwd',v)}
                            type='password'
                        >密码</InputItem>
                        <WhiteSpace/>
                    </List>
                    <Button 
                        onClick={this.handleLogin}
                    type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.regisger} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login;