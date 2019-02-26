import * as types from './mutation-types';
import {removeToken} from '@/utils/auth'
import {currentUserInfo, logout} from '@/service/getData'
 
export default {
	logOut({ commit }) {
		return new Promise(async (resolve, reject) => {
			// let result = await logout();
			commit('LOGOUT', '')
			removeToken()
			resolve()
		}).catch(error => {
			reject(error)
        })
	},
	getUserInfo({commit}) {
		return new Promise(async (resolve, reject) => {
			let result = await currentUserInfo();
			commit('GET_USERINFO', result.data);
			resolve(result)
		}).catch(error => {
			reject(error)
        })
	},
	setRoleInfo({commit}, roleInfo) {
		commit('SET_ROLEUSERINFO', roleInfo);
	}
};