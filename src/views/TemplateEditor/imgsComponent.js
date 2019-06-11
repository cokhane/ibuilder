import React, {Component} from 'react';
import Slider from "antd/lib/slider";
import Select from 'antd/lib/select';
import "../../css/dashboard/design.css";

const Option = Select.Option;
export default class ImgsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit:"px",
      min:20,
      max:600
    }
  };
  handleChange=(value) =>{
    console.log(`selected ${value}`);
    if(value==="px"){
      this.setState({
        unit:value,
        min:20,
        max:600
      });
    }else{
      this.setState({
        unit:value,
        min:1,
        max:100
      });
    }
  };
  render() {
    const {width} = {...this.props};
    return (
      <div className="imgComponent">
        <h1>Choose your images:</h1>
        <div className="imgChoose">
          <div className="displayflexbetween">
            <span>Images width:</span>
            <span>{width} {this.state.unit}</span>
          </div>
          <Slider min={this.state.min} max={this.state.max} onChange={(e) => this.props.onStyleChange(e, {state:"width",attr:"width",ext:this.state.unit})} value={width}/>
        </div>
        <div className="imgChoose">
          <div className="displayflexbetween">
            <span>Images width unit:</span>
            <Select defaultValue={this.state.unit} style={{ width: 100 }} onChange={this.handleChange}>
              <Option value="px">px</Option>
              <Option value="%">%</Option>
            </Select>
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
