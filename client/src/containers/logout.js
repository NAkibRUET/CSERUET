import React from 'react';
import axios from 'axios';
class Logout extends React.Component{
	componentWillMount(){
		axios.get(`/api/logout`).then(response => response.data);
		this.props.history.push('/login');
	}
	render(){
		return(
			<div></div>
		)
	}
}
export default Logout;