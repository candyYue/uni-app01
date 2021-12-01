const errorHandler = {
  0: response => response,
  40101: (response) => {
    console.log('获取token失败')
  },
  'error': (response) => { // 其他错误
  },
  'timeout': () => {
  },
  'network': () => { // 服务器异常
  },
}
export default errorHandler