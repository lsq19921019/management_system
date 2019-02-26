import router from './index.js'
import { getToken } from '@/utils/auth'
import store from '../store'

const whiteList = ['/login']// 不重定向白名单

router.beforeEach((to, from, next) => {
	
	if(getToken()){ // 判断是否有token
		if(to.path === '/login'){
			next({ 
				path: '/',
				query: {
					redirect: to.path.slice(1)
				} 
			})
		}else{
			store.dispatch('user/getUserInfo').then(res => {
				if(res.data == '-3'){
					// 登陆态失效，跳登录
					store.dispatch('user/logOut').then(()=>{
						next({ 
							path: '/login',
							query: {
								redirect: to.path.slice(1)
							} 
						})
					});
				}else{
					next();
				}
			});
		}
	}else{
		if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next()
		}else{
			next({ 
				path: '/login',
				query: {
					redirect: to.path.slice(1)
				} 
			})	
		}	
		
	}
});