import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon ,Dropdown} from 'antd';
import history from '../../history/history'

import { Row, Col } from 'antd';
import "./DefaultHeader.css";

const { Header, Content, Footer, Sider } = Layout

class DefaultHeader extends Component {
  constructor(props){
    super(props);
      this.state = {

    }
  }

  logout = () => {
    localStorage.removeItem("session")
    alert("logout")
    history.push("/login")
  }

  render() {

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" >1st menu item</a>
        </Menu.Item>

        <Menu.Item>
          <a rel="noopener noreferrer">3rd menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer"  onClick={this.logout}>Logout</a>
        </Menu.Item>
      </Menu>
    );

     return (
        <div>
          <div>
            <Layout  style={{marginBottom:"1px"}}>
              <Header className="header" style={{background: "#191919", border: "1px solid black"}}>
                <div className="gutter-example">
                  <Row gutter={5}>
                    <Col className="gutter-row" span={4}>
                      <div className="gutter-box"  style={{float: "left"}}>
                        <div style={{marginLeft:"-10px"}}>
                
                        </div>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <div className="gutter-box"></div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <div className="gutter-box"></div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <div className="gutter-box"></div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <div className="gutter-box"></div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <div className="gutter-box" style={{float: "right"}}>
                          <Dropdown overlay={menu}>
                           <a className="ant-dropdown-link" href="#">
                             <span style={{color:"white"}}>Menu</span> <Icon type="down" style={{color:"white"}}/>
                           </a>
                         </Dropdown>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Header>
            </Layout>
          </div>
        </div>
     );
   }
 }

 export default DefaultHeader;
