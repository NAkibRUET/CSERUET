import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addBook} from '../actions';

class AddBook extends React.Component{
	state={
		formData:{
			name:'',
			author:'',
			review:'',
			pages:'',
			rating:'',
			price:''
		}
	}
	handleInput = (event,name)=>{
		const newFormdata = {
			...this.state.formData
		}
		newFormdata[name]=event.target.value;
		this.setState({
			formData:newFormdata
		})
	}
	submitForm=(e)=>{
		e.preventDefault();
		console.log(this.state.formData);
		this.props.dispatch(addBook({
			...this.state.formData,
			ownerId:this.props.user.login.id
		}))
	}
	render(){
		return(
			<div className="rl_container article">
				<form onSubmit={this.submitForm}>
					<h2>Add a Review:</h2>
					<div className="form_element">
						<input
							type="text"
							placeholder="Enter Name"
							onChange={(event)=>this.handleInput(event,'name')}
						/>
					</div>
					<div className="form_element">
						<input
							type="text"
							placeholder="Enter Autor"
							onChange={(event)=>this.handleInput(event,'author')}
						/>
					</div>
					<textarea
						onChange={(event)=>this.handleInput(event,'review')}
					></textarea>
					<div className="form_element">
						<input
							type="number"
							placeholder="Enter Pages"
							onChange={(event)=>this.handleInput(event,'pages')}
						/>
					</div>
					<div className="form_element">
						<select
							value={this.state.formData.rating}
							onChange={(event)=>this.handleInput(event,'rating')}
						>
							<option val="">Select Rating</option>
							<option val="1">1</option>
							<option val="2">2</option>
							<option val="3">3</option>
							<option val="4">4</option>
							<option val="5">5</option>
						</select>
					</div>

					<div className="form_element">
						<input
							type="number"
							placeholder="Enter Price"
							onChange={(event)=>this.handleInput(event,'price')}
						/>
					</div>
					<button type="submit">Submit</button>
					{
						this.props.books.newbook?
							<div className="conf_link">Yoo! <Link to={`/books/${this.props.books.newbook.bookId}`}>Click here to see the new book!</Link>
							</div>
						:null
					}
				</form>
			</div>
		)
	}
}
function mapStateToProps(state){
	console.log(state)
	return{
		books:state.books
	}
}
export default connect(mapStateToProps)(AddBook);