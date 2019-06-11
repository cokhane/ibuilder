import React, { Component } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import $ from "jquery";
window.$ = $;

class Froala extends Component {
  constructor() {
      super();
      this.state = {
          FroalaModel: 'Example text'
      };
  }

  removeLicenseByDarwin =  async () => {
    console.log('called darwin')
    console.log(document.getElementsByClassName('fr-wrapper'))

    const parentDiv = await document.getElementsByClassName('fr-wrapper')[0]
    const firstChild = parentDiv.firstElementChild
    parentDiv.removeChild(firstChild)

  }


  handleModelChange = (e) => {
    this.removeLicenseByDarwin()

    this.setState({FroalaModel: e});
    console.log('hehe: ',this.state.FroalaModel)
  }
  componentDidMount(){
    // this.removeLicenseByDarwin()
  }

  render(){
    return(
      <div className="froala">
        <div>
          <h1>H1</h1>
          <div style={{width:"800px"}}>
            <FroalaEditor
              tag='textarea'
              config={this.config}
              model={this.state.FroalaModel}
              onModelChange={this.handleModelChange}/>
          </div>
        </div>
      </div>
    )
  }
}
export default Froala;
