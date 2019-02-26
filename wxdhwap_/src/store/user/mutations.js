import * as types from './mutation-types'

export default{
	[types.LOGOUT]: (state, token) => {
		state.token = token
	},
	[types.GET_USERINFO]: (state, getuserinfo) =>{
		state.loginname = getuserinfo.loginname;
		state.roleName = getuserinfo.roleName;
		state.username = getuserinfo.username;
	},
	[types.SET_ROLEINFO]: (state, roleInfo) => {
		state.role = roleInfo;
	}
}