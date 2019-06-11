import React, {Component} from 'react';
import Layout from 'antd/lib/layout';
import Modal from 'antd/lib/modal';
import StyleEditorComponent from "./styleEditor";
import history from '../../history/history';
import $ from 'jquery';
import htmlGenerator from '../../loadHtml.js';
import "../../css/dashboard/dashIndex.css";

const {Content, Sider} = Layout;
const apidataXmple = require('../json/exampleResposnse');

export default class DashIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      type: "none",
      content: [],
      styles: {},
      activeElementId: "",
      appID: "blua",
      text: "111",
      fontsize: 16,
      lineheight: 20,
      letterspacing: 10,
      width: 0,
      padding: 0,
      backgroundcolor: "rgba(0,0,0,1)",
      color: "rgba(99,164,181,1)"
    };
  };
  componentWillMount() {
    if (apidataXmple.success) {
      this.setState({
        content: apidataXmple.data.content,
        styles: apidataXmple.data.generalStyle
      });
    }
  }
  componentDidMount() {
    this.trigger();
  }
  trigger = () => {
    let {appID} = this.state;
    let {styles} = this.state;
    let {content} = this.state;
    let retrieveCss = ['color', 'backgroundColor', 'letterSpacing', 'height', 'lineHeight', 'width', 'fontSize', 'padding'];
    if (!(htmlGenerator.style({mainID: appID, content: styles}))) {
      console.log("Style:No Data found");
    }
    if (!(htmlGenerator.trigger({mainID: appID, content: content}))) {
      console.log("HTML: No data found");
    }
    $("#" + appID).ready(() => {
      $("#" + appID).contents().find(".edtElbldr").on("click", (event) => {
        event.stopPropagation();
        $("#" + appID).contents().find('.edtElbldrActive').remove();
        $(event.currentTarget).append("<div class='edtElbldrActive'></div>");
        $(event.currentTarget).find('.edtElbldrActive').css('opacity', ".5");
        let coptemplate = this.state.content;
        console.log("coptemplate: ",coptemplate)
        let Findex = coptemplate.findIndex(x => x.elId === $(event.currentTarget).attr("id"));
        console.log("Findex: ",Findex)

        this.setState({
          activeElementId: $(event.currentTarget).attr("id"),
          text: coptemplate[Findex].text,
          type: coptemplate[Findex].type,
        });
        for (let i = 0; i < retrieveCss.length; i++) {
          let keyWords = retrieveCss[i].toLowerCase();
          let value=$(event.currentTarget).css(retrieveCss[i]);
          if(keyWords==="color" || keyWords === "backgroundcolor"){
            this.setState({
              [keyWords]:value
            });
          }else{
            if (!isNaN(parseInt(value))) {
              this.setState({
                [keyWords]: parseInt(value)
              });
            }
          }
        }
      });
    })
  };
  onStyleChange = (value, data) => {
   console.log("value:",value);
   console.log("data:",data);
    if (this.state.activeElementId !== "") {
      let coptemplate = this.state.content, finalValue;
      const Findex = coptemplate.findIndex(x => x.elId === this.state.activeElementId);
      if (data.state === "text") {
        coptemplate[Findex].text = value.target.value;
        finalValue = value.target.value
      } else if (data.state === "backgroundcolor" || data.state === "color") {
        let selected = `rgba(${ value.rgb.r }, ${ value.rgb.g }, ${ value.rgb.b }, ${ value.rgb.a })`;
        coptemplate[Findex].styles[data.attr] = selected;
        finalValue = selected;
      } else {
        coptemplate[Findex].styles[data.attr] = (!data.ext) ? value : value + data.ext;
        finalValue = value
      }
      this.setState({
        [data.state]: finalValue,
        content: coptemplate
      });
      this.trigger()
    }
  };
  render() {
    return (
      <Layout style={{maxHeight: '100vh'}} className="dashboard">
        <Layout>
          <Content className="contentAntnew">
            <div className="homeIndex">
              <div className="homeIndexContent">
                <iframe id="blua"
                        width="100%"
                        frameBorder="0"
                        title="blua"
                        style={{background: "url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')"}}/>
              </div>
            </div>
          </Content>
        </Layout>
        <Sider collapsible={false}>
          <div className="logTop">
            <img src={require("../../images/Icon-Back.svg")} alt="logo" className="backBtn" onClick={() => {
              history.goBack()
            }}/>
            <div className="displayflexcenter">
              <img src={require("../../images/KiwiLogo-Navi.svg")} alt="logo"
                   style={{width: "55px"}}
                   onClick={() => history.replace(`/`)}/>
            </div>
          </div>
          <StyleEditorComponent onStyleChange={this.onStyleChange} {...this.state}/>
        </Sider>
        <Modal footer={null}
               maskClosable={false}
               wrapClassName="dashboardIndex"
               style={{top: "50%", marginTop: "-190px"}}
               bodyStyle={{width: "720px", height: "380px", background: "#000", padding: "0"}}
               closable={false}
               visible={this.state.visible}>
          <div style={{height: "340px"}}>
            {/*<img src={require("../../images/kiwiLogo-welcome.svg")} alt="logo" className="logoWelcome"/>*/}
            <h1>WELCOME</h1>
            <h2>to your website!</h2>
          </div>
          <div className="startBtn" onClick={()=>this.setState({visible: false})}>START</div>
        </Modal>
      </Layout>
    );
  }
}
