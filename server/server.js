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
	allowedFormats: ["jpg", "png" , "pdf", "docx"],
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
const { Admin } = require('./models/admin');
const { Idea } = require('./models/idea_contest');
const { Contest } = require('./models/contest');
const { Contestr } = require('./models/contest_rank');
const { auth } = require('./middleware/auth');
const { adminAuth } = require('./middleware/admin_auth');


app.use(bodyParser.json());
app.use(cookieParser());

//Contests
app.get('/api/contests',(req,res)=>{
	Contest.findOne({'fl':'0'}).sort({starttime:'asc'}).exec((err,doc)=>{
		if(err)return res.status(400).send(err);
		res.send(doc);
	})
})
app.get('/api/contestinfo',(req,res)=>{
	Contest.findOne({'_id':req.query.id},(err,doc)=>{
		if(err)return res.status(400).send(err);
		res.send(doc);
	})	
})
app.post('/api/contestfinished',(req,res)=>{
	let id = req.body.id;
	Contest.findOneAndUpdate({'_id':id}, {$set:{fl:1}},{new:true},(err,doc)=>{
		if(err)return res.status(400).send(err);
		res.sendStatus(200);	
	})
})
app.post('/api/setcontest',(req,res)=>{
	let Type = req.body.contestType;
	let title = req.body.Title;
	let date = req.body.Date;
	let start = req.body.Start;
	let end = req.body.End;
	let description = req.body.Description;
	//console.log(contestType)
	let starttime = date + "T" + start +"Z";
	let endtime =  date + "T" + end +"Z";
	let fl = 0;
	console.log(title)
	//console.log(date)
	console.log(starttime)
	console.log(endtime)

	if(starttime > endtime){
		console.log("Bad calc");
	}
	else{
		console.log("Good Calc");
	}
	
	const contest = new Contest({contestType:`${Type}`,title:`${title}`,starttime:`${starttime}`,endtime:`${endtime}`,description:`${description}`,fl:`${fl}`});

	contest.save((err,doc)=>{
		if(err)return res.status(400)
		if(doc){
			res.json({
				message:"New Contest Created"
			})
		}
	});

})
app.post('/api/contestsubmit',parser.single('file'),(req,res)=>{
	let uploadFile = req.file;

  	const fileName = uploadFile.url;
  	console.log(fileName)
  	//console.log(uploadFile.url)
	let contestId = req.body.contestId;
	let roll = req.body.roll;
	console.log(roll);
	console.log(contestId);
	const contestsave = new Contestr({contestId:`${contestId}`,roll:`${roll}`,file:`${fileName}`,submittedOrNot:'1'});
	contestsave.save((err,doc)=>{
		if(err)return res.status(400)
		res.json({
			message: "Submitted Successfully, Thanks for your participation."
		})
	})

})
app.post('/api/time',(req,res)=>{
	if(new Date("2016-07-25T00:01:21Z") < new Date("2018-07-25T00:01:22Z")){
		console.log("Nakib")
	}
	else{
		console.log("none")
	}
	let time = req.body.time;
	const idea1 = new Idea({starttime:`${time}`});
	idea1.save((err,doc)=>{
		if(err)return res.status(400)
		res.send(doc)
	})
})

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

app.get('/api/adminauth',adminAuth,(req,res)=>{

	res.json({
		isAdmin:true,
		id:req.user._id,
		username:req.user.username
	})
})

app.get('/api/logout',auth,(req,res)=>{
	req.user.deleteToken(req.token,(err,user)=>{
		if(err)return res.status(400).send(err);
		res.sendStatus(200); 
	})
	res.clearCookie("auth");
})

