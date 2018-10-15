const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config=require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 13;

const user1Schema = mongoose.Schema({
	roll:{
		type:String,
		required: true,
		unique:1
	},
	password:{
		type:String,
		minlength:6	
	},
	password2:{
		type:String,
		minlength:6	
	},
	token:{
		type:String
	},
	code:{
		type:String
	},
	fl:{
		type:String
	}
})
user1Schema.pre('save',function(next){//pre doesn't support ES6
	var user = this;
	if(user.isModified('password2')){
		bcrypt.genSalt(SALT_I,(err,salt)=>{
			if(err)return next(err);
			bcrypt.hash(user.password2,salt,(err,hash)=>{
				if(err)return next(err);
				user.password2 = hash;
				next();
			})
		})
	}
	else{
		next();
	}
})


user1Schema.methods.SaveToken = function(newToken, cb){
	var user = this;
	user.token = newToken;
	user.save(function(err,cb) {
		if(err) return cb(err);
	})

}

user1Schema.statics.findByToken = function(token, cb) {
	var user = this;
	jwt.verify(token,config.SECRET, function(err, decode){
		user.findOne({"_id":decode},function(err,user) {
			if(err)return cb(err);
			cb(null,user);
		})
	})
}

user1Schema.methods.deleteToken = function(token,cb){
	var user = this;
	
	user.update({$unset:{token:1}},(err,user)=>{
		if(err)return cb(err);
		cb(null,user)
	})
}
const User1 = mongoose.model('User1',user1Schema)
module.exports = { User1 }