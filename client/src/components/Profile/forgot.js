import React from 'react';
import { connect } from 'react-redux';
import {forgotCheck} from '../../actions'

class Forgot extends React.Component{
	state={
		roll:'',
		error:'',
		loading:false,
		success:false
	}
	submitForm = (e)=>{
		e.preventDefault();
		console.log(this.state);
		this.props.dispatch(forgotCheck(this.state));
		this.setState({
			loading:true
		})
	}

	handleRoll=(event)=>{
		this.setState({roll:event.target.value});
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.user.checkForgot){
			this.setState({
				loading:false
			});
		}
		if(nextProps.user.checkForgot.success){
			//this.props.history.push('/profile');
			this.setState({
				success:true,
				loading:false
			});
		}
	}
	render(){
		let user = this.props.user;
		return(
			<div className="">
				<form onSubmit={this.submitForm}>
					<h5>Enter Roll:</h5>
					<div className=""><input 
						type="number" 
						placeholder="Enter roll"
						onChange={this.handleRoll}
					/></div>
					<button type="submit">Submit</button>
					<div>
						{
							this.state.loading?
							<div>Loading</div>
							:null
						}
					</div>
					<div className="">
					{
						user.checkForgot?
							<div>{user.checkForgot.Message}</div>
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
export default connect(mapStateToProps)(Forgot);