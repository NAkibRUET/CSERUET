import React from 'react';
import { connect } from 'react-redux';
import {changePass} from '../../actions'

class ChangePassword extends React.Component{
	state={
		roll:this.props.user.login.roll,
		oldPassword:'',
		newPassword:'',
		confNewPassword:'',
		error:'',
		success:false
	}
	submitForm = (e)=>{
		e.preventDefault();
		console.log(this.state);
		this.props.dispatch(changePass(this.state));
	}

	handleOldPassword=(event)=>{
		this.setState({oldPassword:event.target.value});
	}
	handleNewPassword=(event)=>{
		this.setState({newPassword:event.target.value});
	}
	handleConfirmPassword=(event)=>{
		this.setState({confNewPassword:event.target.value});
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.user.changePass.passChange){
			//this.props.history.push('/profile');
			this.setState({success:true});
		}
	}
	render(){
		let user = this.props.user;
		return(
			<div className="">
				<form onSubmit={this.submitForm}>
					<h5>Change Password</h5>
					<div className=""><input 
						type="password" 
						placeholder="Enter old password"
						onChange={this.handleOldPassword}
					/></div>
					<div className=""><input
						 type="password" 
						 placeholder="Enter New Password" 
						 onChange={this.handleNewPassword}
						 />
					</div>
					<div className=""><input
						 type="password" 
						 placeholder="Confirm New Password" 
						 onChange={this.handleConfirmPassword}
						 />
					</div>
					<button type="submit">Change</button>
					
					<div className="">
					{
						user.changePass?
							<div>{user.changePass.Message}</div>
						:null
					}
					</div>
				</form>
			</div>
		)
	}
}
function mapStateToProps(state){
	console.log(state.user)
	return{
		user:state.user
	}
}
export default connect(mapStateToProps)(ChangePassword);