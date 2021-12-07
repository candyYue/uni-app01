'use strict';
const db = uniCloud.database()
const dbCmd = db.command //指令


//event为客户端上传的参数
exports.main = async (event, context) => {
	console.log('event : ', event)
	let res = await db.collection('week_img').get()  //操作云数据库
	return res
};
