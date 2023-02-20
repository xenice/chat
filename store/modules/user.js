export default {
    namespaced: true,
    state: {
        user:{}
    },
	getters: {
		getToken(state){
		    if(state.user){
		    	return state.user.token;
		    }
		},
		
	},
	mutations: {
		read(state) {
			let user = uni.getStorageSync('xenice_user');
			if (!user) {
				user = {};
			}
			state.user = user;
		},
		save(state) {
			uni.setStorageSync('xenice_user', state.user);
		},
		setUser(state, user) {
			state.user = user;
			this.commit('user/save');
		},
		clearUser(state) {
			state.user = {};
			this.commit('user/save');
		}
	},
    actions: {},
    
};