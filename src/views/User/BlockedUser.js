import React, {Component} from 'react';
import {Modal, Button, Form, Icon, Input, Checkbox, Table, Divider, Tag, Tabs} from 'antd';

const {Column, ColumnGroup} = Table;
var $ = require('jquery');
window.$ = $;
$.DataTable = require('datatables.net-dt');
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class BlockedUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getUserData: [],
            oldGetUserData: [],
            getBlockedUser: [],
            addUserVisible: false,
            addUserEmail: null,
            addUserFirstname: null,
            addUserMiddlename: null,
            addUserLastname: null,
            table: null,

        }
    }

    /*
               |||||||
              ( O   O )
       ____oOO___(_)___OOo____
      (_______________________) Constructor
    */

    //CRUD
    unblockUser = async (e) => {
        let blockerUserId = e
        const data = JSON.stringify({
            "query": "mutation($input:String!){ unblockUser( input:$input ) { success,message { path,message } } }",
            "variables": {
                "input": blockerUserId
            }
        })
        return await fetch("https://api.8uilder.com", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": window.localStorage.getItem("session")
            },
            body: data
        }).then(async res => {
            const response = await res.json()
            console.log("deleteUser: ", response)
            if (response.unblockUser.success) {
                return true
            } else {
                return false
            }
        })
    }

    getBlockedUser = () => {
        const data = JSON.stringify({
            "query": "query( $limit:limit,$sort:sort,$search:search ){ GetBlockUser( limit:$limit,sort:$sort,search:$search ) {sortableFields,searchableFields,page { items,pageNo,totalPages },data{id,email,firstname,lastname,middlename,created },success,message { path,message } } }",
            "variables": {
                "limit": {
                    "to": 100,
                    "page": 1
                },
                "sort": {
                    "field": "",
                    "by": ""
                },
                "search": {
                    "by": "",
                    "text": ""
                }
            }
        })
        fetch("https://api.8uilder.com", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": window.localStorage.getItem("session")
            },
            body: data
        }).then(async res => {
            const response = await res.json()
            let Result = response.GetBlockUser.data;
            for (let item in Result) {
                Result[item].key = item;
            }
            if (response.GetBlockUser.success) {
                this.setState({
                    getBlockedUser: Result
                })
                // console.log("getBlockedUser: ", this.state.getBlockedUser)
                const getUserDataTable = this.state.getBlockedUser
                this.state.table.clear()
                this.pushUserDataInTable(getUserDataTable)
                this.state.table.draw()
            } else {
                return false
            }
        })
    }

    //SET TABLE
    pushUserDataInTable = (e) => {
        e.forEach(items => {
            let id = items.id
            let email = items.email
            let created = items.created
            let firstname = items.firstname
            let lastname = items.lastname
            let middlename = items.middlename
            let actionButton = '<div class="actionBtn"><button class="btn btn-primary btn-sm block" value="' + id + '">Unblock</button></div> '
            this.state.table.row.add([id, email, created, firstname, lastname, middlename, actionButton])
        })
    }

    setTable = () => {
        this.$el = $(this.el)
        this.state.table = this.$el.DataTable()
        this.setButtonForTables()
    }

    setButtonForTables = () => {
        $(this.$el).on('click', 'tbody tr td .actionBtn .block', (event) => {
            event.stopPropagation();
            this.dynamicID = event.target.value
            this.confirmUserUnBlock(this.dynamicID)
        });
    }


    //MODALS EXTRA
    success = () => {
        Modal.success({
            title: 'Success',
            maskClosable: 'false'
        });
    }

    confirmUserUnBlock = (e) => {
      const deletePassFunction = this.unblockUserModal
      confirm({
        title: 'Do you want to delete these items?',
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk () {
          deletePassFunction(e)
        },
        onCancel() {},
      });
    }

    //MODALS
    unblockUserModal = async (e) => {
        if (await this.unblockUser(e)) {
            this.success()
            this.getBlockedUser()
        } else {
            Modal.error({
                title: 'This is an error message',
                maskClosable: 'false'
            });
        }
    }

    //ONCHANGE
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    //TAB PANE

    /*
               |||||||
              ( O   O )
       ____oOO___(_)___OOo____
      (_______________________) Methods
    */

    componentDidMount() {
        this.getBlockedUser();
        this.setTable();
    }


    /*
               |||||||
              ( O   O )
       ____oOO___(_)___OOo____
      (_______________________) Life Cycle
    */
    render() {

        return (
            <div>
                <div className="Table">
                    <h1>Blocked Users</h1>
                    <div className="row" style={{marginBottom: "10px"}}>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3">
                        </div>
                    </div>
                    <div className="blockedUser">
                        <div className="user">
                            <div className="Table">
                                <div className="user-table">
                                    <table className="display" width="100%" ref={el => this.el = el}>
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Email</th>
                                            <th>Date Created</th>
                                            <th>Firstname</th>
                                            <th>Lastname</th>
                                            <th>Middlename</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlockedUser;
