import React, {Component} from 'react';
import Slider from "antd/lib/slider";
import InputNumber from "antd/lib/input-number";
import "../../css/dashboard/design.css";

export default class ContentComponent extends Component {
  render() {
    const {width, padding} = {...this.props};
    return (
      <div className="contentComponent">
        <h1>Edit your content:</h1>
        <div className="contentwidth">
          <div className="displayflexbetween">
            <span>Content width :</span>
            <span> {width} %</span>
          </div>
          <Slider min={50}
                  max={100}
                  onChange={(e) => this.props.onStyleChange(e, {state: "width", attr: "width", ext: "%"})}
                  value={width}/>
        </div>
        <div className="contentPadding">
          <div className="displayflexbetween">
            <span>Content padding :</span>
            <span><InputNumber min={1}
                               max={100}
                               defaultValue={padding}
                               onChange={(e) => this.props.onStyleChange(e, {
                                 state: "padding",
                                 attr: "padding",
                                 ext: "px"
                               })}/> px</span>
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

