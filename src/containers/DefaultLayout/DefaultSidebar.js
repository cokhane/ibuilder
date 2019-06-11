import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import DefaultContent from "./DefaultContent";
import history from '../../history/history';
const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class DefaultSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            passUrl: this.props.passUrl
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    handleClick = (e) => {
      console.log('click ', e);
      let str = e.key;
      this.setState({
          passUrl: str,
      });
      history.replace(str);

    }

    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({ collapsed });
    }


    render() {
        return (
            <div style={{background: '#191919'}}>
              <Sider
                  style={{height: '100vh',background: '#191919', marginTop:'-1px'}}
                  collapsible
             collapsed={this.state.collapsed}
             onCollapse={this.onCollapse}>
                  <Menu theme="dark" mode="inline"  defaultSelectedKeys={[this.state.passUrl]}  style={{background: '#191919'}}
                      onClick={(e) => this.handleClick(e)}>

                      <Menu.Item key="/user">
                        <Icon type="user" theme="outlined" />
                          <span>User</span>
                      </Menu.Item>
                      <Menu.Item key="/roles">
                        <Icon type="lock" theme="outlined" />
                          <span>Roles</span>
                      </Menu.Item>
                      <Menu.Item key="/faq">
                        <Icon type="pushpin" theme="outlined" />
                        <span>Faq</span>
                      </Menu.Item>
                  </Menu>
              </Sider>
            </div>
        );
    }
}

export default DefaultSidebar;
