import React, { Component } from 'react';

import Parser from "html-react-parser";
import { Modal, Button,  Form, Icon, Input, Checkbox,Table, Divider, Tag,Tabs,Select  } from 'antd';

import FroalaEditor from 'react-froala-wysiwyg';
import $ from "jquery";
window.$ = $;
$.DataTable = require('datatables.net-dt');
const { Column, ColumnGroup } = Table;

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const confirm = Modal.confirm;


class Category extends Component {
  constructor(props){
    super(props);
      this.state = {
        addCategoryVisible:false,
        editCategoryVisible:false,
        addCategoryDescription:null,
        editCategoryName:null,
        editCategoryId:null,
        editCategoryDescription:null,
        viewCategoryVisible:false,
        viewCategoryData:[],
        viewCategoryItemState: true,
        getCategoryData:[],
        getFaqData:[],
        selectCategoryDefault:null,


    }
  }
  /*
             |||||||
            ( O   O )
     ____oOO___(_)___OOo____
    (_______________________) Constructor
  */



  //CRUD
  getCategory = () => {
    const data = JSON.stringify({
      "query":"query{ getCategoryFAQ { data{id,name,description,created},success,message { path,message } } }"
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
      // console.log(response)
      let Result = response.getCategoryFAQ.data;
      for (let item in Result){
        Result[item].key=item;
        // Result[item].id = item;
      }
      if(response.getCategoryFAQ.success){
        this.setState({
          getCategoryData:Result
        })

        const getCategoryDataTable= this.state.getCategoryData
        console.log("getCategoryDataTable: ", getCategoryDataTable)
        this.state.table.clear()
        this.pushUserDataInTable(getCategoryDataTable)
        this.state.table.draw()

      }else{
        return false
      }
    })
  }

  getFaq = () => {
    const data = JSON.stringify({
      "query":"query( $limit:limit,$sort:sort,$search:search ){ getQuestionFAQ( limit:$limit,sort:$sort,search:$search ) { sortableFields,searchableFields,page { items,pageNo,totalPages },data { id,question,answer,created,category },success,message { path,message } } }",
       "variables":{
         "limit":{
           "to":1000,
           "page":1
         },
         "sort":{
           "field":"",
           "by":""
         },
         "search":{
             "by":"",
             "text":""
          }
       }
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
      // console.log(response)
      let Result = response.getQuestionFAQ.data;

      if(response.getQuestionFAQ.success){
        this.setState({
          getFaqData:Result
        })

        const getFaqDataTable = this.state.getFaqData
        console.log("getFaqData: ", getFaqDataTable)


      }else{
        return false
      }
    })
  }

  //DATA TABLE
  pushUserDataInTable = (e) => {
      e.forEach( items => {
        let id = items.id
        let created = items.created
        let name = items.name
        let description = items.description
        let actionButton = '<div class="actionBtn"> <button class="btn btn-primary btn-sm view-cat" value="'+id +'">View</button>   <button class="btn btn-primary btn-sm edit-cat" value="'+id +'">Edit</button> <button class="btn btn-primary btn-sm delete-cat" value="'+id +'">Delete</button></div> '
        this.state.table.row.add([id,created,name,description,actionButton])
    })
  }
  setTable = async () =>{
    this.$el = $(this.el)
    console.log("table: ",this.$el)
    this.state.table = this.$el.DataTable()
    this.setButtonForTables()
  }

  setButtonForTables = () => {
    $(this.$el).on( 'click', 'tbody tr td .actionBtn .view-cat', (event) => {
      event.stopPropagation();
      this.dynamicID = event.target.value
      this.setState({
        viewCategoryData:[]
      })
      console.log('viewCategoryData: ',this.state.viewCategoryData)
      for(var i = 0; i < this.state.getCategoryData.length; i++){
        if(this.dynamicID == this.state.getCategoryData[i].id){
          console.log(this.state.getCategoryData[i])
          for(let j = 0; j < this.state.getFaqData.length; j++){
            if(this.state.getCategoryData[i].name ==  this.state.getFaqData[j].category){
              this.state.viewCategoryData.push(this.state.getFaqData[j])
            }
          }
          this.openViewCategoryModal()
        }
      }

    });
    $(this.$el).on( 'click', 'tbody tr td .actionBtn .edit-cat', (event) => {
      event.stopPropagation();
      this.dynamicID = event.target.value
      console.log("edit",this.dynamicID)
      for(var i = 0; i < this.state.getCategoryData.length; i++){
        if(this.dynamicID == this.state.getCategoryData[i].id){
          this.openEditCategoryModal(this.state.getCategoryData[i])
        }
      }
    });
    $(this.$el).on( 'click', 'tbody tr td .actionBtn .delete-cat', (event) => {
      event.stopPropagation();
      this.dynamicID = event.target.value
      console.log("delete",this.dynamicID )
      this.confirmCategoryDelete(this.dynamicID)

    });
  }

