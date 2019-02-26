import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from './user/';
import tag from './tag/';

export default new Vuex.Store({
	modules: {
		user,
		tag
	}
});
