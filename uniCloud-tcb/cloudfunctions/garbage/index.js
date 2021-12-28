'use strict';
const db = uniCloud.database()
const dbCmd = db.command //指令


//event为客户端上传的参数
exports.main = async (event, context) => {
	console.log(event)
	//操作云数据库
	if(event.action==='set'){
		await db.collection('garbage_img').doc('img').set({
		  list:event.list
		})
	}
	if(event.action==='get'){
		
	}
	
	const collection = await db.collection('garbage_img').doc('img').get()
	return {
		status:200,
		data:collection.data,
		context
	}
};
