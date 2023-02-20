
# chatgpt聊天小程序
> chatGPT 拥有广泛的知识库，能够回答各种话题的问题，比如历史、科学、文化等。 它能够提供详细的信息和细节，并且能够根据上下文调整回答，小程序是调用GPT-3.5接口，效果类似chatgpt，前端使用uniapp，后端用wordpress框架，可在后台设置openai api key，支持联系上下文多次对话。

### 官方地址
[https://www.xenice.com/article/chatgpt%e8%81%8a%e5%a4%a9app%e5%89%8d%e7%ab%afuniapp%e6%a8%a1%e6%9d%bf](https://www.xenice.com/article/chatgpt%e8%81%8a%e5%a4%a9app%e5%89%8d%e7%ab%afuniapp%e6%a8%a1%e6%9d%bf)


### 使用方法
前端安装：从插件市场中导入新建项目或者从github中拉取下来，再导入HBuilder项目中<br>
后端插件安装：<br>
1、<a href="https://www.xenice.com/article/xenice-auth">xenice-auth</a> - jwt身份验证插件<br>
2、<a href="https://www.xenice.com/article/xenice-chat">minisi-chat</a> - 聊天应用后台设置插件<br>
插件安装开启后就可以在（菜单:设置-聊天)看到聊天应用设置页面。<br>


前端安装后，分别打开APP.VUE文件和router.js文件，修改服务器api地址。<br>

```
globalData: {
    server: 'https://www.xneice.com/', // 改为自己的
  },
```


```
const getSettings= ()=>{
	let base = 'https://www.xneice.com/wp-json/chat/v1/'; // 改为自己的
	return http.get(base+'settings', {});
}
```


### 前端演示
<div style="margin-top:30px"></div>
<img src="https://www.xenice.com/wp-content/uploads/2023/02/微信图片_20230218133357-150x150.jpg" />
<div style="margin-top:10px"></div>
<img class="img1" src="https://www.xenice.com/wp-content/uploads/2023/02/微信图片_20230218134958-519x1024.jpg" />
<div style="margin-top:30px"></div>


### 后端截图演示
<div style="margin-top:30px"></div>
<img  class="img2" src="https://www.xenice.com/wp-content/uploads/2023/02/微信图片_20230218140859.png" />

<img class="img2" src="https://www.xenice.com/wp-content/uploads/2023/02/微信截图_20230218132009.png" />

<img class="img2" src="https://www.xenice.com/wp-content/uploads/2023/02/微信截图_20230218132026.png" />

