import React, { Component } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
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

class Faq extends Component {
  constructor(props){
    super(props);
      this.state = {
        addFaqVisible:false,
        addFaqQuestion:null,
        addFaqAnswer:'',
        addFaqCategory:null,
        viewFaqVisible:false,
        editFaqVisible:false,
        viewFaqVisible:false,
        viewFaqQuestion:null,
        viewFaqAnswer:"",
        getFaqData: [],
        getCategoryData:[],
        getCategoryDataForEdit:[],
        selectCategoryDefault:null,
        selectEditCategoryDefault:null,
        editFaqQuestion:null,
        editFaqAnswer:null,
        editFaqCategory:null,
        editFaqId:null

    }
  }
  /*
             |||||||
            ( O   O )
     ____oOO___(_)___OOo____
    (_______________________) Constructor
  */

  //CRUD
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
        this.state.table.clear()
        this.pushUserDataInTable(getFaqDataTable)
        this.state.table.draw()

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
        let question = items.question
        let category = items.category
        let answer = items.answer
        let actionButton = '<div class="actionBtn"> <button class="btn btn-primary btn-sm view-faq" value="'+id +'">View</button> <button class="btn btn-primary btn-sm edit-faq" value="'+id +'">Edit</button> <button class="btn btn-primary btn-sm delete-faq" value="'+id +'">Delete</button></div> '
        this.state.table.row.add([id,created,question,answer,category,actionButton])
    })
  }
  setTable = async () =>{
    this.$el = $(this.el)
    this.state.table = this.$el.DataTable()
    const clearArrayState = []
  }
  setButtonForTables = () => {
    $(this.$el).on( 'click', 'tbody tr td .actionBtn .view-faq',  (event) => {
      event.stopPropagation();
      this.dynamicID = event.target.value
      this.openViewFaqModal(this.dynamicID)
    });
    $(this.$el).on( 'click', 'tbody tr td .actionBtn .edit-faq',  (event) => {
      event.stopPropagation();
      this.dynamicID = event.target.value
      for(let i = 0; i < this.state.getFaqData.length; i++){
        if(this.dynamicID == this.state.getFaqData[i].id){
          this.setState({
            selectEditCategoryDefault:this.state.getFaqData[i].category
          })

          this.openEditFaqModal(this.state.getFaqData[i])
        }
      }

    });
    $(this.$el).on( 'click', 'tbody tr td .actionBtn .delete-faq', (event) => {
      event.stopPropagation();
      this.dynamicID = event.target.value
      console.log("delete-faq:", this.dynamicID)
      this.confirmFaqDelete(this.dynamicID)
    });
  }
  addFaq = async () => {
    const data = JSON.stringify({
      "query":"mutation($input:faq_inptFields!){ createQuestionFAQ( input:$input ) { success,message { path,message } } }",
        "variables":{
            "input":{
                "question":this.state.addFaqQuestion,
                "answer":this.state.addFaqAnswer,
                "category":this.state.addFaqCategory
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
      console.log("addFaq: ",response)
      if(response.createQuestionFAQ.success){
        return true
      }else{
        return false
      }
    })
  }
  deleteFaq = async (e) => {
    let deleteFaqId = []
    deleteFaqId.push(e)
    const data = JSON.stringify({
      "query":"mutation($input:[String]!){ deleteQuestionFAQ( input:$input ) { success,message { path,message } } }",
        "variables":{
            "input":deleteFaqId
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
      console.log("deleteFaq: ",response)
      if(response.deleteQuestionFAQ.success){
        return true
      }else{
        return false
      }
    })
  }
  editFaq = async () => {
    const data = JSON.stringify({
      "query":"mutation($input:faq_inptFields_update!){ updateQuestionFAQ( input:$input ) { success,message { path,message } } }",
        "variables":{
          "input":{
              "id":this.state.editFaqId,
              "question":this.state.editFaqQuestion,
              "answer":this.state.editFaqAnswer,
              "category":this.state.editFaqCategory
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
      console.log("editFaq: ",response)
      if(response.updateQuestionFAQ.success){
        return true
      }else{
        return false
      }
    })
  }


  //MODAL EXTRA
  success = () => {
  Modal.success({
    title: 'Success',
    maskClosable:'false'
    });
  }

  confirmFaqDelete = (e) => {
    const deletePassFunction = this.deleteFaqModal
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
  openEditFaqModal = (e) => {
    const dynamicCategory = e.category
    this.setState({
      selectEditCategoryDefault:dynamicCategory,
      editFaqId:e.id,
      editFaqCategory:dynamicCategory,
      editFaqQuestion:e.question,
      editFaqAnswer:e.answer,
      editFaqVisible:true
    })
  }
  clearCategory = () => {

  }
  openAddFaqModal = async (e) => {
    this.setState({
      addFaqVisible: true,
    });
  }
  openViewFaqModal = (e) => {
    let dynamicViewFaqAnswer = ''
    let dynamicViewFaqQuestion = ''
    for(var i = 0; i < this.state.getFaqData.length; i++){
      if(this.state.getFaqData[i].id == e){
        dynamicViewFaqAnswer = Parser(this.state.getFaqData[i].answer)
        dynamicViewFaqQuestion = this.state.getFaqData[i].question // QUESTION:
      }
    }
    this.setState({
      viewFaqVisible:true,
      viewFaqAnswer:dynamicViewFaqAnswer,
      viewFaqQuestion:dynamicViewFaqQuestion

    })
  }
  //MODAL
  addFaqModal = async  () => {
    if(await this.addFaq()){
      this.success()
      this.setState({
        addFaqVisible: false,
      });
      this.resetAddFaqValue()

      this.getFaq()
    }else{
      Modal.error({
        title: 'This is an error message',
        maskClosable:'false'
      });
    }
  }
  resetAddFaqValue = () => {
    document.getElementsByName("addFaqQuestion")[0].value = ""
    this.setState({
      addFaqAnswer:'',
      addFaqCategory:this.state.getCategoryData[0].name,
      selectCategoryDefault:this.state.getCategoryData[0].name
    })
  }
  deleteFaqModal = async (e) =>{
    if(await this.deleteFaq(e)){
      this.success()
      this.getFaq()
    }else{
      Modal.error({
        title: 'This is an error message',
        maskClosable:'false'
      });
    }
  }

  editFaqModal = async () =>{
    if(await this.editFaq()){
      this.setState({
        editFaqVisible: false,
      });
      this.success()
      this.getFaq()
    }else{
      Modal.error({
        title: 'This is an error message',
        maskClosable:'false'
      });
    }
  }
  //CLOSE MODAL
  closeEditFaqModal = () =>{
    this.setState({
      editFaqVisible: false,
    });
  }
  closeAddFaqModal = () => {
    this.setState({
      addFaqVisible: false,
    });
  }
  closeViewFaqModal = () => {
    this.setState({
      viewFaqVisible: false,
    });
  }

  handleChange = (e) => {
    this.setState({
      addFaqCategory:e
    })
  }

  handleChangeEdit = (e) => {
    console.log('value',e.target.value)


    this.setState({
      editFaqCategory:e.target.value,
      selectEditCategoryDefault:e.target.value
    })
  }

  handleModelChange = (e) => {
    this.setState({addFaqAnswer: e});
  }

  handleModelChangeEdit = (e) => {
    this.setState({editFaqAnswer: e});
  }

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
          getCategoryData:Result,
          getCategoryDataForEdit:Result
        })
        this.setAddFaqSelectDefault()
      }else{
        return false
      }
    })
  }

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
    this.getFaq();
    this.getCategory()
    this.setTable()
    this.setButtonForTables()
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
              <h1>FAQ</h1>
              <div className="row" style={{marginBottom:"10px"}}>
                <div className="col-sm-3"></div>
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                </div>
                <div className="col-sm-3">
                  <button className="btn btn-sm btn-primary" style={{float:"right"}} onClick={this.openAddFaqModal}>Create FAQ</button>
                </div>
              </div>

              <div className="faq-table">
                <table className="display" width="100%" ref={el => this.el = el}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Created</th>
                      <th>Questions</th>
                      <th>Answers</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="Modal">
                <Modal
                  title="Create FAQ"
                  width="1000px"
                  visible={this.state.addFaqVisible}
                  onOk={this.addFaqModal}
                  onCancel={this.closeAddFaqModal}
                  maskClosable={false}>
                  <div>
                    <Form className="login-form">
                      <FormItem>
                        <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Faq Question"  onChange={this.onChange} name="addFaqQuestion" />
                      </FormItem>
                      <div className="select">
                        <Select defaultValue={this.state.selectCategoryDefault} style={{ width: '100%' }} onChange={this.handleChange}>
                          {this.state.getCategoryData.map((items,index) =>
                          <Option key={items.name+index} value={items.name}>{items.name}</Option>
                          )}
                        </Select>
                      </div>
                      <div className="froala">
                          <div style={{width:"800",margin:"20px auto"}}>
                            <FroalaEditor
                              tag='textarea'
                              config={this.config}
                              model={this.state.addFaqAnswer}
                              onModelChange={this.handleModelChange}/>
                          </div>
                      </div>
                   </Form>
                  </div>
                </Modal>
                <Modal
                  title="View FAQ"
                  visible={this.state.viewFaqVisible}
                  onOk={this.closeViewFaqModal}
                  onCancel={this.closeViewFaqModal}
                  maskClosable={false}
                  width="1000px">
                  <div>
                    <div><strong>Question:</strong>  {this.state.viewFaqQuestion}</div>

                    <div><strong>Answer: </strong><div style={{display:"inline-block"}}>{this.state.viewFaqAnswer}</div></div>

                   </div>
                </Modal>
                <Modal
                  title="Update Faq"
                  width="1000px"
                  visible={this.state.editFaqVisible}
                  onOk={this.editFaqModal}
                  onCancel={this.closeEditFaqModal}
                  maskClosable={false}>
                  <div>
                    <Form className="login-form">
                      <FormItem>
                        <Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Faq Question"  onChange={this.onChange} name="editFaqQuestion" value={this.state.editFaqQuestion} />
                      </FormItem>
                      <div className="select">
                        <select value={this.state.selectEditCategoryDefault} className="form-control form-control-sm" onChange={this.handleChangeEdit} >
                          {this.state.getCategoryDataForEdit.map((items,index) =>
                           <option  key={items.name+index} value={items.name}>{items.name}</option>
                         )}
                        </select>
                      </div>
                      <div className="froala">
                          <div style={{width:"800",margin:"20px auto"}}>
                            <FroalaEditor
                              tag='textarea'
                              config={this.config}
                              model={this.state.editFaqAnswer}
                              onModelChange={this.handleModelChangeEdit}/>
                          </div>
                      </div>
                   </Form>
                  </div>
                </Modal>
              </div>
            </div>
      </div>
    );
  }
}

export default Faq;
