import React, {Component} from 'react';

//REDUX
import PropTypes from 'prop-types';
import { getLoginData } from '../../../actions/postActions';
import { connect } from 'react-redux';

import history from '../../../history/history';
import './Login.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
class LoginPost extends Component {
	constructor(props){
		super(props);
		this.state = {
			loginUsername:null,
			loginPassword:null,
			loginData:null
		}
	}
	//ONCHANGE
	onChange = (e) =>{
		this.setState({[e.target.name]:e.target.value})
	}
	//MODAL
	handleSubmit = (e) => {
	  e.preventDefault();

		const loginFields = {
			loginUsername:this.state.loginUsername,
			loginPassword:this.state.loginPassword
		}

		this.props.getLoginData(loginFields)
 	}
	render(){
		const { getFieldDecorator } = this.props.form;
	    return(
				 <div>
						<Form onSubmit={this.handleSubmit} className="login-form">
			        <FormItem>
								<input type="text" className="form-control" placeholder="Username..." onChange={this.onChange} name="loginUsername"/>
			        </FormItem>
			        <FormItem>
								<input type="password"  className="form-control"  placeholder="Password..."  onChange={this.onChange}  name="loginPassword"/>
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('remember', {
			            valuePropName: 'checked',
			            initialValue: true,
			          })(
			            <Checkbox><span style={{color:"white"}}>Remember me</span></Checkbox>
			          )}
			          <a className="login-form-forgot" href="#"><span style={{color:"white", textDecoration: "underline"}}>Forget Password</span></a>
								<div>
			          <Button type="primary" htmlType="submit" className="login-form-button">
			            Log in
			          </Button>
			           <p> <a href=""><span  style={{color:"white"}}>Register now!</span></a></p>
								</div>
			        </FormItem>
			      </Form>
		     </div>
	    );
	}
}

LoginPost.propTypes = {
	getLoginData: PropTypes.func.isRequired,
};
const WrappedNormalLoginForm = Form.create()(LoginPost);
// export default WrappedNormalLoginForm
