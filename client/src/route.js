import React,{Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './components/Home/home';
//import BookView from './components/Books';
//import User from './components/Admin';
import ProfileUpdate from './components/Profile/profile_update';
import Profile from './components/Profile/profile';
//import FileUpload from './components/fileupload';
import Login from './containers/login';
//import AddBook from './containers/add';
import Layout from './hoc/layout';
import Auth from './hoc/auth';
class Routes extends Component{

	state={
		name: ''
	}
	componentWillMount(){
		
		
	}
	render(){
		return(
			<Layout>
				<Switch>
					<Route path="/" exact component={Auth(Home,null)}/>
					<Route path="/login" exact component={Auth(Login,2)}/>
					<Route path="/profile" exact component={Auth(Profile,1)}/>					
					<Route path="/profile/update" exact component={Auth(ProfileUpdate,1)}/>
				</Switch>
			</Layout>
		)
	};
}
export default Routes;