app.get('/api/adminlogout',adminAuth,(req,res)=>{
	req.user.deleteToken(req.token,(err,user)=>{
		if(err)return res.status(400).send(err);
		res.sendStatus(200); 
	})
	res.clearCookie("admin");	
})
app.post('/api/register',(req,res)=>{
	let pass = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$";

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
		}
		else{
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
app.get('/api/getCode',(req,res)=>{
	let roll = req.query.roll;
	User1.findOne({roll:`${roll}`},(err,user)=>{
		if(err)return res.send(err);
		if(user){
			res.json({
				success:true,
				code: user.code
			})
		}else{
			res.json({
				success:false
			})
		}
	})
})
app.post('/api/forgotPassword',(req,res)=>{
	let roll = req.body.roll;
	let newPassword = req.body.newPassword;
	let confNewPass = req.body.confNewPassword;
	console.log(roll);
	console.log(newPassword);
	//console.log(newPassword);
	if(newPassword===confNewPass){
		bcrypt.genSalt(SALT_I,(err,salt)=>{
			if(err) return res.send(err)
			bcrypt.hash(confNewPass,salt,(err,hash)=>{
				if(err)return res.send(err)
				let code = "";
				let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$";
				for (let i = 0; i < 15; i++)
				   code += possible.charAt(Math.floor(Math.random() * possible.length));
				User1.findOneAndUpdate({roll: `${roll}`}, {$set:{password2:`${hash}`,code:`${code}`}},{new:true},(err,user)=>{
					console.log("Nakib")
					if(user){
						//console.log("Nakib")			
						res.json({
							success:true,
							message:"Successfully Changed Password"
						})
					}
					else{
						res.json({
							success:false,
							message:"Something Went Wrong"
						})	
					}
				})
			})
		})
	}else{
		res.json({
			success:false,
			message: "New Password and Confirm Password doesn't match"
		})
	}
})

app.post('/api/changePassword',(req,res)=>{
	let roll = req.body.roll;
	
	let oldPass = req.body.oldPassword;
	let newPass = req.body.newPassword;
	let confNewPass = req.body.confNewPassword;
	//console.log(roll);
	//console.log(oldPass);
	//console.log(newPass);
	//console.log(confNewPass);

	if(newPass === confNewPass){
		bcrypt.genSalt(SALT_I,(err,salt)=>{
			if(err) return res.send(err)
			bcrypt.hash(confNewPass,salt,(err,hash)=>{
				if(err)return res.send(err)
				confNewPass = hash;//hudai
				
				User1.findOne({roll:`${roll}`},(err,userx)=>{
					if(userx.fl==="0"){
						User1.findOneAndUpdate({roll: `${roll}`,password:`${oldPass}`}, {$set:{password2:`${hash}`,fl:"1"}},{new:true},(err,user)=>{
							if(err)return res.status(400).send(err);
							if(!user){
								res.json({
									passChange:false,
									Message:"Old Password Doesn't match"
								})
							}else{
								res.json({
									passChange:true,
									Message:"Successfully changed password"
								})
							}
						})		
					}else if(userx.fl==="1"){
						bcrypt.compare(req.body.oldPassword,userx.password2,(err,isMatch)=>{if(isMatch){
								User1.findOneAndUpdate({roll: `${roll}`}, {$set:{password2:`${hash}`,fl:"1"}},{new:true},(err,user)=>{
									if(err)return res.status(400).send(err);
									if(!user){
										res.json({
											passChange:false,
											Message:"Not Successful"
										})
									}else{
										res.json({
											passChange:true,
											Message:"Successfully changed password"
										})
									}
								})		
							}
							else{
								res.json({
									passChange:false,
									Message:"Old Password Doesn't match"
								})
							}	
						})	
					}
				})
			})
		})
	}
	else{
		res.json({
			passChange:false,
			Message:"New Password and Confirm Password doesn't match"
		})
	}
})
app.post('/api/adminlogin',(req,res)=>{
	let username = req.body.username;
	let password = req.body.password;
	//console.log(password);
	Admin.findOne({'username':req.body.username},(err,user)=>{
		if(err)return res.status(400)
		if(!user)return res.json({
			isAdmin:false,
			Message:"Wrong Username"
		})
		bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
			if(err)throw err;
			if(!isMatch)return res.json({
				isAdmin:false,
				Message:"Password Doesn't Match"		
			})
			else{
				let token = jwt.sign(user._id.toHexString(),config.SECRET);
				user.token = token;
				
				user.SaveToken(token,(err,user)=>{

				})				
				console.log(new Date());
				res.cookie('admin', token, {maxAge : 24*8*3600000}).json({
					isAdmin:true,
					Message:"Password Matched"		
				});
				/*res.cookie('auth',token).json({
					isAuth:true,
					Message:"Password Matched"		
				})*/
			}
		})	
	})
})
app.post('/api/adminregistration',(req,res)=>{
	let username = req.body.username;
	let pass = req.body.password;
	const admin = new Admin({username:`${username}`,password:`${pass}`});
	admin.save((err,doc)=>{
		if(err)return res.status(400)
		res.send(doc);
	})
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
	//console.log(roll)
	User1.findOne({roll: `${roll}`},(err,user1)=>{
		if(user1){
			if(user1.fl=="0"){
				res.json({
					success:false,
					Message:"You haven't ever changed your password. Please use the password we provided you."
				})
			}
			else if(user1.fl=="1"){
				let code = user1.code;
				
				User2.findOne({roll: `${roll}`},(err,user2)=>{
					if(user2.fl){
						if(user2.fl=="0"){
							res.json({
								success:false,
								Message:"You haven't provided your email. You cannot reset your password. Please contact your CR."
							})
						}
						else if(user2.fl=="1"){
							let emailaddress = user2.email;
						    const output= `
						    <p>Hi ${roll}, Please follow the link to reset your password</p>
						    <a href="http://localhost:3000/forgot_Password/${roll}/${code}"><p style="font-weight:bold">http://localhost:3000/forgot_Password?user=${roll}&code=${code}</p></a>
						    
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
						        	success:true,
						        	Message:'Email has been sent, Please check your mail and follow further steps'
						        })
						    });
						    
						}

					}		
				})		
			}
		}
		else{
			res.json({
				success:false,
				Message:"User don't exist"
			})
		}
	})
})
const port = process.env.PORT || 3001;

app.listen(port,()=>{
	console.log('Server Running');
})

/***
	// Set the date we're counting down to
	var countDownDate = new Date("2018-11-22T01:59Z");
	countDownDate.setHours(countDownDate.getHours() - 6);
	// Update the count down every 1 second
	var x = setInterval(function() {

	    // Get todays date and time
	    var now = new Date();
	    console.log(now)
	    
	    // Find the distance between now and the count down date
	    var distance = countDownDate - now;
	    
	    
	    // Time calculations for days, hours, minutes and seconds
	    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	    
	    // Output the result in an element with id="demo"
	    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
	    + minutes + "m " + seconds + "s ";
	    
	    // If the count down is over, write some text 
	    if (distance < 0) {
	        clearInterval(x);
	        document.getElementById("demo").innerHTML = "EXPIRED";
	    }
	}, 1000);

	*/