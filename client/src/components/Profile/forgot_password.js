import React from 'react';
import { connect } from 'react-redux';
import {forgotPass} from '../../actions'
import axios from 'axios';
import {Link} from 'react-router-dom';
class ForgotPassword extends React.Component{
	state={
		roll:this.props.match.params.roll,
		newPassword:'',
		confNewPassword:'',
		error:'',
		success:false,
		access:false,
		done:false,
		doneWarning:false
	}
	componentWillMount(){
		let roll = this.props.match.params.roll;
		let code = this.props.match.params.code;
		//console.log(roll);
		axios.get(`/api/getCode?roll=${roll}`).then(response => {	
			if(response.data.success){
				//console.log(response.data.code)	
				if(code===response.data.code){
					this.setState({
						access:true
					});
				}
				else{
					this.setState({
						access:false
					});
				}
			}
			else{
				this.setState({
					access:false
				})
			}
			
		})

		
	}
	submitForm = (e)=>{
		e.preventDefault();
		//console.log(this.state);
		if(!this.state.done){
			this.props.dispatch(forgotPass(this.state));
			this.setState({
				newPassword:'',
				confNewPassword:'',
				done:true
			})
		}
		else{
			this.setState({
				newPassword:'',
				confNewPassword:'',
				doneWarning:true
			})
		}
	}
	handleNewPassword=(event)=>{
		this.setState({newPassword:event.target.value});
	}
	handleConfirmPassword=(event)=>{
		this.setState({confNewPassword:event.target.value});
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.user.changePass.success){
			//this.props.history.push('/profile');
			this.setState({success:true});
		}
	}
	render(){
		let user = this.props.user;
		return(
			<div className="">
				{
				this.state.access?
				<form onSubmit={this.submitForm}>
					<h5>Change Password</h5>
					<div className=""><input
						 type="password" 
						 placeholder="Enter New Password" 
						 onChange={this.handleNewPassword}
						 value={this.state.newPassword}
						 />
					</div>
					<div className=""><input
						 type="password" 
						 placeholder="Confirm New Password" 
						 onChange={this.handleConfirmPassword}
						 value={this.state.confNewPassword}
						 />
					</div>
					<button type="submit">Change</button>
					
					<div className="">
					{
						user.changePass?
							<div>{user.changePass.message}</div>
						:null
					}
					</div>
					<div>
						{
							this.state.doneWarning?
							<div>You have already Changed Your Password. <Link to="/">Go home</Link></div>
							:null
						}
					</div>
				</form>
				:<div>You are not supposed to be here. <Link to="/">Go home</Link></div>
			}
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
export default connect(mapStateToProps)(ForgotPassword);