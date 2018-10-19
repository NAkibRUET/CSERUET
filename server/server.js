const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const nodemailer= require('nodemailer');
const bcrypt = require('bcrypt');
const SALT_I = 13;
const jwt = require('jsonwebtoken');
const app = express();
const config=require('./config/config').get(process.env.NODE_ENV);


const multer = require('multer');
const cloudinary= require('cloudinary');
const cloudinaryStorage=require('multer-storage-cloudinary');
cloudinary.config({
	cloud_name:'dqy6iuhux',
	api_key:'275867933237251',
	api_secret:'_TzLf2JqWN3HptUSLZloCtCgAw4'
});
const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: "test",
	allowedFormats: ["jpg", "png"],
	transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage })


mongoose.Promise = global.Promise;
//mongoose.connect(config.DATABASE);
mongoose.connect(config.DATABASE, function() { /* dummy function */ })
    .then(() => {
        console.log("Mongo Running");
    })
    .catch(err => { // mongoose connection error will be handled here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

const { User1 } = require('./models/user1');
const { User2 } = require('./models/user2');
const { auth } = require('./middleware/auth');


app.use(bodyParser.json());
app.use(cookieParser());
//User
app.get('/api/profiledata',(req,res)=>{
	//console.log(req.query.roll)
	User2.findOne({'roll':req.query.roll},(err,exist)=>{
		if(err)return res.status(400).send(err);
		if(!exist){ 
			res.json({
				message:"Not exist"
			})
		}
		else{
			res.send(exist)
		}
	})
})
app.post('/api/updateImage',parser.single('file'),(req,res)=>{
	let uploadFile = req.file;

  	const fileName = req.file.name;
  	console.log(uploadFile.url)
  	let roll = req.body.roll;
  	console.log(roll)
  	User2.findOneAndUpdate({roll: `${roll}`}, {$set:{image:`${uploadFile.url}`}},{new:true},(err,user)=>{
		if(err)return res.status(400).send(err);
		if(user){
			res.json({
				message:"Successfully Updated Image"
			})
		}
  	})
})

app.post('/api/updateProfileInfo',(req,res)=>{
	let roll = req.body.roll;
  	let name = req.body.name;
  	let email = req.body.email;
  	let blood = req.body.blood;
  	let fl = "0";
  	if(email){
  		fl = "1";
  	}
  	//console.log(name);
  	//console.log(roll);
  	User2.findOneAndUpdate({roll: `${roll}`}, {$set:{name:`${name}`,email: `${email}`,blood: `${blood}`,fl:`${fl}`}},{new:true},(err,user)=>{
		if(err)return res.status(400).send(err);
		if(user){
			res.json({
				message:"Successfully Updated Profile Info"
			})
		}
  	})
  	
})

app.get('/api/auth',auth,(req,res)=>{

	res.json({
		isAuth:true,
		id:req.user._id,
		roll:req.user.roll
	})
})

app.get('/api/logout',auth,(req,res)=>{
	req.user.deleteToken(req.token,(err,user)=>{
		if(err)return res.status(400).send(err);
		res.sendStatus(200); 
	})
	res.clearCookie("auth");
})

app.post('/api/register',(req,res)=>{
	let pass = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#";

	for (let i = 0; i < 8; i++)
	   pass += possible.charAt(Math.floor(Math.random() * possible.length));

	let code = "";
	for (let i = 0; i < 15; i++)
	   code += possible.charAt(Math.floor(Math.random() * possible.length));
	let roll = req.body.roll;
	console.log(roll);
	let fl = 0;
	const user = new User1({roll:`${roll}`,password:`${pass}`,code:`${code}`,fl:`${fl}`});
	const user2 = new User2({roll:`${roll}`});
	User1.findOne({'roll':`${roll}`},(err,exist)=>{
		if(!exist){
			user.save((err,doc)=>{
				if(err)return res.status(400)
			})
			user2.save((err,doc)=>{
				if(err)return res.status(400)
				res.status(200).json({
					Message: "Successfully Updated"
				})
			})
		}else{
			res.json({
				message:"User already exist"
			})
		}
	})
	
})
app.get('/api/showallusers',(req,res)=>{
	User1.find().select('-_id').select('-code').select('-token').select('-fl').select('-__v').exec((err,doc)=>{
		if(err)return res.status(400).send(err);
		res.send(doc);
	})
})
app.post('/api/changePassword',(req,res)=>{
	let roll = req.body.roll;
	
	let oldPass = req.body.oldPassword;
	let newPass = req.body.newPassword;
	let confNewPass = req.body.confNewPassword;
	
	if(newPass === confNewPass){
		bcrypt.genSalt(SALT_I,(err,salt)=>{
			if(err) return res.send(err)
			bcrypt.hash(confNewPass,salt,(err,hash)=>{
				if(err)return res.send(err)
				confNewPass = hash;
				User1.findOneAndUpdate({roll: `${roll}`,password:`${oldPass}`}, {$set:{password2:`${hash}`,fl:"1"}},{new:true},(err,user)=>{
					if(err)return res.status(400).send(err);
					if(!user){
						res.json({
							message:"Old Password Doesn't match"
						})
					}
					res.send(user)
				})
		
			})
		})
	}
})
app.post('/api/login',(req,res)=>{
	User1.findOne({'roll':req.body.roll},(err,user)=>{
		if(!user)return res.json({
			isAuth:false,
			Message:"User Doesn't exists"
		})
		if(user.fl==="0"){
			if(user.password !== req.body.password){
				return res.json({
					isAuth:false,
					Message:"Password Doesn't Match"
				})		
			}
			else{
				let token = jwt.sign(user._id.toHexString(),config.SECRET);
				user.token = token;
				
				user.SaveToken(token,(err,user)=>{

				})				
				console.log(new Date());
				res.cookie('auth', token, {maxAge : 24*8*3600000}).json({
					isAuth:true,
					Message:"Password Matched"		
				});
				/*res.cookie('auth',token).json({
					isAuth:true,
					Message:"Password Matched"		
				})*/
			}
		}
		else if(user.fl==="1"){
			bcrypt.compare(req.body.password,user.password2,(err,isMatch)=>{
				if(err)throw err;
				if(!isMatch)return res.json({
					isAuth:false,
					Message:"Password Doesn't Match"		
				})
				else{
					let token = jwt.sign(user._id.toHexString(),config.SECRET);
					user.token = token;
					
					user.SaveToken(token,(err,user)=>{

					})				
					console.log(new Date());
					res.cookie('auth', token, {maxAge : 24*8*3600000}).json({
						isAuth:true,
						Message:"Password Matched"		
					});
					/*res.cookie('auth',token).json({
						isAuth:true,
						Message:"Password Matched"		
					})*/
				}
			})
		}
	})
})
app.post('/api/send',(req,res)=>{
	let roll = req.body.roll;
	User1.findOne({roll: `${roll}`},(err,user1)=>{
		if(user1.fl=="0"){
			res.json({
				Message:"You haven't ever changed your password. Please contact your CR. He/She knows what to do"
			})
		}
		else if(user1.fl=="1"){
			let code = user1.code;
			
			User2.findOne({roll: `${roll}`},(err,user2)=>{
				if(user2.fl){
					if(user2.fl=="0"){
						res.json({
							Message:"You haven't provided your email. You cannot reset your password. Please contact your CR."
						})
					}
					if(user2.fl=="1"){
						let emailaddress = user2.email;
					    const output= `
					    <p>Hi ${roll}, Please follow the link to reset your password</p>
					    <a href="http:localhost:3000/forgotPassword/${roll}/${code}"><p style="font-weight:bold">http:localhost:3000/forgotPassword?user=${roll}&code=${code}</p></a>
					    
					    `
					 
					    let transporter = nodemailer.createTransport({
					        host: 'in-v3.mailjet.com',
					        port: 587,
					        secure: false, // true for 465, false for other ports
					        auth: {
					            user: 'cf9583c83ea5f6fd61bc10a57a64a716', // generated ethereal user
					            pass: '5a120de9a4bea34891253d34705a628a' // generated ethereal password
					        },
					        tls:{
					            rejectUnauthorized: false
					        }
					    });
					 
					    // setup email data with unicode symbols
					    let mailOptions = {
					        from: '"RUET CSE" <iafbd24@gmail.com>', // sender address
					        to: emailaddress, // list of receivers
					        subject: 'Reset Password', // Subject line
					        //
					        html: output // html body
					    };
					 
					    // send mail with defined transport object
					    transporter.sendMail(mailOptions, (error, info) => {
					        if (error) {
					            return console.log(error);
					        }
					        console.log('Message sent: %s', info.messageId);
					        // Preview only available when sending through an Ethereal account
					        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
					 
					        //res.render('contact',{msg:'email has been sent'})
					        res.json({
					        	message:'email has been sent'
					        })
					    });
					    /*let code = "";
						for (let i = 0; i < 15; i++)
						   code += possible.charAt(Math.floor(Math.random() * possible.length));
					    User1.findOneAndUpdate({roll:`${roll}`}, {$set:{code:`${code}`}},(err,user)=>{

						})*/					
					}

				}		
			})		
		}
	})
	
 
})
const port = process.env.PORT || 3001;

app.listen(port,()=>{ //check if the server is running or not
	console.log('Server Running');
})
