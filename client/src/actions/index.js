import axios from 'axios';
export function loginUser({roll,password}){
	const request = axios.post(`/api/login`,{roll,password}).then(response => response.data)
	return{
		type:"USER_LOGIN",
		payload:request
	}
}
export function loginAdmin({username,password}){
	const request = axios.post(`/api/adminlogin`,{username,password}).then(response => response.data)
	return{
		type:"ADMIN_LOGIN",
		payload:request
	}
}
export function adminPost({contestType,Title,Date,Start,End,Description}){
	const request = axios.post(`/api/setcontest`,{contestType,Title,Date,Start,End,Description}).then(response => response.data)
	return{
		type:"ADMIN_POST",
		payload:request
	}
}
export function changePass({roll,oldPassword,newPassword,confNewPassword}){
	const request = axios.post(`/api/changePassword`,{roll,oldPassword,newPassword,confNewPassword}).then(response => response.data)
	return{
		type:"USER_CHANGE_PASS",
		payload:request
	}
}
export function forgotCheck({roll}){
	const request = axios.post(`/api/send`,{roll}).then(response => response.data)
	return{
		type:"USER_FORGOT_CHECK",
		payload:request
	}
}

export function forgotPass({roll,newPassword,confNewPassword}){
	const request = axios.post(`/api/forgotPassword`,{roll,newPassword,confNewPassword}).then(response => response.data)
	return{
		type:"USER_FORGOT_PASS",
		payload:request
	}
}
export function auth() {
	const request = axios.get(`/api/auth`).then(response=>response.data)
	return{
		type:"USER_AUTH",
		payload:request
	}
}
export function adminAuth() {
	const request = axios.get(`/api/adminAuth`).then(response=>response.data)
	return{
		type:"ADMIN_AUTH",
		payload:request
	}
}