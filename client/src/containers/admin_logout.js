import React from 'react';
import axios from 'axios';
class AdminLogout extends React.Component{
	componentWillMount(){
		axios.get(`/api/adminlogout`).then(response => response.data);
		this.props.history.push('/admin/login');
	}
	render(){
		return(
			<div></div>
		)
	}
}
export default AdminLogout;