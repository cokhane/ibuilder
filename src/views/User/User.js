import React, {Component} from 'react';
import {Modal, Button, Form, Icon, Input, Checkbox, Table, Divider, Tag, Tabs} from 'antd';

const {Column, ColumnGroup} = Table;
var $ = require('jquery');
window.$ = $;
$.DataTable = require('datatables.net-dt');
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class User extends Component {
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
            setUserRoleId: null,
            setUserRoleVisible: false,
            getRolesData: [],
            setUserRole: [],
            viewUserVisible: false,
            viewUserId:null,
            viewUserEmail:null,
            viewUserFirstname:null,
            viewUserLastname:null,
            viewUserMiddlename:null,
        }
    }

    /*
               |||||||
              ( O   O )
       ____oOO___(_)___OOo____
      (_______________________) Constructor
    */

    //CRUD
    getUser = () => {
        const data = JSON.stringify({
            "query": "query( $limit:limit,$sort:sort,$search:search ){ GetUser( limit:$limit,sort:$sort,search:$search ) {sortableFields,searchableFields,page { items,pageNo,totalPages },data{id,email,firstname,lastname,middlename,created,roles },success,message { path,message } } }",
            "variables": {
                "limit": {
                    "to": 100,
                    "page": 0
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
        fetch("https://api.8uilder.com ", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": window.localStorage.getItem("session")
            },
            body: data
        }).then(async res => {
            const response = await res.json();
            let Result = response.GetUser.data;
            let getUserDataPassParams = [];
            for (let item in Result) {
                Result[item].key = item;
            }
            if (response.GetUser.success) {
                this.setState({
                    getUserData: Result
                });

                const getUserDataTable = this.state.getUserData;
                console.log("getUser: ",getUserDataTable)
                this.state.table.clear();
                this.pushUserDataInTable(getUserDataTable);
                this.state.table.draw()
            } else {
                return false
            }
        })
    }

    pushUserDataInTable = (e) => {
        e.forEach(items => {
            let id = items.id
            let email = items.email
            let created = items.created
            let firstname = items.firstname
            let lastname = items.lastname
            let middlename = items.middlename
            let actionButton = '<div class="actionBtn"><button class="btn btn-primary btn-sm view" value="' + id + '">View</button> <button class="btn btn-primary btn-sm edit" value="' + id + '">Set Roles</button> <button class="btn btn-primary btn-sm block" value="' + id + '">Block</button></div> '
            this.state.table.row.add([id, email, created, firstname, lastname, middlename, actionButton])
        })
    }
    setTable = () => {
      this.$el = $(this.el)
      this.state.table = this.$el.DataTable()
      this.setButtonForTables()
    }

    setButtonForTables = () => {
      $(this.$el).on('click', 'tbody tr td .actionBtn .edit', (event) => {
          event.stopPropagation();
          this.dynamicID = event.target.value
          this.setState({
              setUserRoleId: this.dynamicID
          })
          this.openSetUserRoleModal()
      });
      $(this.$el).on('click', 'tbody tr td .actionBtn .block', (event) => {
          event.stopPropagation();
          this.dynamicID = event.target.value
          this.confirmUserDelete(this.dynamicID)
      });

      $(this.$el).on('click', 'tbody tr td .actionBtn .view', (event) => {
          event.stopPropagation();
          this.dynamicID = event.target.value
          for(let i = 0; i < this.state.getUserData.length; i++){
            if(this.dynamicID == this.state.getUserData[i].id){
              this.openViewUser(this.state.getUserData[i])
            }
          }
      });
    }

    addUser = async () => {
        const data = JSON.stringify({
            "query": "mutation($input:create_user!){ CreateUser( input:$input ) { success,message { path,message } } }",
            "variables": {
                "input": {
                    "email": this.state.addUserEmail,
                    "firstname": this.state.addUserFirstname,
                    "middlename": this.state.addUserMiddlename,
                    "lastname": this.state.addUserLastname
                }
            }
        })
        return await fetch("https://api.8uilder.com ", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": window.localStorage.getItem("session")
            },
            body: data
        }).then(async res => {
            const response = await res.json()
            console.log("addU`ser: ", response)
            if (response.CreateUser.success) {
                return true
            } else {
                return false
            }
        })
    }

    blockUser = async (e) => {
        let blockerUserId = e
        const data = JSON.stringify({
            "query": "mutation($input:String!){ blockUser( input:$input ) { success,message { path,message } } }",
            "variables": {
                "input": blockerUserId
            }
        })
        return await fetch("https://api.8uilder.com ", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": window.localStorage.getItem("session")
            },
            body: data
        }).then(async res => {
            const response = await res.json()
            console.log("deleteUser: ", response)
            if (response.blockUser.success) {
                return true
            } else {
                return false
            }
        })
    }


    setUserRole = async () => {
      const data = JSON.stringify({
          "query": "mutation($input:UserRoleUpdateField!){ UserRoleUpdate(input:$input){ success,message { path,message } } }",
          "variables": {
              "input": {
                  "rolesID": this.state.setUserRole,
                  "userID": this.state.setUserRoleId
              }
          }
      })
      console.log("query: ",data)

      return await fetch("https://api.8uilder.com ", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": window.localStorage.getItem("session")
          },
          body: data
      }).then(async res => {
          const response = await res.json()
          console.log("setUserRole: ", response)
          if (response.UserRoleUpdate.success) {
              return true
          } else {
              return false
          }
      })
    }

    //ANT MODAL
    success = () => {
      Modal.success({
        title: 'Success',
        maskClosable: 'false'
      });
    }

    errorModal = () => {
      Modal.error({
        title: 'This is an error message',
        content: 'some messages...some messages...',
      });
    }

    confirmUserDelete = (e) => {
      const deletePassFunction = this.blockUserModal
      confirm({
        title: 'Do you want to delete these items?',
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk () {
          deletePassFunction(e)
        },
        onCancel() {},
      });
    }

    //OPEN MODAL
    openViewUser = (e) => {
      console.log("view user id: ",e)
      this.setState({
        viewUserId:e.id,
        viewUserEmail:e.email,
        viewUserFirstname:e.firstname,
        viewUserMiddlename:e.middlename,
        viewUserLastname:e.lastname,
        viewUserVisible:true
      })
    }
    openAddUserModal = () => {
      this.setState({
        addUserVisible: true
      })
    }
    openSetUserRoleModal = () => {
      this.setState({
        setUserRoleVisible: true
      })
    }

    //CLOSE MODAL
    closeViewUSer = () => {
      this.setState({
        viewUserVisible: false
      })
    }
    closeAddUserModal = () => {
      this.setState({
        addUserVisible: false
      })
    }
    closeSetUserRoleModal = () => {
      this.setState({
        setUserRoleVisible: false
      })
    }
    //MODAL
    addUserModal = async () => {

      if(this.addUserModalValidation()){
        console.log("modal validation true",true)
        if (await this.addUser()) {
            this.success()
            let addUserInput = await document.getElementsByClassName('addUserInput')
            for (var i = 0; i < addUserInput.length; i++) {
                addUserInput[i].children[1].value = ""
            }
            console.log(addUserInput)
            this.setState({
                addUserVisible: false,
            });
            this.getUser()
        } else {
            Modal.error({
                title: 'This is an error message',
                maskClosable: 'false'
            });
        }
      }else{
        this.errorModal()
      }

    }

    addUserModalValidation = () => {


      if(this.isEmptyOrSpaces(this.state.addUserEmail) || this.state.addUserEmail == null){
        return false
      }else if(this.isEmptyOrSpaces(this.state.addUserFirstname) || this.state.addUserFirstname == null){
        return false
      }else if(this.isEmptyOrSpaces(this.state.addUserMiddlename) || this.state.addUserMiddlename == null){
        return false
      }else if(this.isEmptyOrSpaces(this.state.addUserLastname) || this.state.addUserLastname == null){
        return false
      }else{
        return true
      }
    }

    isEmptyOrSpaces = (e) => {
       var pattern =/^ *$/
       return pattern.test(e);
     }

    blockUserModal = async (e) => {
      console.log("blockUserModal: ", e)
      let records = e
      if (await this.blockUser(records)) {
          this.success()
          this.getUser()
      } else {
        Modal.error({
            title: 'This is an error message',
            maskClosable: 'false'
        });
      }
    }
    
    setUserRoleModal = async () => {
      if (await this.setUserRole()) {
          this.success()
          this.getUser()
          this.closeSetUserRoleModal()
      } else {
          Modal.error({
              title: 'This is an error message',
              maskClosable: 'false'
          });
      }
    }

    //SET
    setUserRoleOnChange = (e) => {
        var state = []
        state = this.state.setUserRole
        if (e.target.checked) {
            state.push(e.target.value)
            console.log(state)
        } else {
            for (var i = 0; i < state.length; i++) {
                if (state[i] === e.target.value) {
                    state.splice(i, 1)
                    console.log(state)
                }
            }
        }
    }

    /*
      __-----_________________{]__________________________________________________
      {&&&&&&&#%%&#%&%&%&%&%#%&|]__________________________________________________\ ROLES
                                {]
    */
    getRoles = () => {
        const data = JSON.stringify({
            "query": "query{ roles{ data {roleID,name,description,create,read,delete,update,view,created} success,message { path,message } } }"
        })
        fetch("https://api.8uilder.com ", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": window.localStorage.getItem("session")
            },
            body: data
        }).then(async res => {
            const response = await res.json()
            let Result = response.roles.data;
            if (response.roles.success) {
                this.setState({
                    getRolesData: Result
                })

            } else {
                return false
            }
        })
    }
    //ONCHANGE
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };
    /*
               |||||||
              ( O   O )
       ____oOO___(_)___OOo____
      (_______________________) Methods
    */

    componentDidMount() {
      this.getUser();
      this.getRoles();
      this.setTable()

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
                    <h1>Users</h1>
                    <div className="row" style={{marginBottom: "10px"}}>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3">
                            <button className="btn btn-sm btn-primary" style={{float: "right"}}
                                    onClick={this.openAddUserModal}>Add User
                            </button>
                        </div>
                    </div>
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

                <div>
                </div>
                <div className="Modal">
                    <Modal
                        title="Add Users"
                        visible={this.state.addUserVisible}
                        onOk={this.addUserModal}
                        onCancel={this.closeAddUserModal}
                        maskClosable={false}>
                        <div>
                            <Form className="login-form">
                                <FormItem>
                                    <Input prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Email" className="addUserInput"
                                           onChange={this.onChange} name="addUserEmail"/>
                                </FormItem>
                                <FormItem>
                                    <Input prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Firstname" className="addUserInput"
                                           onChange={this.onChange} name="addUserFirstname"/>
                                </FormItem>
                                <FormItem>
                                    <Input prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Middlename" className="addUserInput"
                                           onChange={this.onChange} name="addUserMiddlename"/>
                                </FormItem>
                                <FormItem>
                                    <Input prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Lastname" className="addUserInput"
                                           onChange={this.onChange} name="addUserLastname"/>
                                </FormItem>
                            </Form>
                        </div>
                    </Modal>
                    <Modal
                        title="Update User Role"
                        visible={this.state.setUserRoleVisible}
                        onOk={this.setUserRoleModal}
                        onCancel={this.closeSetUserRoleModal}
                        maskClosable={false}>
                        <div>{this.state.getRolesData.map(items =>
                            <div key={items.roleID}>
                                <div style={{textAlign: "center"}}>
                                    <h6 style={{
                                        display: "inline-block",
                                        marginLeft: "-11px"
                                    }}>{items.name}</h6>
                                    <input style={{marginLeft: "35px"}} type="checkbox" value={items.roleID}
                                      onChange={(e) => this.setUserRoleOnChange(e)}/>
                                </div>
                            </div>
                        )}</div>
                    </Modal>
                    <Modal
                        title="View User Profile"
                        visible={this.state.viewUserVisible}
                        onOk={this.closeViewUSer}
                        onCancel={this.closeViewUSer}
                        maskClosable={true}>
                        <div>
                          <div><strong>ID: </strong>  {this.state.viewUserId}</div>
                          <div><strong>Email: </strong> {this.state.viewUserEmail}</div>
                          <div><strong>Firstname: </strong> {this.state.viewUserFirstname}</div>
                          <div><strong>Middlename: </strong> {this.state.viewUserMiddlename}</div>
                          <div><strong>Lastname: </strong> {this.state.viewUserLastname}</div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default User;
