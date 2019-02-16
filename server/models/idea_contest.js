const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 13;

const ideaSchema = mongoose.Schema({
	contest_id:{
		type:String
	},
	title:{
		type:String
	},
	roll:{
		type:String
	},
	starttime:{
		type:String
	},
	endtime:{
		type:String
	},
	filelink:{
		type:String
	},
	fl:{
		type:String
	}
})
const Idea = mongoose.model('Idea',ideaSchema)
module.exports = { Idea }