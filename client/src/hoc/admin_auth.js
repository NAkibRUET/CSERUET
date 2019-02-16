import React, {Component} from 'react';
import {adminAuth} from '../actions'
import {connect} from 'react-redux';

export default function(ComposedClass,reload){
	class AdminAuthentication extends Component{
		state={
			loading:true
		}
		componentWillMount(){
			this.props.dispatch(adminAuth());
		}
		componentWillReceiveProps(nextProps){
			this.setState({loading:false})

			if(!nextProps.admin.adminLogin.isAdmin){
				if(reload===1){
					this.props.history.push("/admin/login");
				}
			}else{
				if(reload === 2){
					this.props.history.push("/admin");	
				}	
			}
		}
		render(){
			if(this.state.loading){
				return <div>Loading...</div>
			}
			return(
				<ComposedClass {...this.props} admin={this.props.admin}/>
			)
		}
	}
	function mapStateToProps(state){
		console.log(state.admin)
		return{
			admin:state.admin
		}
	}
	return connect(mapStateToProps)(AdminAuthentication)
}
