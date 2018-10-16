import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
//import { connect } from 'react-redux';
//import {ProUpdate} from '../actions'
import {image64toCanvasRef,
        extractImageFileExtensionFromBase64,
        base64StringtoFile,
        downloadBase64File} from '../../imageCropping/image_crop';
const imageMaxSize= 10000000;
const acceptedFileType= 'image/x-png, image/png,image/jpg,image/jpeg,image/gif';
const acceptedFileTypeArray= acceptedFileType.split(",").map((item)=>{return item.trim()})
class ProfileUpdate extends React.Component{

    imagePreviewCanvasRef= React.createRef();
    state={
        imgSrc:null,
        crop:{
            aspect: 1/1
        },
        loaded: 0,
        success:false
    } 	
    handleUpload = () => { 
        const canvasRef= this.imagePreviewCanvasRef.current
 
        const fileExtension= extractImageFileExtensionFromBase64(this.state.imgSrc)
        const imageData64= canvasRef.toDataURL('image/'+fileExtension)  
        //this is the cropped image
        const myFilename= "myfile" + Date.now()+'.' +fileExtension
 
        //file to be uploaded
        const newCroppedFile= base64StringtoFile(imageData64,myFilename)
        const data = new FormData()
 		let roll = this.props.user.login.roll;
	    data.append('file', newCroppedFile, myFilename)
 		data.append('roll', roll)
	    axios
	      .post('/api/updateImage', data, {
	        onUploadProgress: ProgressEvent => {
	          this.setState({
	            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
	            success:true
	          })
	        },
	      })
	      .then(res => {
	        console.log(res.statusText)
	      })
 
  	}
 
    verifyFile = (file)=>{
        const currentFile= file[0]
        const currentFileType= currentFile.type
        const currentFileSize= currentFile.size
 
        if(currentFileSize>imageMaxSize){
            alert ('the file is too big');
            return false;
        }
        else if (!acceptedFileTypeArray.includes(currentFileType)){
            alert('Only Image file is allowed');
            return false
        }
        else{
            return true;
        }
 
    }
 
    handleOnDrop= (files,rejectedFiles)=>{
        //console.log(files);
        //console.log('rejected',rejectedFiles)
        if(rejectedFiles && rejectedFiles.length>0){
           this.verifyFile(rejectedFiles);
        } 
        if (files && files.length>0){ 
           const isverified= this.verifyFile(files);
           if(isverified){
                const currentFile= files[0];
                const reader= new FileReader();
                reader.addEventListener("load",()=>{
                    this.setState({
                        imgSrc: reader.result
                    })
                },false) 
                 reader.readAsDataURL(currentFile);
 
           }
        }
    }
    handleOnCropChange = (crop)=>{
        //console.log(crop);
        this.setState({crop:crop})
        //console.log(this.state)
    }
    handleOnCropComplete= (crop,pixelCrop)=>{
        //console.log(crop,pixelCrop)
        const canvasRef= this.imagePreviewCanvasRef.current
        const imgSrc= this.state.imgSrc
        image64toCanvasRef(canvasRef,imgSrc,pixelCrop)
 	}
 
    /*handleDownloadClick=(e)=>{
        e.preventDefault();
        const imgSrc= this.state.imgSrc //this is the original image
        if(imgSrc){
            const canvasRef= this.imagePreviewCanvasRef.current
 
            const fileExtension= extractImageFileExtensionFromBase64(imgSrc)
            const imageData64= canvasRef.toDataURL('image/'+fileExtension)  //this is the cropped image
 
            const myFilename= "myfile." + fileExtension
 
            //file to be uploaded
            const newCroppedFile= base64StringtoFile(imageData64,myFilename)
            console.log(newCroppedFile) //this is the cropped image file
 
            //download file
            downloadBase64File(imageData64,myFilename);
            this.handleClearToDefault()
 
        }
 
 
 
    }
 	*/
    handleClearToDefault = (e)=>{
        e.preventDefault();
        const canvas= this.imagePreviewCanvasRef.current
        const ctx= canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width,canvas.height)
 
        this.setState({
            imgSrc:null,
            crop:{
                aspect: 1/1
            }
        })
 
    }
    render() {
        const {imgSrc}= this.state;
        return (
            <div>
            {imgSrc!== null?
            <div>
                <ReactCrop  style={{width:"300px"}}
                    src={imgSrc} 
                    crop={this.state.crop}
                    onChange={this.handleOnCropChange} 
                    onImageLoaded={this.handleImageLoaded}
                    onComplete={this.handleOnCropComplete}
                             />

                    <br/>
                    <h5>Please Crop First then Press Upload Button, or it will be a blank image.</h5>
                    <p>Preview</p>
                    <canvas style={{width:"250px"}} ref={this.imagePreviewCanvasRef} ></canvas>
                    <br/>
                    <button onClick={this.handleClearToDefault} >Clear</button>
                    <button onClick={this.handleUpload} >Upload</button>
                    <div> {Math.round(this.state.loaded,2) } %</div>

            </div>

             :<div>
                      <h1>Drop zone</h1>
                      <Dropzone  onDrop={this.handleOnDrop} accept={acceptedFileType} maxSize={imageMaxSize} >Drop file here</Dropzone>


             </div>

            }
            {this.state.success?
            <Link to="/profile">Go Back</Link>
            :null}
        </div>

        );
    }
}
export default ProfileUpdate;