import React, {Component} from 'react';
import InputNumber from "antd/lib/input-number";
import SketchPicker from "react-color";
import "../../css/dashboard/design.css";

export default class TextComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false
    }
  };

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    })
  };
  handleClose = () => {
    this.setState({
      displayColorPicker: false
    })
  };

  render() {
    const {color, fontsize, lineheight, letterspacing,text} = {...this.props};
    let styles = {background:color};
    return (
      <div className="textComponent">
        <h1>Edit Text:</h1>
        <div className="siteTextColor displayflexbetween">
          <span>Text Color:</span>
          <div  className="swatchContent" onClick={this.handleClick}>
            <div className="swatchInside" style={styles}/>
          </div>
          {this.state.displayColorPicker ? <div className="popover">
            <div className="cover" onClick={this.handleClose}/>
            <SketchPicker color={color}
                          onChange={(e) => this.props.onStyleChange(e, {state:"color",attr:"color"})}/>
          </div> : null}
        </div>
        <div className="setText displayflexbetween">
          <span>Text :</span>
          <input type="text"
                 value={text}
                 onChange={(e) => this.props.onStyleChange(e, {state:"text",attr:"text"})}/>
        </div>
        <div className="setFontSize">
          <div className="displayflexbetween">
            <span>Font-Size :</span>
            <span><InputNumber min={1}
                               max={200}
                               value={fontsize}
                               onChange={(e) => this.props.onStyleChange(e, {state:"fontsize",attr:"font-size",ext:"px"})}/> px</span>
          </div>
        </div>
        <div className="setLineHeight">
          <div className="displayflexbetween">
            <span>Line-Height :</span>
            <span><InputNumber min={1}
                               max={200}
                               value={lineheight}
                               onChange={(e) => this.props.onStyleChange(e, {state:"lineheight",attr:"line-height",ext:"px"})}/> px</span>
          </div>
        </div>
        <div className="setLetterSpacing">
          <div className="displayflexbetween">
            <span>Letter-Spacing :</span>
            <span><InputNumber min={1} max={100} value={letterspacing}
                               onChange={(e) => this.props.onStyleChange(e,{state:"letterspacing",attr:"letter-spacing"})}/> px</span>
          </div>
        </div>
        <div className="displayflexcenter">
          <span className="saveBtn">Save</span>
          <span className="saveBtn">Default</span>
        </div>
      </div>
    );
  }
}
