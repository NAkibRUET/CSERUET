export default function(state={},action){
	switch(action.type){
		case "USER_CHANGE_PASS":
			return {...state, changePass:action.payload}
		case "USER_FORGOT_CHECK":
			return {...state, checkForgot:action.payload}
		case "USER_FORGOT_PASS":
			return {...state, changePass:action.payload}
		case "USER_LOGIN":
			return {...state, login:action.payload}
		case "USER_AUTH":
			return {...state, login:action.payload}
		default:
			return state;
	}
}