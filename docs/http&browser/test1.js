

function jsonp({ url, data, callback }) {
  const objectToQuery = obj => {
    const tempArr = []
    for (let key in obj) {
      tempArr.push(decodeURIComponent(key) + '=' + decodeURIComponent(obj[key]))
    }
    return tempArr.join('&')
  }
  const container = document.getElementsByTagName('head')[0]
  const callbackFunc = `callbacl_${new Date().getTime()}` // 唯一
  const script = document.createElement('script')
  script.src = `${url}?${objectToQuery(data)}&callback=${callbackFunc}`
  console.log(script.src)
  script.type = 'text/javascript'
  container.appendChild(script)

  window[callbackFunc] = res => {
    callback && callback(res) // 执行回调。res是服务器返回的数据
    container.removeChild(script)
    delete window[callbackFunc]
  }

  script.onerror = () => { // 异常处理
    console.log('script error')
    window[callbackFunc] = () => {
      callback && callback('something error hanppend!')
      container.removeChild(script)
      delete window[callbackFunc]
    }
  }
}