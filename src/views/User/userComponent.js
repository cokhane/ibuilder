import React, {Component} from 'react';
import BlockUserComponent from './BlockedUser.js'
import UserComponent from './User';

import {Form, Table, Tabs} from 'antd';

const {Column, ColumnGroup} = Table;
var $ = require('jquery');
window.$ = $;
$.DataTable = require('datatables.net-dt');
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class UserComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passNumber: "1"
        }
    }
    //TAB PANE
    callback = (key) => {
      this.setState({
        passNumber: key
      });
    };

    render() {
        let {passNumber} = this.state;
        return (
            <div className="user">
                <Tabs ActiveKey={passNumber} onChange={(e) => this.callback(e)}>
                    <TabPane tab="Users" key="1">
                        {passNumber === "1" && <UserComponent />}
                    </TabPane>
                    <TabPane tab="Block Users" key="2">
                        {passNumber === "2" && <BlockUserComponent />}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default UserComp;
