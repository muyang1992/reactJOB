import axios from 'axios';
import {Toast} from 'antd-mobile';

//设置拦截器来拦截请求
axios.interceptors.request.use(function(config){
    Toast.loading('加载中',0);
    return config;
});
axios.interceptors.response.use(function(config){
    Toast.hide();
    return config;
});