  addCategory = async () => {
    const data = JSON.stringify({
      "query":"mutation($input:categoryName!){ createCategoryFAQ( input:$input ) { success,message { path,message } } }",
      "variables":{
          "input":{
            "name":this.state.addCategoryName,
            "description":this.state.addCategoryDescription
        }
      }
    })
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
      if(response.createCategoryFAQ.success){
        return true
      }else{
        return false
      }
    })
  }

  editCategory = async () => {
    const data = JSON.stringify({
        "query":"mutation($input:updateCategoryName!){ updateCategoryFAQ( input:$input ) { success,message { path,message } } }",
        "variables":{
          "input":{
            "id":this.state.editCategoryId,
            "name":this.state.editCategoryName,
            "description":this.state.editCategoryDescription
        }
      }
    })
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
      if(response.updateCategoryFAQ.success){
        return true
      }else{
        return false
      }
    })
  }
  deleteCategory = async (e) => {
    let deleteCategoryId = []
    deleteCategoryId.push(e)
    const data = JSON.stringify({
      "query":"mutation($input:[String]!){ deleteCategoryFAQ( input:$input ) { success,message { path,message } } }",
      "variables":{
          "input":deleteCategoryId
      }
    })
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
      if(response.deleteCategoryFAQ.success){
        return true
      }else{
        return false
      }
    })
  }
  //MODALS
  success = () => {
  Modal.success({
    title: 'Success',
    maskClosable:'false'
    });
  }

  confirmCategoryDelete = (e) => {
    const deletePassFunction = this.deleteCategoryModal
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
  openAddCategoryModal = () => {
    this.setState({
      addCategoryVisible:true
    })
  }
  openViewCategoryModal = () => {
    this.setState({
      viewCategoryVisible:true

    })
  }
  openEditCategoryModal = (e) => {
    this.setState({
      editCategoryVisible:true,
      editCategoryId: e.id,
      editCategoryName: e.name,
      editCategoryDescription: e.description,
    })
  }
  //CLOSE MODAL
  closeAddCategoryModal = () => {
    this.setState({
      addCategoryVisible:false
    })
  }
  closeViewCategoryModal = () => {
    this.setState({
      viewCategoryVisible:false
    })
  }
  closeFaqModal = () => {
    this.setState({
      viewFaqVisible:false
    })
  }
  closeEditCategoryModal = () => {
    this.setState({
      editCategoryVisible:false
    })
  }
  //MODAL
  addCategoryModal = async () => {
    if(await this.addCategory()){
      this.success()
      this.setState({
        addCategoryVisible:false
      })
      let addCategoryInput = await document.getElementsByClassName('addCategoryInput')
      for(var i = 0;i < addCategoryInput.length;i++){
        addCategoryInput[i].children[1].value = ""
      }
      this.getCategory()
    }else{
      Modal.error({
        title: 'This is an error message',
        maskClosable:'false'
      });
    }
  }
  editCategoryModal = async () => {
    if(await this.editCategory()){
      this.success()
      this.setState({
        editCategoryVisible:false
      })
      this.getCategory()
    }else{
      Modal.error({
        title: 'This is an error message',
        maskClosable:'false'
      });
    }
  }
  deleteCategoryModal = async (e) => {
    if(await this.deleteCategory(e)){
      this.success()
      this.getCategory()
    }else{
      Modal.error({
        title: 'This is an error message',
        maskClosable:'false'
      });
    }
  }
  //RANDOM
  setAddFaqSelectDefault = () => {
    if(this.state.getCategoryData.length > 0){
      this.setState({
        selectCategoryDefault:this.state.getCategoryData[0].name,
        addFaqCategory:this.state.getCategoryData[0].name
      })

    }else{
      this.setState({
        selectCategoryDefault:"Empty"
      })
    }
  }

  //Converter
  checkRecord = (e) => {
    if(e.answer.length > 14){
      const sliceFaqAnswer = e.answer.slice(0,14) +  ' .... ';
      e.answer=sliceFaqAnswer
    }

    e.created = this.convertDate(e.created)
  }

  checkItemsId = (e) => {
    console.log("id: ", e)
    if(e == null){
      console.log('fuck')
    }else{
      console.log('fuck this')

    }
    return e
  }


  convertDate = (e) => {
    var d = new Date(e),
   month = '' + (d.getMonth() + 1),
   day = '' + d.getDate(),
   year = d.getFullYear(),
   today = '' + d.getDay().toString();
   var thisDay = "";
   if(today == "1" ){
     thisDay = "Mon"
   }else if(today == "2"){
     thisDay = "Tue"
   }else if(today == "3"){
     thisDay = "Wed"
   }else if(today == "4"){
     thisDay = "Thur"
   }else if(today == "5"){
     thisDay = "Fri"
   }else if(today == "6"){
     thisDay = "Sat"
   }
    else {
     thisDay = "Sun"
   }
   if (month.length < 2) month = '0' + month;
   if (day.length < 2) day = '0' + day;

   return month + "/" + day + "/" + year

  }


  /*
             |||||||
            ( O   O )
     ____oOO___(_)___OOo____
    (_______________________) Methods
  */


  //ONCHANGE
  onChange = (e) =>{
    this.setState({[e.target.name]:e.target.value})
  }

  componentDidMount(){
    this.getCategory();
    this.getFaq()
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
      <div className="faqAndCategory">
            <div className="roleComponent">
              <h1>Category</h1>
              <div className="row" style={{marginBottom:"10px"}}>
                <div className="col-sm-3"></div>
                <div className="col-sm-3"></div>
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                  <button className="btn btn-sm btn-primary" style={{float:"right"}} onClick={this.openAddCategoryModal}>Create Category</button>
                </div>
              </div>


              <div className="category-table">
                <table className="display" width="100%" ref={el => this.el = el}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Created</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="Modal">
                <Modal
                  title="Add Category"
                  visible={this.state.addCategoryVisible}
                  onOk={this.addCategoryModal}
                  onCancel={this.closeAddCategoryModal}
                  maskClosable={false}>
                  <div>
                    <Form className="add-form">
                      <FormItem>
                        <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Category Name" className="addCategoryInput"  onChange={this.onChange} name="addCategoryName" />
                      </FormItem>
                      <FormItem>
                        <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Category Description" className="addCategoryInput" onChange={this.onChange} name="addCategoryDescription" />
                      </FormItem>
                   </Form>
                  </div>
                </Modal>
                <Modal
                  title="Edit Category"
                  visible={this.state.editCategoryVisible}
                  onOk={this.editCategoryModal}
                  onCancel={this.closeEditCategoryModal}
                  maskClosable={false}>
                  <div>
                    <Form className="edit-form">
                      <FormItem>
                        <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Category Name" className="editCategoryInput"  onChange={this.onChange} name="editCategoryName" value={this.state.editCategoryName} />
                      </FormItem>
                      <FormItem>
                        <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Category Description" className="editCategoryInput" onChange={this.onChange} name="editCategoryDescription" value={this.state.editCategoryDescription} />
                      </FormItem>
                   </Form>
                  </div>
                </Modal>
                <Modal
                  title="View Category"
                  visible={this.state.viewCategoryVisible}
                  onOk={this.closeViewCategoryModal}
                  onCancel={this.closeViewCategoryModal}
                  maskClosable={true}>
                  <div>
                    {this.state.viewCategoryData.length > 0 ?
                      this.state.viewCategoryData.map((items,index) =>
                    <div key={items.id+index} style={{ border:" 1px solid grey", margin:"5px",padding: "10px", borderRadius: "5px"}}>
                      <div>ID: {items.id}</div>
                      <div>Questions: {items.question}</div>
                      <div>Answer: {items.question}</div>
                    </div>
                  ):" NO CATEGORY AVAILABLE "}
                  </div>




                </Modal>
              </div>
            </div>
      </div>
    );
  }
}

export default Category;
