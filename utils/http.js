//import store from '@/store/index.js';

class Http
{	
	static request(url, data = {}, method = "GET") {
		return new Promise(function(resolve, reject) {
			if (!data.notip) {
				uni.showLoading({
					title: '加载中'
				});
			}
			
			// add frontend
			let client = uni.getStorageSync('xenice_client');
			if(client){
				data.client = client;
			}
			// end add frontend
			
			// add header
			let header = {};
			let user = uni.getStorageSync('xenice_user');
			
			if(user && user.token && user.token != ''){
				header = { 
					'Authorization':user.token,
					'content-type':'application/json',
					//'content-type':'application/x-www-form-urlencoded',
				};
			}
			// end add header
			
			console.log(header);
			
			uni.request({
				url: url,
				data: data,
				header:header,
				method: method,
				success(res) {
					console.log(url);
					console.log(data);
					console.log(res);
					if (res.statusCode == 200 || res.statusCode == 201) {
						// set client id
						if(res.data && res.data.client){
							uni.setStorageSync('xenice_client', res.data.client);
						}
						// end set client id
						resolve(res);
						return;
					}
					reject(res);
				},
				fail(err) {
					reject(err);
				},
				complete() {
					uni.hideLoading();
				}
			});
		});
	}
	
	/**
	 * get请求
	 */
	static get(url, data = {}) {
		return this.request(url, data, 'GET');
	}
	
	/**
	 * post请求
	 */
	static post(url, data = {}) {
		return this.request(url, data, 'POST');
	}
	
	/**
	 * delete请求
	 */
	static delete(url, data = {}) {
		return this.request(url, data, 'DELETE');
	}
}

export default Http;