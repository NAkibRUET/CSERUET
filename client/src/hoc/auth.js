import React, {Component} from 'react';
import {auth} from '../actions'
import {connect} from 'react-redux';

export default function(ComposedClass,reload){
	class Authentication extends Component{
		state={
			loading:true
		}
		componentWillMount(){

			this.props.dispatch(auth());

		}
		componentWillReceiveProps(nextProps){
			this.setState({loading:false})

			if(!nextProps.user.login.isAuth){
				if(reload===1){
					this.props.history.push("/login");
				}
			}else{
				if(reload === 2){
					this.props.history.push("/profile/update");	
				}
				
			}
		}
		render(){
			if(this.state.loading){
				return <div>Loading...</div>
			}
			return(
				<ComposedClass {...this.props} user={this.props.user}/>
			)
		}
	}
	function mapStateToProps(state){
		console.log(state.user.login)
		return{
			user:state.user
		}
	}
	return connect(mapStateToProps)(Authentication)
}
