import React, { Component } from 'react';
import { Modal, Button,  Form, Icon, Input, Checkbox, Table, Divider, Tag } from 'antd';
import $ from "jquery";
window.$ = $;
$.DataTable = require('datatables.net-dt');

const { Column, ColumnGroup } = Table;
const FormItem = Form.Item;
const confirm = Modal.confirm;


class Roles extends Component {
  constructor(props){
    super(props);
      this.state = {
        addRolesVisible: false,
        addRolesName:null,
        addRolesDescription:null,
        addRolesErrorMessage:null,
        deleteRolesErrorMessage:null,
        editRolesVisible: false,
        editRolesId:null,
        editRolesName:null,
        editRolesDescription:null,
        setRolesVisible: false,
        setRolesID: null,
        getRolesData:[],
        getRolesCodesData:[],
        createState:[],
        readState:[],
        updateState:[],
        deleteState:[],
        viewState:[],
        table:null,
        dynamicObject:[]
    }
  }
  /*
             |||||||
            ( O   O )
     ____oOO___(_)___OOo____
    (_______________________) Constructor
  */
  //CRUD
  getRolesCodes = () => {
    const data = JSON.stringify({
      "query":"query{ moduleRolesName{ data,success,message { path,message } } }"
    })
   fetch("https://api.8uilder.com",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":window.localStorage.getItem("session")
      },
      body:data
    }).then(async res =>{
			const response = await res.json()
      let obj=[];
      let Result = [];
      var alterResult = []
      alterResult  = response.moduleRolesName.data;
      // console.log(alterResult)
      for(let i = 0; i < alterResult.length ;i++){
        if(alterResult[i] == 'user'){
          obj.push({
            name:"User",
            class:alterResult[i],
            id:i.toString(),
            key:i.toString(),
          });
        }
        else if(alterResult[i] == 'roles_n_permission'){
          obj.push({
            name:"Roles",
            class:alterResult[i],
            id:i.toString(),
            key:i.toString(),
          });
        }
        else if(alterResult[i] == 'faq'){
          obj.push({
            name:"FAQ",
            class:alterResult[i],
            id:i.toString(),
            key:i.toString(),
          });
        }
      }
      this.setState({
        getRolesCodesData:obj
      })
      // console.log("getRolesCodesData: ", this.state.getRolesCodesData)
		})
  }
  getRoles = () => {
    const data = JSON.stringify({
      "query":"query{ roles{ data {roleID,name,description,create,read,delete,update,view,created} success,message { path,message } } }"
    })
   fetch("https://api.8uilder.com",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":window.localStorage.getItem("session")
      },
      body:data
    }).then(async res =>{
			const response = await res.json()
      let Result = response.roles.data;
      if(response.roles.success){
        this.setState({
          getRolesData:Result
        })
        // console.log("getRolesData: ", this.state.getRolesData)
        const getRolesDataTable = this.state.getRolesData
        this.state.table.clear()
        this.pushUserDataInTable(getRolesDataTable)
        this.state.table.draw()

      }else{
        return false
      }
		})
  }

  //DATA TABLE
  pushUserDataInTable = (e) => {
      e.forEach( items => {
        let id = items.roleID
        let created = items.created
        let name = items.name
        let description = items.description
        let actionButton = '<div class="actionBtn"> <button class="btn btn-primary btn-sm set-roles" value="'+id +'">Set Roles</button> <button class="btn btn-primary btn-sm edit-roles" value="'+id +'">Edit</button> <button class="btn btn-primary btn-sm delete" value="'+id +'">Delete</button></div> '
        this.state.table.row.add([id,created,name,description,actionButton])
    })
  }

  setTable = async () =>{
    this.$el = $(this.el)
    this.state.table = this.$el.DataTable()
    this.setButtonForTables()
  }

  setButtonForTables = () => {

    $(this.$el).on( 'click', 'tbody tr td .actionBtn .delete',  (event) => {
      event.stopPropagation();
      this.dynamicID = event.target.value
      this.confirmRolesDelete(this.dynamicID)
    });

    $(this.$el).on( 'click', 'tbody tr td .actionBtn .edit-roles',  (event) => {
      event.stopPropagation();
      this.dynamicID = event.target.value
      for(var i = 0;  i < this.state.getRolesData.length; i++){
        if(this.dynamicID == this.state.getRolesData[i].roleID){
          this.openeditRolesModal(this.state.getRolesData[i])
        }
      }
    });

    $(this.$el).on( 'click', 'tbody tr td .actionBtn .set-roles', (event) => {
      event.stopPropagation();
      this.dynamicID = event.target.value

      for(var i = 0;  i < this.state.getRolesData.length; i++){
        if(this.dynamicID == this.state.getRolesData[i].roleID){
          this.openSetRolesModal(this.state.getRolesData[i])
        }
      }
    });
  }

  loopDynamicObject = (e) => {
    this.state.dynamicObject.push(e)

  }

  addRoles = async () => {
    const data = JSON.stringify(
     {
        "query":"mutation($input:rolesFields!){ CreateRoles( input:$input ) { success,message { path,message } } }",
        "variables":{
          "input":{
            "name":this.state.addRolesName,
            "description":this.state.addRolesDescription
          }
        }
      }
    )
    return await fetch("https://api.8uilder.com",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":window.localStorage.getItem("session")
      },
      body:data
    }).then(async res =>{
  		const response = await res.json()
      console.log(response)
      if(response.CreateRoles.success){
        return true
      }else{
        this.setState({
          addRolesErrorMessage:response.CreateRoles.message[0].message
        })
      }
  	})
  }
  editRoles = async () => {
    const data = JSON.stringify(
     {
      "query":"mutation($input:rolesUpdateFields!){ UpdateRoles( input:$input ) { success,message { path,message } } }",
       "variables":{
           "input":{
             "rolesID":this.state.editRolesId,
             "name":this.state.editRolesName,
             "description":this.state.editRolesDescription
           }
        }
      }
    )
    return await fetch("https://api.8uilder.com",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":window.localStorage.getItem("session")
      },
      body:data
    }).then(async res =>{
      const response = await res.json()
      console.log (response)
      if(response.UpdateRoles.success){
        return true
      }else{
        return false
      }
    })
  }
  deleteRoles = async (e) => {
    const deleteRolesId = []
    console.log(e)
    deleteRolesId.push(e)
    const data = JSON.stringify(
     {
       "query":"mutation($input:DeleteRolesField!){ DeleteRoles(input:$input){ success,message { path,message } } }",
       "variables":{
         "input":{
            "rolesID":deleteRolesId
         }
       }
     }
    )
    return await fetch("https://api.8uilder.com",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":window.localStorage.getItem("session")
      },
      body:data
    }).then(async res =>{
      const response = await res.json()
      console.log(response)
      if(response.DeleteRoles.success){
        return true
      }else{
        this.setState({
          deleteRolesErrorMessage:response.DeleteRoles.message[0].message
        })
      }
    })

  }
  setRoles = async () => {
    const data = JSON.stringify(
     {
      "query":"mutation($input:rolesUpdateFields!){ UpdateRoles( input:$input ) { success,message { path,message } } }",
       "variables":{
           "input":{
              "rolesID":this.state.setRolesID,
              "view":this.state.viewState,
              "create":this.state.createState,
              "read":this.state.readState,
              "update":this.state.updateState,
              "delete":this.state.deleteState
           }
        }
      }
    )
    return await fetch("https://api.8uilder.com",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":window.localStorage.getItem("session")
      },
      body:data
    }).then(async res =>{
      const response = await res.json()
      console.log ("setRoles: ",response)
      if(response.UpdateRoles.success){
        return true
      }else{
        return false
      }
    })
  }


  //OPEN MODAL
  openAddRolesModal = async () => {
    this.setState({
      addRolesVisible: true,
    });
  }
  openeditRolesModal = async (e) => {
    console.log('sample record: ',e)
    this.setState({
      editRolesVisible: true,
      editRolesId:e.roleID,
      editRolesName: e.name,
      editRolesDescription: e.description,
    });
  }
  openSetRolesModal =  async (e) => {
    let uncheck = await document.getElementsByClassName("permissionCheckBox")
    for (var i = 0; i < uncheck.length; i++){
      uncheck[i].checked = false
     }
    const rolesCode = this.state.getRolesCodesData
    this.setState({
      setRolesVisible: true,
      setRolesID:e.roleID,
      createState:[],
      readState:[],
      updateState:[],
      deleteState:[],
      viewState:[],
    });
    let records = e
    const actionName = ["create","read","update","delete","view"]
    for (var loopA = 0; loopA < actionName.length; loopA++) {
      for (var loopB = 0; loopB < rolesCode.length; loopB++) {
        if(records[actionName[loopA]])
        {
          if(records[actionName[loopA]].indexOf(rolesCode[loopB].class) > -1  ){
            var dynamicID = actionName[loopA]+loopB+e.roleID
            var x = await document.getElementsByName(dynamicID)
            x[0].checked = true
            if(actionName[loopA] == 'create'){
              this.state.createState.push(rolesCode[loopB].class)
            }
            if(actionName[loopA] == 'read'){
              this.state.readState.push(rolesCode[loopB].class)
            }
            if(actionName[loopA] == 'update'){
              this.state.updateState.push(rolesCode[loopB].class)
            }
            if(actionName[loopA] == 'delete'){
              this.state.deleteState.push(rolesCode[loopB].class)
            }
            if(actionName[loopA] == 'view'){
              this.state.viewState.push(rolesCode[loopB].class)
            }
          }
        }
      }
    }
  }
  //MODAL EXTRA
  success = () => {
  Modal.success({
    title: 'Success',
    maskClosable:'false'
    });
  }

  confirmRolesDelete = (e) => {
    const deletePassFunction = this.deleteRolesModal
    confirm({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk () {
        deletePassFunction(e)
      },
      onCancel() {},
    });
  }

  addRolesModal = async (e) => {
    e.preventDefault();
    if(await this.addRoles()){
      this.success()
      this.setState({
        addRolesVisible: false,
      });
      document.getElementsByName("addRolesName")[0].value = ""
      document.getElementsByName("addRolesDescription")[0].value = ""
      this.getRoles()
    }else{
    Modal.error({
      title: 'This is an error message',
      content: this.state.addRolesErrorMessage,
      maskClosable:'false'
    });
    }
  }

  editRolesModal = async () => {
    if(await this.editRoles()){
      this.success()
      this.setState({
        editRolesVisible: false,
      });
      this.getRoles()
    }else{
      Modal.error({
        title: 'This is an error message',
        maskClosable:'false'
      });
    }
  }

  deleteRolesModal = async (e) => {
    if(await this.deleteRoles(e)){
      this.success()
      this.getRoles()
    }else{
      Modal.error({
        title: 'This is an error message',
        content: this.state.deleteRolesErrorMessage,
        maskClosable:'false'
      });
    }
  }
  setRolesModal = async () => {
    this.setState({
      setRolesVisible: false,
    });
    if(await this.setRoles()){
      this.success()
      this.getRoles()
    }else{
      Modal.error({
        title: 'This is an error message',
        content: this.state.deleteRolesErrorMessage,
        maskClosable:'false'
      });
    }
  }
  //CLOSE MODAL
  closeAddRolesModal = () => {
    this.setState({
      addRolesVisible: false,
    });
  }
  closeEditRolesModal = () => {
    this.setState({
      editRolesVisible: false,
    });
  }

  closeSetRolesModal = () => {
    this.setState({
      setRolesVisible: false,
    });
  }



  //ONCHANGE
  onChange = (e) =>{
    this.setState({[e.target.name]:e.target.value})
  }
  // SET PERMISSION
  setPermission = (e,data,actionName) => {
    console.log("checkbox: ",e.target.checked)
    console.log("class: ",data.class)
    console.log("action: ",actionName)
    var state = null

    switch (actionName) {
      case 'createState':
        state = this.state.createState
      break;
      case 'readState':
        state = this.state.readState
      break;
      case 'updateState':
        state = this.state.updateState
      break;
      case 'deleteState':
        state = this.state.deleteState
      break;
      case 'viewState':
        state = this.state.viewState
      break;
      default:
      console.log('error')
    }

    if(e.target.checked){
        state.push(data.class)
        console.log(state)
    }else{
      for(var i = 0; i < state.length;i++){
        if(state[i] === data.class){
           state.splice(i,1)
        }
      }
  }


  }

  /*
             |||||||
            ( O   O )
     ____oOO___(_)___OOo____
    (_______________________) Methods
  */



  componentDidMount(){
    this.getRoles()
    this.getRolesCodes()
    this.setTable()
  }

  /*
             |||||||
            ( O   O )
     ____oOO___(_)___OOo____
    (_______________________) Life Cycles

  */
