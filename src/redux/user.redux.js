import axios from "axios";
import {getRedirectPath} from '../util';
// const REGISTER_SUCCESS='REGISTER_SUCCESS';
// const LOGIN_SUCCESS='LOGIN_SUCCESS';
const ERROR_MSG='ERROR_MSG';
const LOAD_DATA='LOAD_DATA';
const AUTH_SUCCESS='AUTH_SUCCESS';
const LOGOUT="LOGOUT";
const initState={
    redirectTo:'',
    // isAuth:'false',
    msg:'',
    user:'',
    repeatpwd:'',
    type:''
};
//reducer
export function user(state=initState,action){
    switch(action.type){
        // case REGISTER_SUCCESS://将注册成功和登录成功都统一为authorsuccess,所以讲之前的登录和注册的actiontype去掉
        //     return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload};
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg};
        // case LOGIN_SUCCESS:
        //     return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload};
        case LOAD_DATA:
            return {...state,...action.payload};
        case AUTH_SUCCESS:
            return  {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload};
        case   LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state;
    }
    return state;
}
export function logoutSubmit(){
    return {type:LOGOUT}
}
function errorMsg(msg){
    return {type:ERROR_MSG,msg:msg};
}
//使用authsuccess 将registersuccess和loginsuccess 都统一替换使用authsuccess
// function registerSuccess(data){
//     return {type:REGISTER_SUCCESS,payload:data};
// }
// function loginSuccess(data){
//     return {type:LOGIN_SUCCESS,payload:data}
// }
function authSuccess(obj){
    const {pwd,...data}=obj;//通过这个操作可以将pwd参数过滤掉
    return{type:AUTH_SUCCESS,payload:data};
}
export function loadData(userinfo){
    return {type:LOAD_DATA,payload:userinfo}
}
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if(res.status==200&&res.data.code===0){
                    dispatch(authSuccess(res.data.data));
                }else{
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户名密码必须输入');
    }
    if(pwd!==repeatpwd){
        return errorMsg('密码和确认密码不同');
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
        .then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(authSuccess({user,pwd,type}));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        }) 
    }
    
}

export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名和密码必须输入');
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if(res.status==200&&res.data.code==0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

