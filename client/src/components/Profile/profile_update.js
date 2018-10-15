import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import { connect } from 'react-redux';
//import {ProUpdate} from '../actions'

class ProfileUpdate extends React.Component{
	state={
		selectedFile: null, 
		loaded:0,
		name:'',
		email:'',
		blood:'',
		error:'',
		success:false
	}
	handleselectedFile = event => {
	    this.setState({
	      selectedFile: event.target.files[0],
	      loaded: 0,
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
	    const data = new FormData();
	    console.log(this.state);
	    data.append('file', this.state.selectedFile, this.state.selectedFile.name)
	    data.append('name',this.state.name);
	    data.append('email',this.state.email);
	    data.append('blood',this.state.blood);
	    data.append('roll',roll);
	    axios
	      .post('/api/createProfile', data, {
	        onUploadProgress: ProgressEvent => {
	          this.setState({
	            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
	      		success:true      
	          })
	        },
	      })
	      .then(res => {
	         res.data
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
		console.log(this.props);
		let user = this.props.user;
		return(
			<div className="">
				<form onSubmit={this.handleUpload}>
					<h2>Update Profile Here</h2>
					<div className=""><input 
						type="text" 
						placeholder="Enter Name"
						onChange={this.handleName}
					/></div>
					<div className=""><input
						 type="text" 
						 placeholder="Enter Email" 
						 onChange={this.handleEmail}
						 />

					</div>
					<div className=""><input
						 type="text" 
						 placeholder="Enter Blood Group" 
						 onChange={this.handleBlood}
						 />

					</div>
					<input type="file" name="" id="" onChange={this.handleselectedFile} />
						        
			        <button type="submit" onClick={this.handleUpload}>Upload</button>
			    	<div> {Math.round(this.state.loaded,2) } %</div>
					
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