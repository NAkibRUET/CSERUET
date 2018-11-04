export default function(state={},action){
	switch(action.type){
		case "ADMIN_AUTH":
			return {...state, adminLogin:action.payload}
		case "ADMIN_LOGIN":
			return {...state, adminLogin:action.payload}
		case "ADMIN_POST":
			return {...state, adminPost:action.payload}
		default:
			return state;
	}
}