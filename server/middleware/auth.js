const { User1 } = require('./../models/user1');

let auth = (req, res, next)=>{
	let token = req.cookies.auth;
	User1.findByToken(token,(err,user)=>{
		if(err)throw err;
		if(!user)return res.json({
			error:true
		});
		req.token = token;
		req.user = user;
		next();
	})
}
module.exports = {auth}