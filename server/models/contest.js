const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config=require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 13;

const contestSchema = mongoose.Schema({
	contestType:{
		type:String
	},
	title:{
		type:String
	},
	starttime:{
		type:String
	},
	endtime:{
		type:String
	},
	description:{
		type:String
	},
	fl:{
		type:String
	}
})
const Contest = mongoose.model('Contest',contestSchema)
module.exports = { Contest }