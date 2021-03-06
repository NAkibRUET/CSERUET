import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {loginUser} from '../actions';

class Login extends React.Component{
	state={
		roll:'',
		password:'',
		error:'',
		success:false
	}
	submitForm = (e)=>{
		e.preventDefault();
		console.log(this.state);
		this.props.dispatch(loginUser(this.state));
	}
	
	handleInputEmail=(event)=>{
		this.setState({roll:event.target.value});
	}
	handleInputPassword=(event)=>{
		this.setState({password:event.target.value});
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.user.login.isAuth){
			this.props.history.push('/profile');
			this.setState({success:true});
		}
	}
	render(){
		let user = this.props.user;
		return(
			<div className="">
				<form onSubmit={this.submitForm}>
					<h2>Login Here</h2>
					<div className=""><input 
						type="text" 
						placeholder="Enter Roll"
						onChange={this.handleInputEmail}
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
						user.login?
							<div>{user.login.Message}</div>
						:null
					}
					</div>
				</form>
				<div>
				<Link to="/forgot"><button>Forgot Password</button></Link>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state){
	
	return{
		user:state.user
	}
}
export default connect(mapStateToProps)(Login);