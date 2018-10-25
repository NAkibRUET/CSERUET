import React from 'react';
import {Link} from 'react-router-dom';

class Admin extends React.Component{
	render(){
		return(
			<div>
				Admin
				<br/>
				<Link to="/admin/logout"><button>Logout</button></Link>
			</div>

		)
	}
}
export default Admin;