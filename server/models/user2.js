const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const SALT_I = 10;

const user2Schema = mongoose.Schema({
	roll:{
		type:String,
		required: true,
		unique:1
	},
	name:{
		type:String,
		required: true,
	},
	email:{
		type:String,
	},
	blood:{
		type:String,
	},
	image:{
		type:String,
	}
})
const User2 = mongoose.model('User2',user2Schema)
module.exports = { User2 }