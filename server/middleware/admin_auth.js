const { Admin } = require('./../models/admin');

let adminAuth = (req, res, next)=>{
	let token = req.cookies.admin;
	Admin.findByToken(token,(err,user)=>{
		if(err)throw err;
		if(!user)return res.json({
			error:true
		});
		req.token = token;
		req.user = user;
		next();
	})
}
module.exports = {adminAuth}