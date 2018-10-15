import React from 'react';
import moment from 'moment-js';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUserPost} from '../../actions';

class UserPost extends React.Component{
	componentWillMount(){
		
		let UserId = this.props.user.login.id;
		this.props.dispatch(getUserPost(UserId));
	}
	showUserPosts=(user)=>(
		user.userPosts?
			user.userPosts.map(item=>(
				<tr key={item._id}>
					<td>{item.name}</td>
					<td>{item.author}</td>
					<td>{moment(item.createAt).format("DD/MM/YY")}</td>
				</tr>
			))
		:null
	)
	render(){
		console.log(this.props);
		let user = this.props.user;
		return(
			<div className="user_posts">
				<h4>Your Reviews:</h4>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Author</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{this.showUserPosts(user)}
					</tbody>
				</table>
				
			</div>
		)
	}
}

function mapStateToProps(state){
	
	return{
		user:state.user
	}
}
export default connect(mapStateToProps)(UserPost);