### 安装

命令方式
```
	npm install -g @vue/cli
	vue create ct-adc/preset my-project
```

使用可视化界面安装
```
	vue ui
```



### 支持

 sass autoprefixer 

### 目录说明

    ├── public                
	│   └── index.html        页面模板
	|   └── favicon.ico       纯静态资源，将会被复制到dist目录
	├── dist                  打包后文件
    │   ├── 80-static         正式版
    │   ├── 1505-stable       1505
    │   ├── 1506-develop      1506
    │   ├── 1507-test         1507
    │   ├── 2505-pre          2505
    │   ├── assets            资源文件
    ├── src                   项目源码目录
    │   ├── api               	ajax目录
    │   │   ├── interface.js  		api接口目录
    │   ├── assets            	静态资源目录
    │   │   ├── js            	js脚本
	│   │   ├── img           	图片
	│   │   ├── scss          	scss
	│   ├── components        	公共组件目录
	│   ├── filter            	公共过滤器
	│   ├── mixin             	公共混合
    │   ├── route             	前端路由
    │   │   └── index.js
    │   ├── store             	应用级数据（state）
    │   │   └── index.js
	│   ├── view              	页面入口
    │   │   └──index          		页面文件夹（页面数量 创建文件夹）
	│   │       ├── index.ejs      	页面模板
    │   │       └── main.js        	入口js文件
    │   ├── page              	页面级路由
    │   │   └──index 
    │   │        └── index.vue
	│   │
	├── vue.config.js         	项目配置文件

### 图片引用


在入口文件会有以下配置用以配置各环境图片引用路径，如果项目中存在引用图片 请勿删除
```
__webpack_public_path__ = document.querySelector('meta[name="imgSrc"]').content;
```
js中使用require方式引入图片 不能使用import
```
<template>
  <div id="app">
    <img alt="Vue logo" src="../../../assets/img/logo.png">
    <img alt="Vue logo" :src="src">
  </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            src: require('../../../assets/img/logo.png')
        };
    }
};
</script>

```
### 配置
vue.config.js
```
module.exports = {
    lintOnSave: false,  //eslint配置
    assetsDir: 'ct108-admin-main/1.0.0/assets', //项目代号/版本号/资源
    productionSourceMap: false, //是否生成map文件
    filenameHashing: false,     //打包文件hash命名
    pages: {                    //配置页面入口文件
        testPage: 'src/view/index/main.js'
    },
    devServer: {                //支持webpack4所有配置
        openPage: 'index.html',
        disableHostCheck: true,
        setup: function(app) {
            app.get('/', function(req, res) {
                res.sendFile(__dirname + '/src/index.html');
            });
        },
        proxy: {                //代理
            '/api': {
                target: 'http://lykf.admin.ct108.org:1507'
            } 
        }
    }
};

```

### 多页面
如果需要增加页面  输入命令
```
 vue invoke  template
```
输入新增页面的名称。
![](http://doc.uc108.org:8002/Public/Uploads/2018-11-21/5bf50d63b5fb4.png)

随即自动生成新页面模板。如果新页面是在项目运行中生成，需要重启服务

![](http://doc.uc108.org:8002/Public/Uploads/2018-11-21/5bf511d1adbb0.png)
