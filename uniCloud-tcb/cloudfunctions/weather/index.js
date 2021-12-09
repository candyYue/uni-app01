'use strict';
const db = uniCloud.database()
const dbCmd = db.command //指令


//event为客户端上传的参数
exports.main = async (event, context) => {
	//操作云数据库
	// await db.collection('week_img').doc(`img_${event.deviceId}`).set({
	//   list:event.list
	// })
	const collection = await db.collection('week_img').doc(`img_${event.deviceId}`).get()
	return {
		status:200,
		data:collection.data,
		context
	}
};
