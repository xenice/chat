<script>
	import store from '@/store/index.js';
	
	export default {
		globalData: {
			// multisite
			multisite: false,
			site: '',
			// end multisite
			
			server: 'https://www.xneice.com/',
			slug: 'wp-json/chat/v1/',
			base: '',
			settings:{}
		},
		onLaunch: function(options) {
			console.log('App Launch')
			
			// multisite
			if(this.globalData.multisite){
				if(options.query && options.query.site){
					this.globalData.site = options.query.site;
				}
				this.globalData.base = this.globalData.server + this.globalData.site + '/' + this.globalData.slug;
				return;
			}
			// end multisite

			this.globalData.base = this.globalData.server + this.globalData.slug;
			
			store.commit('user/read');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	//@import "static/css/index-app.css";
	
	@media screen and (min-width:768px){
		uni-page-wrapper{
			max-width:500px;
			border-right:1px solid #ddd;
		}
		.wrap{
			max-width:500px;
			
		}
			
		#bottom{
			max-width:500px;
		}

	}
	
</style>
