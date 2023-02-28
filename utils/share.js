export default{
    data(){
        return {
            //设置默认的分享参数
            share:{
                title:'',
                path:'/pages/index/index',
                imageUrl:'',
                desc:'我是描述',
                content:'我是内容'
            }
        }
    },
	onShareTimeline(res) {
	    let settings = getApp().globalData.settings;
	    return {
	        title:settings.title,
	        path:this.share.path,
	        imageUrl:settings.thumbnail,
	        desc:this.share.desc,
	        content:this.share.content,
	        success(res){
	            uni.showToast({
	                title:'分享成功'
	            })
	        },
	        fail(res){
	            uni.showToast({
	                title:'分享失败',
	                icon:'none'
	            })
	        }
	    }
	},
    onShareAppMessage(res) {
		let settings = getApp().globalData.settings;
        return {
            title:settings.title,
            path:this.share.path,
            imageUrl:settings.thumbnail,
            desc:settings.description,
            content:this.share.content,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    }
}