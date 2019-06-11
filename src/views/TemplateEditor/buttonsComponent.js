import React, {Component} from 'react';
import Slider from "antd/lib/slider";
import SketchPicker from "react-color";
import "../../css/dashboard/design.css";

export default class ButtonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      displayBgColorPicker: false
    }
  };
  handleClick = (props) => {
    this.setState({
      [props]: !this.state.displayColorPicker
    })
  };
  handleClose = (props) => {
    this.setState({
      [props]: false
    })
  };
  render() {
    const {backgroundcolor, width, color} = {...this.props};
    let textcolor = {
      background:color
    };
    let bgcolor = {
      background:backgroundcolor
    };
    return (
      <div className="buttonComponent">
        <h1>Edit your buttons:</h1>
        <div className="buttonChoose">
          <div className="displayflexbetween">
            <span>Button size:</span>
            <span>{width} px</span>
          </div>
          <Slider min={120} max={800}
                  onChange={(e) => this.props.onStyleChange(e, {state: "width", attr: "width", ext: "px"})}
                  value={width}/>
        </div>
        <div className="siteBgColor displayflexbetween">
          <span>Background Color:</span>
          <div className="swatchContent" onClick={() => this.handleClick("displayColorPicker")}>
            <div className="swatchInside" style={bgcolor}/>
          </div>
          {this.state.displayColorPicker ? <div className="popover">
            <div className="cover" onClick={() => this.handleClose("displayColorPicker")}/>
            <SketchPicker color={backgroundcolor}
                          onChange={(e) => this.props.onStyleChange(e, {
                            state: "backgroundcolor",
                            attr: "background-color"
                          })}/>
          </div> : null}
        </div>
        <div className="siteTextColor displayflexbetween">
          <span>Text Color:</span>
          <div className="swatchContent" onClick={() => this.handleClick("displayBgColorPicker")}>
            <div style={textcolor} className="swatchInside"/>
          </div>
          {this.state.displayBgColorPicker ? <div className="popover">
            <div className="cover" onClick={() => this.handleClose("displayBgColorPicker")}/>
            <SketchPicker color={color}
                          onChange={(e) => this.props.onStyleChange(e, {state: "color", attr: "color"})}/>
          </div> : null}
        </div>
        <div className="displayflexcenter">
          <span className="saveBtn">Save</span>
          <span className="saveBtn">Default</span>
        </div>
      </div>
    );
  }
}
