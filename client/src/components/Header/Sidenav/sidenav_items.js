import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

const SideNavItems = () =>{
	
	return(
		<div>
			<div className="navItem">
				<Link to='/'>
					<FontAwesome name="home"/>
					Home
					
				</Link>
			</div>
			<div className="navItem">
				<Link to='/user'>
					<FontAwesome name="user"/>
					Profile
					
				</Link>
			</div>
			<div className="navItem">
				<Link to='/user/user-reviews'>
					<FontAwesome name="file-text-o"/>
					Reviews
					
				</Link>
			</div>
			<div className="navItem">
				<Link to='/user/add'>
					<FontAwesome name="file-text-o"/>
					Add Reviews
					
				</Link>
			</div>
			<div className="navItem">
				<Link to='/login'>
					<FontAwesome name="power-off"/>
					Login
					
				</Link>
			</div>
			
			<div className="navItem">
				<Link to='/user/logout'>
					<FontAwesome name="power-off"/>
					Logout
					
				</Link>
			</div>
		</div>
	);
};
export default SideNavItems;