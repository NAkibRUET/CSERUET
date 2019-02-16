import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import {loginUser} from '../actions';

class contestPage extends React.Component{
	state={
		id:'',
		roll:'',
		type:'',
		countDown2:'',
		title:'',
		starttime:'',
		endtime:'',
		running:'',
		selectedFile: null, 
		loaded: 0,
		name:'',
		lastname:'',
		successmsg:'',
		confwait:2
	}
	
	handleselectedFile = event => {
	    this.setState({
	      selectedFile: event.target.files[0],
	      loaded: 0,
	    })
	}
	/*handleName=(event)=>{
		this.setState({name:event.target.value});
	}

	handleLastname=(event)=>{
		this.setState({lastname:event.target.value});
	}*/
	handleUpload = (e) => {
		
		
	    const data = new FormData();
	    console.log(this.state);
	    data.append('file', this.state.selectedFile, this.state.selectedFile.name)
	    data.append('contestId',this.state.id);
	    data.append('roll',this.state.roll);
	    axios
	      .post('/api/contestsubmit', data, {
	        onUploadProgress: ProgressEvent => {
	          this.setState({
	            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
	            confwait:0
	          })
	        },
	      })
	      .then(response => {
	        this.setState({
	        	successmsg: response.data.message,
	        	confwait:1
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
		    /*let countDownx = days + "d : " + hours + "h : "+ minutes + "m : " + seconds + "s ";
		    this.setState({
		    	countDown:countDownx
		    })
			*/
		    let countDownx2 = hours1 + "h : "+ minutes1 + "m : " + seconds1 + "s ";
		    this.setState({
		    	countDown2:countDownx2
		    })
		    // If the count down is over, write some text 
		    /*if (distance1 < 0 && distance2 > 0) {
		        //clearInterval(this.x);
		         this.setState({
			    	countDown:"Contest Started!",
			    	running:true
			    })
		    }*/
		    if(distance1 < 0  && distance2 < 0){
		    	clearInterval(this.x);
		        this.setState({
			    	countDown2:"Contest Finished!",
			    	running:false
			    })
			    let id = this.state.id
			    console.log(id)
			    axios.post(`/api/contestfinished`,{id}).then(response => response.data)

		    }
		    if(distance2>0){
		    	this.setState({
			    	running:true //has to be changed to false
			    })	
		    }		    	
		//}, 1000);
	}
	componentDidMount(){
		this.x = setInterval(this.timer.bind(this), 1000);
	}
	/*submitForm = (e)=>{
		e.preventDefault();
		console.log(this.state);
		//this.props.dispatch(loginUser(this.state));
	}
	
	handleInputEmail=(event)=>{
		this.setState({roll:event.target.value});
	}
	handleInputPassword=(event)=>{
		this.setState({password:event.target.value});
	}*/
	componentWillMount(){
		let id = this.props.match.params.id;
		let roll = this.props.user.login.roll;
		console.log(roll)
		axios.get(`/api/contestinfo?id=${id}`).then(response=>{
			this.setState({
				id:response.data._id,
				roll:roll,
				type:response.data.contestType,
				title:response.data.title,
				starttime:response.data.starttime,
				endtime:response.data.endtime
			})
		})	
	}
	componentWillReceiveProps(nextProps){
		/*if(nextProps.user.login.isAuth){
			this.props.history.push('/profile');
			this.setState({success:true});
		}*/
	}
	render(){
		let user = this.props.user;

		return(
			<div className="">
				<h2>{this.state.title}</h2>
				<h1>{this.state.countDown2}</h1>
				
				
				<input type="file" name="" id="" onChange={this.handleselectedFile} />
				<button onClick={this.handleUpload}>Submit</button>
				{
					this.state.confwait==0?
					<div><h5 style={{color:"green",fontWeight:"bold"}}>Please wait for confirmation</h5></div>
					:null
				}
				{
					this.state.successmsg?
					<div><h5 style={{color:"green",fontWeight:"bold"}}>{this.state.successmsg}</h5></div>
					:null
				}
				{
					this.state.selectedFile?
					<div><h5 style={{color:"red",fontWeight:"bold"}}>{Math.round(this.state.loaded,2) } %</h5></div>
					:null
				}
				{
					!this.state.running?
						<Link to="/"><button className="btn btn-primary">Go Back</button></Link>
					:null
				}			
			</div>
		)
	}
}
function mapStateToProps(state){
	console.log(state.user)
	return{
		user:state.user
	}
}
export default connect(mapStateToProps)(contestPage);