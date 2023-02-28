// router.js
import {RouterMount,createRouter} from 'uni-simple-router';
import http from '@/utils/http.js';

const getSettings= ()=>{
	//let base = getApp().globalData.base;
	let base = 'https://www.xneice.com/wp-json/chat/v1/';
	return http.get(base+'settings', {});
}

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES],
	beforeProxyHooks: {
		onLoad:async (options, next)=>{
			console.log('onLoad before')
			if(Object.keys(getApp().globalData.settings).length == 0){
				const res = await getSettings();
				getApp().globalData.settings = res.data;
			}
			next([router.currentRoute.query]);
		},
	},
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log('前置守卫')
	console.log(to);
	
	// mutisite
	let data = getApp().globalData;
	if(data.multisite){
		if(to.query.site){
			next();
			return;
		}
		
		if(data.site == ''){
			return;
		}

		let query = to.query;
		query.site = data.site;
		
		next({
			path: to.path,
			query: query
		});

		return;
	}
	// end mutisite
	next();
	
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('后置守卫')
})

export {
	router,
	RouterMount
}