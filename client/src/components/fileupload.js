import React from 'react';
import axios from 'axios';
import ReactCrop from 'react-image-crop';
class FileUpload extends React.Component{
	state={
		selectedFile: null, 
		loaded: 0,
		name:'',
		lastname:''
	}
	 
	handleselectedFile = event => {
	    this.setState({
	      selectedFile: event.target.files[0],
	      loaded: 0,
	    })
	}
	handleName=(event)=>{
		this.setState({name:event.target.value});
	}

	handleLastname=(event)=>{
		this.setState({lastname:event.target.value});
	}
	handleUpload = () => {
	    const data = new FormData();
	    console.log(this.state);
	    data.append('file', this.state.selectedFile, this.state.selectedFile.name)
	    data.append('name',this.state.name);
	    data.append('lastname',this.state.lastname);
	    axios
	      .post('/api/upload', data, {
	        onUploadProgress: ProgressEvent => {
	          this.setState({
	            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
	          })
	        },
	      })
	      .then(res => {
	        console.log(res.statusText)
	      })

  	}
  
	render(){
		return(
			<div>
				<div className="">
			        <input type="text"
						placeholder="Enter name"
						onChange={this.handleName}/>
			        <input type="text"
						placeholder="Enter name"
						onChange={this.handleLastname}/>
			        <input type="file" name="" id="" onChange={this.handleselectedFile} />
						        
			        <button onClick={this.handleUpload}>Upload</button>
			    	<div> {Math.round(this.state.loaded,2) } %</div>
			    </div>
			</div>
		)
	}
}
export default FileUpload;