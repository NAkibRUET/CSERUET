const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config=require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 13;

const contestrSchema = mongoose.Schema({
	contestId:{
		type:String
	},
	roll:{
		type:String
	},
	file:{
		type:String
	},
	judgeMark1:{
		type:String
	},
	judgeMark2:{
		type:String
	},
	judgeMark3:{
		type:String
	},
	judgeMark4:{
		type:String
	},
	judgeMark5:{
		type:String
	},
	position:{
		type:String
	},
	submittedOrNot:{
		type:String
	},
	fl:{
		type:String
	}
})
const Contestr = mongoose.model('Contestr',contestrSchema)
module.exports = { Contestr }