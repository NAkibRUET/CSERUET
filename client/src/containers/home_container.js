import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
class HomeContainer extends React.Component{
	render(){
		return(
			<div className="container section_one">
				<div className="row">
					<div className="col-md-8 whitebox">
						Nakib
					</div>

					<div className="col-md-1">
						
					</div>
					<div className="col-md-3 whitebox">
					</div>	
				</div>
			</div>
		)
	}
}
function mapStateToProps(state){
	return{
		user:state.user
	}
}
export default connect(mapStateToProps)(HomeContainer);