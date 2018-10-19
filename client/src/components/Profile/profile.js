import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import {ProfileUser} from '../actions'

class Profile extends React.Component{
	state={
		name:"",
		email:"",
		blood:"",
		image:""
	}
	componentWillMount(){
		let x = this.props.user.login.roll;
		
		axios.get(`/api/profiledata?roll=${x}`,this.props.user.login.roll ).then(response => {	
			this.setState({
				name:response.data.name,
				email:response.data.email,
				blood:response.data.blood,
				image: response.data.image
			})
		})
	}
	render(){
		return(
			<div style={{margin:"0 auto", width:"300px"}}>
				{
					this.state.image?
					<img src={this.state.image} className="img-thumbnail" width="200"/>
					:<img src="/images/avatar.png" className="img-thumbnail" width="200"/>	
				}
				<br/>
				<Link to="/profile/update/image"><button>Edit</button></Link>
				
				<br/>
				<div><h5>Name:{this.state.name}</h5> </div>
				<div><h5>Email:{this.state.email}</h5> </div>
				<div><h5>Blood:{this.state.blood}</h5> </div>
				<Link to="/profile/update/info"><button>Edit</button></Link>
				<br/>
				<br/>
				{this.state.email?
				<Link to="/profile/change/password"><button className="btn btn-light" style={{margin:"0"}}>Change Password</button></Link>
				:<div>
					<button style={{margin:"0"}} className="btn btn-light" disabled>Change Password</button>
					<h6 style={{color:"#7f7f7f",width:"200px"}}>Insert an Email to change Password</h6>
				</div>
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
export default connect(mapStateToProps)(Profile);