import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

class DefaultBreadcrumps extends Component {

    render() {
        return (
            <div>
              <Layout >
                  <Breadcrumb  style={{ padding: '13px'}}>
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item>List</Breadcrumb.Item>
                      <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
              </Layout>
            </div>
        );
    }
}

export default DefaultBreadcrumps;
