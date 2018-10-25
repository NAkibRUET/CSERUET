import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {loginAdmin} from '../actions';

class AdminLogin extends React.Component{
	state={
		username:'',
		password:'',
		error:'',
		success:false
	}
	submitForm = (e)=>{
		e.preventDefault();
		console.log(this.state);
		this.props.dispatch(loginAdmin(this.state));
	}
	
	handleInputUsername=(event)=>{
		this.setState({username:event.target.value});
	}
	handleInputPassword=(event)=>{
		this.setState({password:event.target.value});
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.admin.adminLogin.isAdmin){
			this.props.history.push('/admin');
			this.setState({success:true});
		}
	}
	render(){
		let admin = this.props.admin;
		return(
			<div className="">
				<form onSubmit={this.submitForm}>
					<h2>Login Here</h2>
					<div className=""><input 
						type="text" 
						placeholder="Enter username"
						onChange={this.handleInputUsername}
					/></div>
					<div className=""><input
						 type="password" 
						 placeholder="Enter Password" 
						 onChange={this.handleInputPassword}
						 />

					</div>
					<button type="submit">Login</button>
					
					<div className="error">
					{
						admin.adminLogin?
							<div>{admin.adminLogin.Message}</div>
						:null
					}
					</div>
				</form>
				

			</div>
		)
	}
}
function mapStateToProps(state){
	
	return{
		admin:state.admin
	}
}
export default connect(mapStateToProps)(AdminLogin);