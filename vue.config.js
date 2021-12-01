module.exports = {
	devServer:{
		port:'8080',
		disableHostCheck:true,
		proxy:{
			'/juheweather':{
				target:'http://apis.juhe.cn',
				changeOrigin:true,
				pathRewrite:{
					'^/juheweather': ''
				}
			}
		}
	}
}