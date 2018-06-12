let localhostDev = true
let _host= localhostDev ?
  'http://localhost:8080' :
  'http://192.168.1.145:8899/pzcatering-api/api.do?method='

let httpUrl = {
  'login': _host + 'login', // 登录
  'changePwd': _host + 'changePwd', // 修改密码
  'saveByj': _host + 'saveByj', // 领备用金
  'startShift': _host + 'startShift', // 查询支付方式
}

export default httpUrl
