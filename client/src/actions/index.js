import axios from 'axios';
export function loginUser({roll,password}){
	const request = axios.post(`/api/login`,{roll,password}).then(response => response.data)
	return{
		type:"USER_LOGIN",
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
export function auth() {
	const request = axios.get(`/api/auth`).then(response=>response.data)
	return{
		type:"USER_AUTH",
		payload:request
	}
}
export function addBook(book) {
	const request = axios.post('/api/book',book).then(response=>response.data)
	return{
		type:"ADD_BOOK",
		payload:request
	}
}

export function getUserPost(userId) {
	const request = axios.get(`/api/user_post?user=${userId}`).then(response=> response.data);
	return{
		type:"GET_USER_POST",
		payload:request	
	}
}