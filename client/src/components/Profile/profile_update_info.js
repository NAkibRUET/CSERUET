import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import { connect } from 'react-redux';
//import {ProUpdate} from '../actions'

class ProfileUpdate extends React.Component{
	state={
		name:'',
		email:'',
		blood:'',
		error:'',
		success:false
	}
	componentWillMount(){
		let x = this.props.user.login.roll;
		
		axios.get(`/api/profiledata?roll=${x}`,this.props.user.login.roll ).then(response => {	
			this.setState({
				name:response.data.name,
				email:response.data.email,
				blood:response.data.blood,
				//image: response.data.image
			})
		})
	}
	handleName=(event)=>{
		this.setState({name:event.target.value});
	}
	handleEmail=(event)=>{
		this.setState({email:event.target.value});
	}
	handleBlood=(event)=>{
		this.setState({blood:event.target.value});
	}
	handleUpload = (e) => {
		e.preventDefault();
		let roll = this.props.user.login.roll;
		let name = this.state.name;
		let email = this.state.email;
		let blood = this.state.blood;
	    //const data = new FormData();
	    console.log(this.state);
	    //data.append('name',this.state.name);
	    //data.append('email',this.state.email);
	    //data.append('blood',this.state.blood);
	    //data.append('roll',roll);
	    axios
	      .post('/api/updateProfileInfo', {roll,name,email,blood})
	      .then(res => {
	         res.data
	         this.setState({
	         	success:true
	         })
	      })
  	}
	submitForm = (e)=>{
		
		console.log(this.state);
		//this.props.dispatch(profile(this.state));
	}
	
	/*componentWillReceiveProps(nextProps){
		if(nextProps.user.login.isAuth){
			//this.props.history.push('/user');
			this.setState({success:true});
		}
	}*/
	render(){
		//console.log(this.props);
		let user = this.props.user;
		return(
			<div className="">
				<form onSubmit={this.handleUpload}>
					<h2>Update Profile Here</h2>
					<div className=""><input 
						type="text" 
						placeholder="Enter Name"
						onChange={this.handleName}
						value={this.state.name}
					/></div>
					<div className=""><input
						 type="email" 
						 placeholder="Enter Email" 
						 onChange={this.handleEmail} 
						 value={this.state.email}
						 />

					</div>
					<div className=""><input
						 type="text" 
						 placeholder="Enter Blood Group" 
						 onChange={this.handleBlood} 
						 value={this.state.blood}
						 />

					</div>
		
						        
			        <button type="submit" onClick={this.handleUpload}>Update</button>
					
					{
						this.state.success?
							<div>Done! <Link to="/profile">Go Back</Link></div>
						:null
					}
				</form>
			</div>
		)
	}
}
export default ProfileUpdate;