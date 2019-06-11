import React, {Component} from 'react';
import TextComponent from "./textComponent";
import ImgsComponent from "./imgsComponent";
import ButtonComponent from "./buttonsComponent";
import ContentComponent from "./contentComponent";
import "../../css/dashboard/design.css";

export default class StyleEditorComponent extends Component {
  render() {
    let {type} = {...this.props};
    return (
      <div className="styleEditorContent">
        {type === "content" && <ContentComponent onStyleChange={this.props.onStyleChange} {...this.props}/>}
        {type === "text" && <TextComponent onStyleChange={this.props.onStyleChange} {...this.props}/>}
        {type === "image" && <ImgsComponent onStyleChange={this.props.onStyleChange} {...this.props}/>}
        {type === "button" && <ButtonComponent onStyleChange={this.props.onStyleChange} {...this.props}/>}
        {type === "none" && <h3>Select one item on the template and you can start to edit.</h3>}
      </div>
    );
  }
}
