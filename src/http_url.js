let localhostDev = true
let _host= localhostDev ?
  'http://localhost:8080' :
  'http://192.168.1.145:8899/pzcatering-api/api.do?method='

let httpUrl = {
  'login': _host + 'login'
}

export default httpUrl
