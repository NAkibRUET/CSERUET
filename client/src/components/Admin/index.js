import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { adminPost } from '../../actions';
class Admin extends React.Component{
	state={
		contestType:'naku',
		Title:'',
		Date:'',
		Start:'',
		End:'',
		Description:'',
		error:'',
		success:false

	}
	submitForm = (e)=>{
		e.preventDefault();
		console.log(this.state);
		this.props.dispatch(adminPost(this.state));
	}
	handleContestType=(event)=>{
		this.setState({contestType:event.target.value});
	}
	handleTitle=(event)=>{
		this.setState({Title:event.target.value});
	}

	handleDate=(event)=>{
		this.setState({Date:event.target.value});
	}

	handleStartTime=(event)=>{
		this.setState({Start:event.target.value});
	}

	handleEndTime=(event)=>{
		this.setState({End:event.target.value});
	}
	handleDescription=(event)=>{
		this.setState({Description:event.target.value});
	}
	render(){
		return(
			<div>
				<Link to="/admin/logout"><button>Logout</button></Link>
				<br/>
				
				<br/>
				<form onSubmit={this.submitForm}>
					<h6>Contest Type:</h6>
					<select onChange={this.handleContestType}>
						<option value="" defaultValue>Select one</option>
						<option value="Idea Contest">Idea Contest</option>
						<option value="Photography Contest">Photography Contest</option>
						<option value="Designing Contest">Designing Contest</option>
						<option value="Drawing Contest">Drawing Contest</option>
					</select>
					<br/>
					<h6>Contest title:</h6>
					<input type="text" 
					placeholder="Enter title"
					onChange={this.handleTitle}
					/>
					<h6>Start Date:</h6>
					<input type="date"
					onChange={this.handleDate}
					/>
					<h6>Start Time:</h6>
					<input type="time"
					onChange={this.handleStartTime}
					/>
					<h6>End Time:</h6>
					<input type="time"
					onChange={this.handleEndTime}
					/>
					<h6>Description:</h6>
					<textarea 
					onChange={this.handleDescription}
					></textarea>
					<button type="submit">Submit</button>
				</form>
			</div>

		)
	}
}
function mapStateToProps(state){
	console.log(state.admin)
	return{
		admin:state.admin
	}
}
export default connect(mapStateToProps)(Admin);
