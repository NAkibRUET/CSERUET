import React,{Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './components/Home/home';
//import BookView from './components/Books';
import Admin from './components/Admin';
import ProfileUpdateImage from './components/Profile/profile_update_image';
import ProfileUpdateInfo from './components/Profile/profile_update_info';
import Profile from './components/Profile/profile';
//import FileUpload from './components/fileupload';
import Login from './containers/login';
import AdminLogin from './containers/admin_login';
import Logout from './containers/logout';
import AdminLogout from './containers/admin_logout';
//import AddBook from './containers/add';
import Layout from './hoc/layout';
import Auth from './hoc/auth';
import AdAuth from './hoc/admin_auth';
import ChangePassword from './components/Profile/change_password';
import ForgotPassword from './components/Profile/forgot_password';
import Forgot from './components/Profile/forgot';

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
					<Route path="/logout" exact component={Auth(Logout,1)}/>
					<Route path="/profile" exact component={Auth(Profile,1)}/>
					<Route path="/profile/update/image" exact component={Auth(ProfileUpdateImage,1)}/>
					<Route path="/profile/update/info" exact component={Auth(ProfileUpdateInfo,1)}/>
					<Route path="/profile/change/password" exact component={Auth(ChangePassword,1)}/>
					<Route path="/forgot" exact component={Forgot}/>
					<Route path="/forgot_Password/:roll/:code" exact component={ForgotPassword}/>
					<Route path="/admin" exact component={AdAuth(Admin,1)}/>
					<Route path="/admin/login" exact component={AdAuth(AdminLogin,2)}/>
					<Route path="/admin/logout" exact component={AdAuth(AdminLogout,1)}/>
				</Switch>
			</Layout>
		)
	};
}
export default Routes;