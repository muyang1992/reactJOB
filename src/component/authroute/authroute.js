import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'; 
import {loadData} from '../../redux/user.redux';
import {connect} from 'react-redux';

@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
         /*
         获取用户信息
         是否登录
         现在的URL地址，login不需要跳转
         用户的type 身份是牛人还是boss
         用户的信息是否已经完善
         */
        const publicList=['./login','register'];
        const pathname=this.props.location.pathname; 
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        axios.get('/user/info')
            .then(res=>{
                if(res.status==200){
                    if(res.data.code==0){
                        //有登陆信息
                        this.props.loadData(res.data.data);
                    }else{
                        //没有登录信息
                        this.props.history.push('/login');
                    }
                    console.log(res.data);
                }
            });
    }
    render(){
        return null;
        //可以通过返回null的形式，让组件什么都不显示
    }
}
export default AuthRoute;