import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
class HomeContainer extends React.Component{
	state={
		now:'',
		countDown:'',
		countDown2:'',
		id:'',
		type:'',
		title:'',
		starttime:'',
		endtime:'',
		running:''
	}
	componentWillMount(){
		let timeNow = new Date();
		this.setState({
			now: timeNow
		})
		axios.get(`/api/contests`).then(response => {	
			this.setState({
				id:response.data._id,
				type:response.data.contestType,
				title:response.data.title,
				starttime:response.data.starttime,
				endtime:response.data.endtime
			})
		})
	}
	timer=()=>{
		//console.log(this.state.starttime)
		var start = new Date(this.state.starttime);
		//console.log(countDownDate)
		start.setHours(start.getHours() - 6);

		var end = new Date(this.state.endtime);
		//console.log(countDownDate)
		end.setHours(end.getHours() - 6);
		// Update the count down every 1 second
		//var x = setInterval(function() {

		    // Get todays date and time
		    var now = new Date();
		    //console.log(now)
		    
		    // Find the distance between now and the count down date
		    var distance1= start - now;
		    var distance2= end - now;  
		    
		    // Time calculations for days, hours, minutes and seconds
		    var days = Math.floor(distance1 / (1000 * 60 * 60 * 24));
		    var hours = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		    var minutes = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60));
		    var seconds = Math.floor((distance1 % (1000 * 60)) / 1000);
		    
		    var days1 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
		    var hours1 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		    var minutes1 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
		    var seconds1 = Math.floor((distance2 % (1000 * 60)) / 1000);
		    // Output the result in an element with id="demo"
		    //document.getElementById("demo").innerHTML = days + "d " + hours + "h "
		    //+ minutes + "m " + seconds + "s ";
		    let countDownx = days + "d : " + hours + "h : "+ minutes + "m : " + seconds + "s ";
		    this.setState({
		    	countDown:countDownx
		    })

		    let countDownx2 = hours1 + "h : "+ minutes1 + "m : " + seconds1 + "s ";
		    this.setState({
		    	//countDown2:countDownx2
		    })
		    // If the count down is over, write some text 
		    if (distance1 < 0 && distance2 > 0) {
		        //clearInterval(this.x);
		         this.setState({
			    	countDown:"Contest Started!",
			    	running:true
			    })
		    }
		    if(distance1 < 0  && distance2 < 0){
		    	clearInterval(this.x);
		        this.setState({
			    	countDown:"Contest Finished!",
			    	running:false,
			    	countDown2:""
			    })
			    let id = this.state.id
			    console.log(id)
			    axios.post(`/api/contestfinished`,{id}).then(response => response.data)

		    }
		    if(distance1<0){
		    	this.setState({
			    	countDown2:countDownx2,
			    	running:true //has to be changed to false
			    })	
		    }		    	
		//}, 1000);
	}
	componentDidMount(){
		this.x = setInterval(this.timer.bind(this), 1000);
	}
	render(){
		return(
			<div className="container section_one">
				<div className="row">
					<div id="demo" className="col-md-8 whitebox">
						<h2>Upcoming Contest:</h2>
						<h3>{this.state.title}</h3>
						<h1>{this.state.countDown}</h1>
						<h1>{this.state.countDown2}</h1>
						{
							this.state.running?
								<Link to={{
									pathname:`contest/${this.state.id}`
								}}><button className="btn btn-primary">Enter Contest</button></Link>
							:null		
						}
						
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