render() {
  const { getFieldDecorator}   = this.props.form;
  return (
    <div>
      <div className="roleComponent">
      <h1>Roles Component</h1>
      <div className="row" style={{marginBottom:"10px"}}>
        <div className="col-sm-3"></div>
        <div className="col-sm-3"></div>
        <div className="col-sm-3"></div>
        <div className="col-sm-3">
        <button className="btn btn-sm btn-primary" style={{float:"right"}} onClick={this.openAddRolesModal}>Add Roles</button>
        </div>
      </div>
        <div className="Table">
        <div className="role-table">
          <table className="display" width="100%" ref={el => this.el = el}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Created</th>
                <th>Role Name</th>
                <th>Definition</th>
                <th>Actions</th>
              </tr>
            </thead>
          </table>
        </div>
        </div>
      </div>
        <div>
          <Modal
            title="Add Roles"
            visible={this.state.addRolesVisible}
            onOk={this.addRolesModal}
            onCancel={this.closeAddRolesModal}
            maskClosable={false}>
            <div>
              <Form className="login-form">
                <FormItem>
                  <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Role Name"  onChange={this.onChange} name="addRolesName" />
                </FormItem>
                <FormItem>
                  <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Role Description" onChange={this.onChange} name="addRolesDescription" />
                </FormItem>
             </Form>
            </div>
          </Modal>
          <Modal
            title="Edit Roles"
            visible={this.state.editRolesVisible}
            onOk={this.editRolesModal}
            onCancel={this.closeEditRolesModal}
            maskClosable={false}>
            <div>
              <Form className="login-form">
                <FormItem>
                  <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Role Name"  onChange={this.onChange} name="editRolesName" value={this.state.editRolesName}/>
                </FormItem>
                <FormItem>
                  <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Role Description" onChange={this.onChange} name="editRolesDescription"  value={this.state.editRolesDescription}/>
                </FormItem>
             </Form>
            </div>
          </Modal>
          <Modal
            width="700px"
            title="Set Roles"
            visible={this.state.setRolesVisible}
            onOk={this.setRolesModal}
            onCancel={this.closeSetRolesModal}
            maskClosable={false}>
            <Table dataSource={this.state.getRolesCodesData} pagination={false}>
              <Column
               title="Module Name"
               dataIndex="name"
              />
              <Column
                title="Create"
                key="create"
                render={(text, record, id,name) => (
                  <span >
                    <input name={"create"+id+this.state.setRolesID} className="permissionCheckBox" onChange={(e)=>this.setPermission(e,record,'createState')} type="checkbox"/>
                  </span>
                 )}
              />;
              <Column
                title="Read"
                key="read"
                render={(text, record, id,name) => (
                  <span >
                    <input name={"read"+id+this.state.setRolesID} className="permissionCheckBox" onChange={(e)=>this.setPermission(e,record,'readState')} type="checkbox"/>
                  </span>
                 )}
              />;
              <Column
                title="Update"
                key="update"
                render={(text, record, id,name) => (
                  <span >
                    <input name={"update"+id+this.state.setRolesID} className="permissionCheckBox" onChange={(e)=>this.setPermission(e,record,'updateState')} type="checkbox"/>
                  </span>
                 )}
              />;
              <Column
                title="Delete"
                key="delete"
                render={(text, record, id,name) => (
                  <span >
                    <input name={"delete"+id+this.state.setRolesID} className="permissionCheckBox" onChange={(e)=>this.setPermission(e,record,'deleteState')} type="checkbox"/>
                  </span>
                 )}
              />;
              <Column
                title="View"
                key="view"
                render={(text, record, id,name) => (
                  <span >
                    <input name={"view"+id+this.state.setRolesID} className="permissionCheckBox" onChange={(e)=>this.setPermission(e,record,'viewState')} type="checkbox"/>
                  </span>
                 )}
              />;
            </Table>
          </Modal>
        </div>
    </div>
    );
  }
}
const WrappedNormalLoginForm2 = Form.create()(Roles);
export default WrappedNormalLoginForm2;
