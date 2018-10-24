const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config=require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 13;

const adminSchema = mongoose.Schema({
	username:{
		type:String,
		required: true,
		unique:1
	},
	password:{
		type:String,
		minlength:6	
	},
	token:{
		type:String
	},
	fl:{
		type:String
	}
})
adminSchema.pre('save',function(next){//pre doesn't support ES6
	var user = this;
	if(user.isModified('password')){
		bcrypt.genSalt(SALT_I,(err,salt)=>{
			if(err)return next(err);
			bcrypt.hash(user.password,salt,(err,hash)=>{
				if(err)return next(err);
				user.password = hash;
				next();
			})
		})
	}
	else{
		next();
	}
})
adminSchema.methods.SaveToken = function(newToken, cb){
	var user = this;
	user.token = newToken;
	user.save(function(err,cb) {
		if(err) return cb(err);
	})
}

adminSchema.statics.findByToken = function(token, cb) {
	var user = this;
	jwt.verify(token,config.SECRET, function(err, decode){
		user.findOne({"_id":decode},function(err,user) {
			if(err)return cb(err);
			cb(null,user);
		})
	})
}
adminSchema.methods.deleteToken = function(token,cb){
	var user = this;
	user.update({$unset:{token:1}},(err,user)=>{
		if(err)return cb(err);
		cb(null,user)
	})
}
const Admin = mongoose.model('Admin',adminSchema)
module.exports = { Admin }