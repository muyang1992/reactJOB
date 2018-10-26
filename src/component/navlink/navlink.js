import React from 'react';

import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
@withRouter
@connect(
    state=>state.chat
)
class NavLinkBar extends React.Component{
    static propTypes={
        data:PropTypes.array.isRequired
    }
    render(){
        const navList=this.props.data.filter(v=>!v.hide);
        const {pathname}=this.props.location;
        console.log('navliink',this.props)
        return(
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item
                        badge={v.path=='/msg'?this.props.unread:0}
                        icon={{ uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        title={v.text}
                        key={v.path}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path);
                        }}
                    ></TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

export default NavLinkBar;
