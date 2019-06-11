import React, {Component} from 'react';
import {Form, Table, Tabs} from 'antd';
import FaqComponent from './Faq.js'
import CategoryComponent from './Category.js'

const {Column, ColumnGroup} = Table;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class FaqCategoryParent extends Component {
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
                    <TabPane tab="Faq" key="1">
                      {passNumber === "1" && <FaqComponent />}
                    </TabPane>
                    <TabPane tab="Category" key="2">
                        {passNumber === "2" && <CategoryComponent />}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default FaqCategoryParent;
