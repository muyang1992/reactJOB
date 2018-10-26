import { user } from "./redux/user.redux";


export function getRedirectPath({type,avatar}){
    //根据用户信息来获取跳转页面地址
    // user.type /boss/genius
    // user.avatar /bossinfo /geniusinfo
    let url=(type==='boss')?'/boss':'/genius';
    if(!avatar){
        url+='info';
    }
    return url;
}

export function getChatId(userId,targetId){
    return [userId,targetId].sort().join('_');
}