import React from 'react';
import { connect } from 'react-redux';
import { getBooksWithReview, clearBooksWithReview} from '../../actions'
class BookView extends React.Component{
	componentWillMount(){
		this.props.dispatch(getBooksWithReview(this.props.match.params.id))
	}
	componentWillUnmount(){
		this.props.dispatch(clearBooksWithReview())
	}
	renderBook = (books)=>(
	
		books.book?
			<div className="br_container">
				<div className="br_header">
					<h2>{books.book.name}</h2>
					<h5>{books.book.author}</h5>
					<div className="br_reviewer">
						Review By: {books.reviewer.name} {books.reviewer.lastname}
					</div>
				</div>
				<div className="br_review">
					{books.book.review}
				</div>
				<div className="br_box">
					<div className="left">
						<div>Pages: {books.book.pages}</div>
						<div>Price: {books.book.price}</div>
					</div>
					<div className="right">
						<div>Rating: {books.book.rating}</div>
						
					</div>
				</div>
			</div>
			
		:null
	)
	render(){
		let books = this.props.books;

		console.log(this.props)
		return(
			<div>

				{this.renderBook(books)}
			</div>
		)
	}
}
function mapStateToProps(state){
	return{
		books:state.books
	}
}
export default connect(mapStateToProps)(BookView);